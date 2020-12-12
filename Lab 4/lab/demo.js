var RunDemo = function (filemap)
{
	console.log("Initializing Demo");

	// get canvas, set dimensions to fill browser window
	var canvas = document.getElementById('the_canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// get WebGL context, confirm...
	var gl = canvas.getContext('webgl');

	if (!gl)
	{
		console.log('Browser is using experimental webgl.');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('This requires a browser which supports WebGL; Yours does not.');
	}

	// set background color and clear
	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// set up culling via depth and back face, set front face to CCW
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// create shader...
	var rgbShader = createShader(
		gl, 
		filemap['rgbVertexShaderText'],
		filemap['rgbFragShaderText']
	);
	
	var shaders = [
		rgbShader
		// if you make more shaders, add them to this list so they'll
		// get the camera and lighting settings defined below
	];

	// set up view matrix
	var viewMatrix = new Float32Array(16);
	var cameraPosition = [0,5,15];
	var lookAtPosition = [0,0,0];
	var cameraUpDirection = [0,1,0];
	mat4.lookAt(
		viewMatrix,       // target matrix to apply values to
		cameraPosition,   // where is the camera
		lookAtPosition,   // what point is the camera looking at
		cameraUpDirection // which direction is upward from the cameras PoV
	);

	// set up (perspective) projection matrix
	var projMatrix = new Float32Array(16);
	var fieldOfView = Math.PI / 4;
	var aspect = canvas.width / canvas.height;
	var near = 0.01;
	var far = 1000.0;
	mat4.perspective(
		projMatrix,  // target matrix
		fieldOfView, // vertical field of view, in radians
		aspect,      // aspect ratio
		near,        // distance to near clip plane
		far          // distance to far clip plane
	);

	// set ambient light
	var ambientLight = [0.2, 0.3, 0.2];

	// set up directional light
	var lightDirection = [1, -1, -0.25];
	var lightIntensity = [0.9, 0.8, 0.6];

	// apply view, projection and lighting to shaders
	for (var i = 0; i < shaders.length; i++)
	{
		var shader = shaders[i];

		gl.useProgram(shader);

		var matViewUniformLocation = gl.getUniformLocation(shader, 'mView');
		gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);

		var matProjUniformLocation = gl.getUniformLocation(shader, 'mProj');
		gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
	
		var ambientLightUniformLocation = gl.getUniformLocation(shader, 'ambientLight');
		gl.uniform3fv(ambientLightUniformLocation, ambientLight);

		var lightDirectionUniformLocation = gl.getUniformLocation(shader, 'lightDirection');
		var lightIntensityUniformLocation = gl.getUniformLocation(shader, 'lightIntensity');
		gl.uniform3fv(lightDirectionUniformLocation, lightDirection);
		gl.uniform3fv(lightIntensityUniformLocation, lightIntensity);
	}

	// set up position array for cube
	// recall, we are in a right-handed space.
	// "left, right" etc are from point of view of the camera (which is just above the +z axis).
	// the comments don't align with the cube's "point of view", but with the camera's.
	// who knows which way the cube thinks is forward, anyway?
	const cubePositionArray = new Float32Array([
		// top
		-0.5, 0.5, -0.5,
		0.5,  0.5, -0.5,
		0.5,  0.5, 0.5,
		-0.5, 0.5, 0.5,

		// bottom
		-0.5, -0.5, -0.5,
		-0.5, -0.5, 0.5,
		0.5,  -0.5, 0.5,
		0.5,  -0.5, -0.5,

		// left
		-0.5, -0.5, -0.5,
		-0.5, 0.5,  -0.5,
		-0.5, 0.5,  0.5,
		-0.5, -0.5, 0.5,

		// right
		0.5, -0.5, -0.5,
		0.5, -0.5, 0.5,
		0.5, 0.5,  0.5,
		0.5, 0.5,  -0.5,

		// back
		-0.5, -0.5, -0.5,
		0.5,  -0.5, -0.5,
		0.5,  0.5,  -0.5,
		-0.5, 0.5,  -0.5,

		// front
		-0.5, -0.5, 0.5,
		-0.5, 0.5,  0.5,
		0.5,  0.5,  0.5,
		0.5,  -0.5, 0.5
	]);

	// index array (CCW front faces in a right-handed space)
	// check the "top" face with the position array to confirm
	// that all faces are counterclockwise (they are, but you
	// should check anyway)
	// if you're not sure, draw a picture!
	const cubeIndexArray = new Uint16Array([
		// top
		0, 2, 1,
		0, 3, 2,

		// bottom
		4, 6, 5,
		4, 7, 6,

		// left
		8, 10, 9,
		8, 11, 10,

		// right
		12, 14, 13,
		12, 15, 14,

		// back
		16, 18, 17,
		16, 19, 18,

		// front
		20, 22, 21,
		20, 23, 22
	]);

	const cubeNormalArray = new Float32Array([	
		// top
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,

		// bottom
		0, -1, 0,
		0, -1, 0,
		0, -1, 0,
		0, -1, 0,

		// left
		-1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,

		// right
		1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		1, 0, 0,

		// back
		0, 0, -1,
		0, 0, -1,
		0, 0, -1,
		0, 0, -1,

		// front
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	]);

	// create cube using Mesh class
	// has no colors, so it will show up black
	// (color values will be left at 0s in the shader)
	var meshCube = new Mesh(
		gl, // WebGL context
		rgbShader, // shader program to use to draw this
		cubePositionArray, // position attribute array
		cubeNormalArray, // normal attribute array
		cubeIndexArray // index array
	);

	const cubeColorArray = new Float32Array([
		// top / bottom is green
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, 1.0, 0.0,

		// left / right is red
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
 		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		
		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
 		1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,

		// front / back is blue
		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
 		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,

		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0,
 		0.0, 0.0, 1.0,
		0.0, 0.0, 1.0
	]);

	var rgbCube = new RGBMesh(
		gl, // WebGL context
		rgbShader, // shader program to use to draw this
		cubePositionArray, // position attribute array
		cubeNormalArray,
		cubeColorArray,
		cubeIndexArray
	);

	// position cubes
	meshCube.translate(new Vector(5,0,0));
	rgbCube.translate(new Vector(-5,0,0));

	// set up constants for motion
	let angle = Math.PI / 100;
	let origin = new Vector();
	let orbit = new Quaternion(angle/2, 0, 1, 0);
	let localRot = new Quaternion(4*angle, 0, 0, 1);

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		meshCube.rotateAround(origin, orbit);
		meshCube.localRotate(localRot);
		meshCube.draw();

		rgbCube.localRotate(localRot);
		rgbCube.rotateAround(origin, orbit);
		rgbCube.draw();
		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
}

var InitDemo = function()
{
	var imports = [
		['rgbVertexShaderText', '/shaders/vert.rgb.glsl'],
		['rgbFragShaderText', '/shaders/frag.rgb.glsl']
	];
	var importer = new resourceImporter(imports, RunDemo);
}