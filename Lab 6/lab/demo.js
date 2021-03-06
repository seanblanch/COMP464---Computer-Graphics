
const RunDemo = function (filemap)
{
	console.log("Initializing Demo");

	// get canvas, set dimensions to fill browser window
	const canvas = document.getElementById('the_canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// get WebGL context, confirm...
	let gl = canvas.getContext('webgl');

	if (!gl)
	{
		console.log('Browser is using experimental webgl.');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('This requires a browser which supports WebGL; Yours does not.');
	}

	// set background color and clear
	gl.clearColor(0.9, 0.9, 0.9, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// set up culling via depth and back face, set front face to CCW
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// create shaders
	// (there are more shaders, feel free add them to the imports
	//  and compile them here as needed)
	const uvProgram = createProgram(
		gl, 
		filemap['uvVertShaderText'],
		filemap['uvFragShaderText']
	);

	shaders = [
		uvProgram
	]

	// set up view matrix
	const viewMatrix = new Float32Array(16);
	const cameraPosition = [0,3,7];
	const lookAtPosition = [0,0,0];
	const cameraUpDirection = [0,1,0];
	mat4.lookAt(
		viewMatrix,       // target matrix to apply values to
		cameraPosition,   // where is the camera
		lookAtPosition,   // what point is the camera looking at
		cameraUpDirection // which direction is upward from the cameras PoV
	);

	// set up (perspective) projection matrix
	const projMatrix = new Float32Array(16);
	const fieldOfView = Math.PI / 4;
	const aspect = canvas.width / canvas.height;
	const near = 0.01;
	const far = 1000.0;
	mat4.perspective(
		projMatrix,  // target matrix
		fieldOfView, // vertical field of view, in radians
		aspect,      // aspect ratio
		near,        // distance to near clip plane
		far          // distance to far clip plane
	);

	// set ambient light
	const ambientLight = [0.2, 0.3, 0.2];

	// set up directional light
	const lightDirection = [1, 1, -1];
	const lightIntensity = [0.9, 0.8, 0.6];

	// apply view and projection matrices and light to shaders
	for (program of shaders)
	{
		gl.useProgram(program);

		const uvMatViewUniformLocation = gl.getUniformLocation(uvProgram, 'mView');
		gl.uniformMatrix4fv(uvMatViewUniformLocation, gl.FALSE, viewMatrix);

		const uvMatProjUniformLocation = gl.getUniformLocation(uvProgram, 'mProj');
		gl.uniformMatrix4fv(uvMatProjUniformLocation, gl.FALSE, projMatrix);

		const uvAmbientLightUniformLocation = gl.getUniformLocation(uvProgram, 'ambientLight');
		gl.uniform3fv(uvAmbientLightUniformLocation, ambientLight);

		const uvLightDirectionUniformLocation = gl.getUniformLocation(uvProgram, 'lightDirection');
		const uvLightIntensityUniformLocation = gl.getUniformLocation(uvProgram, 'lightIntensity');
		gl.uniform3fv(uvLightDirectionUniformLocation, lightDirection);
		gl.uniform3fv(uvLightIntensityUniformLocation, lightIntensity);
	}

	// use imported OBJs / textures to create models
	const suzy2ModelData = parseObjText(filemap['suzy2OBJ']);
	const suzy2 = new UVMesh(
		gl, uvProgram,
		suzy2ModelData.positions, suzy2ModelData.normals,
		suzy2ModelData.texcoords, suzy2ModelData.index,
		'suzy2-texture', true
	);

	// 	const suzy3ModelData = parseObjText(filemap['suzy3OBJ']);
	// const suzy3 = new UVMesh(
	// 	gl, uvProgram,
	// 	suzy3ModelData.positions, suzy3ModelData.normals,
	// 	suzy3ModelData.texcoords, suzy3ModelData.index,
	// 	'suzy2-texture', true
	// );

	const cubeModelData = parseObjText(filemap['cubeOBJ']);
	const cube = new UVMesh(
		gl, uvProgram,
		cubeModelData.positions, cubeModelData.normals,
		cubeModelData.texcoords, cubeModelData.index,
		'cube-texture', true
	);

	const anvilModelData = parseObjText(filemap['anvilOBJ']);
	const anvil = new UVMesh(
		gl, uvProgram,
		anvilModelData.positions, anvilModelData.normals,
		anvilModelData.texcoords, anvilModelData.index,
		'anvil', true
	);

	const donutModelData = parseObjText(filemap['donutOBJ']);
	const donut = new UVMesh(
		gl, uvProgram,
		donutModelData.positions, donutModelData.normals,
		donutModelData.texcoords, donutModelData.index,
		'donut-texture', true
	);

	suzy2.translate(new Vector(-2, 0, 0));
	//suzy3.translate(new Vector(0, 20, 0));
	cube.translate(new Vector(2, 0, 0));
	donut.translate(new Vector(0, 0, 0));
	anvil.translate(new Vector(0, -4, 0));

	// set up some arbitrary constants for motion
	const angle = Math.PI / 100;
	const rotation = new Quaternion(angle, 0, 1, 0);

	const main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		suzy2.rotate(rotation);
		suzy2.draw();

		// suzy3.rotate(rotation);
		// suzy3.draw();

		donut.rotate(rotation);
		donut.draw();

		cube.rotate(rotation);
		cube.draw();

		anvil.rotate(rotation);
		anvil.draw();

		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
}

const InitDemo = function()
{
	const imports = [
		['uvVertShaderText', 'shaders/vert.uv.glsl'],
		['uvFragShaderText', 'shaders/frag.uv.glsl'],
		['suzyOBJ', 'models/suzy.obj'],
		['cubeOBJ', 'models/cube.obj'],
		['suzy2OBJ', 'models/suzy2.obj'],
		['suzy3OBJ', 'models/suzy3.obj'],
		['donutOBJ', 'models/donut.obj'],
		['anvilOBJ', 'models/anvil.obj']
	];
	
	const importer = new resourceImporter(imports, RunDemo);
}