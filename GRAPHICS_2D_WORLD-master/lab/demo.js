var RunDemo = function(filemap)
{
	console.log("Initializing Demo");

	// configure canvas
	var canvas = document.getElementById("the_canvas");
	let screenSize = Math.min(0.9*window.innerWidth,0.9*window.innerHeight);
	canvas.width = screenSize;
	canvas.height = screenSize;

	// get webgl context
	var gl = canvas.getContext("webgl");
	if (!gl)
	{
		console.log("WebGL context not found; checking for experimental WebGL");
		gl = canvas.getContext("experimental-webgl");
	}
	if (!gl)
	{
		alert("No WebGL context found; this demo requires a browswer which supports WebGL");
		return;
	}

	// configure webgl context
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);
	gl.enable(gl.CULL_FACE);

	// create shaders (see "createShader" function in the shaderUtils)
	// we haven't covered GLSL yet, but there are comments in the individual
	// shaders that you might find interesting as well
	var uniformColorProgram = createShader(
		gl,
		filemap["uniformColorVertShaderText"],
		filemap["uniformColorFragShaderText"]
	);

	var multiColorProgram = createShader(
		gl,
		filemap["multiColorVertShaderText"],
		filemap["multiColorFragShaderText"]
	);

	// define some colors for ease of use
	let red = new Float32Array([1.0, 0.0, 0.0]);
	let green = new Float32Array([0.0, 1.0, 0.0]);
	let blue = new Float32Array([0.0, 0.0, 1.0]);
	let orange = new Float32Array([1.0, 0.4, 0.0]);
	let yellow = new Float32Array([1.0, 1.0, 0.0]);
	let black = new Float32Array([0.0, 0.0, 0.0]);

	// always nice to make the origin easily accessible...
	let origin = new Vector2();

	// create some drawables and some functions to move them
	var greenBox = new UniformColorDrawable(
		gl, uniformColorProgram, 	// webgl context, shader program,
		Box.positionArray(),     	// position array (check out the Box class in shapes.js)
		Box.indexArray(),        	// index array
		green, 						// color green
		new Vector2(0.8, 0.8),		// position near the top-right corner
		Math.PI / 4,				// rotate 45 degrees CCW
		new Vector2(0.1, 0.1)		// scale down
	);

	var animateGreenBox = function()
	{
		greenBox.rotate(Math.PI/1000);
		greenBox.draw();
	}

	var redBlueBox = new MultiColorDrawable(
		gl, multiColorProgram,
		Box.positionArray(),
		Box.indexArray(),
		Box.colorArray(
			red, blue, // bottom left, bottom right
			red, blue  // top right, top left
		),
		new Vector2(-0.5, -0.5),
		Math.PI / 4,
		new Vector2(0.2, 0.1)
	);

	var animateRedBlueBox = function()
	{
		redBlueBox.rotateAround(origin, Math.PI/100);
		redBlueBox.draw();
	}

	var orangeYellowCircle = new MultiColorDrawable(
		gl, multiColorProgram,
		Oval.positionArray(32), // 32 is number of sides is circle approximation
		Oval.indexArray(32),
		Oval.colorFadeArray(32, yellow, orange),
		new Vector2(-0.8, -0.6),
		0,
		new Vector2(0.1, 0.15)
	);

	var dir = 1;
	speed = 1;
	var animateOrangeYellowCircle = function()
	{
		if (orangeYellowCircle.position.y > 0.8)
		{
			dir = -1;
		}
		else if (orangeYellowCircle.position.y < -0.8)
		{
			dir = 1;
		}
		if (orangeYellowCircle.position.distanceTo(redBlueBox.position) < 0.4)
		{
			speed = 2;
		}
		else
		{
			speed = 0.8;
		}
		orangeYellowCircle.translate(new Vector2(0.0, 1.6 / 100 * dir * speed));
		orangeYellowCircle.draw();
	}

	var redBox = new UniformColorDrawable(
		gl, uniformColorProgram,
		Box.positionArray(),
		Box.indexArray(),
		red,
		new Vector2(0.2, 0.2),
		0,
		new Vector2(0.03, 0.03)
	);

	var animateRedBox = function()
	{
		redBox.rotateAround(origin, Math.PI/100, true);
		redBox.draw();
	}

	var pacManClosed = new UniformColorDrawable(
		gl, uniformColorProgram,
		Oval.positionArray(32),
		Oval.indexArray(32),
		yellow,
		new Vector2(0.8, -0.8),
		0,
		new Vector2(0.1, 0.1)
	);

	var pacManHalfOpen = new UniformColorDrawable(
		gl, uniformColorProgram,
		Oval.positionArray(32),
		Oval.indexArray(28),
		yellow,
		new Vector2(0.8, -0.8),
		Math.PI / 8,
		new Vector2(0.1, 0.1)
	);

	var pacManOpen = new UniformColorDrawable(
		gl, uniformColorProgram,
		Oval.positionArray(32),
		Oval.indexArray(24),
		yellow,
		new Vector2(0.8, -0.8),
		Math.PI / 4,
		new Vector2(0.1, 0.1)
	);

	var pacManEye = new UniformColorDrawable(
		gl, uniformColorProgram,
		Oval.positionArray(32),
		Oval.indexArray(24),
		black,
		new Vector2(0.83, -0.725),
		0,
		new Vector2(0.015, 0.015)
	);

	var i = 0;
	var nFramesPerCycle = 24;
	var animatePacMan = function()
	{
		pacManEye.draw();
		let state = Math.floor(i / nFramesPerCycle * 4);
		if (state == 0 || state == 2)
		{
			pacManHalfOpen.draw();
		}
		else if(state == 1)
		{
			pacManOpen.draw();
		}
		else
		{
			pacManClosed.draw();
		}
		i = (i+1)%nFramesPerCycle;
	}

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		animateGreenBox();
		animateRedBlueBox();
		animateOrangeYellowCircle();
		animateRedBox();
		animatePacMan();

		requestAnimationFrame(main);
	}
	
	requestAnimationFrame(main);
}

var InitDemo = function()
{
	var imports = [
		["uniformColorVertShaderText", "shaders/uniformColor.vert.glsl"],
		["uniformColorFragShaderText", "shaders/uniformColor.frag.glsl"],
		["multiColorVertShaderText", "shaders/multiColor.vert.glsl"],
		["multiColorFragShaderText", "shaders/multiColor.frag.glsl"],
	];
	var importer = new resourceImporter(imports, RunDemo);
}