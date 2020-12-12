
const RunDemo = function (filemap)
{
	console.log("Initializing Demo");

	// get canvas, set dimensions to fill browser window
	const canvas = document.getElementById('the_canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// get WebGL context, confirm...
	const gl = canvas.getContext('webgl');

	if (!gl)
	{
		console.log('Browser is using experimental webgl.');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('This requires a browser which supports WebGL; Yours does not.');
	}

	// set background color and clear
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// set up culling via depth and back face, set front face to CCW
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// create shaders
	const coloredRefractiveShader = createProgram(
		gl,
		filemap['coloredVertShaderText'],
		filemap['coloredFragShaderText']
	);

	const skyboxShader = createProgram(
		gl,
		filemap['skyboxVertShaderText'],
		filemap['skyboxFragShaderText']
	);

	shaders = [
		coloredRefractiveShader,
		// add shaders other than skybox shader here.
		// some included shaders are unused.
	];

	// set up camera
	const aspect = canvas.width / canvas.height;
	const fieldOfView = Math.PI / 4;
	const nearClip = 0.01;
	const farClip = 1000.0;
	const camera = new FPSCamera(
		gl,
		shaders,
		aspect,
		fieldOfView,
		nearClip,
		farClip
	);
	camera.translate(new Vector(2, -2, 8));
	camera.lookAt(new Vector(0,0,0), new Vector(0, 1, 0));

	// set ambient light parameters
	const ambientLight = new Vector(0.5, 0.5, 0.5);

	// set up point lights' parameters
	const pointLightPosition = new Vector(0, 0, 0);
	const pointLightDiffuse = new Vector(1, 1, 1);
	const pointLightSpecular = new Vector(1, 1, 1);

	// use light manager to create lights
	const lightManager = new LightManager(
		gl,
		shaders,
		ambientLight
	);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.update();

	// set up directional light's parameters and create directional light
	const directionalLightDirection = new Vector(1, -4, 2);
	const directionalLightDiffuse = new Vector(0.4, 0.7, 0.6);
	const directionalLightSpecular = new Vector(0.4, 0.7, 0.6);
	lightManager.addDirectionalLight(directionalLightDirection, directionalLightDiffuse, directionalLightSpecular);
	lightManager.update();

	// skybox
	const skyboxImageIDs = [
		'skybox-right',
		'skybox-left',
		'skybox-top',
		'skybox-bottom',
		'skybox-back',
		'skybox-front'
	];
	const skybox = new Skybox(gl, skyboxShader, skyboxImageIDs, camera);


	// refractive/reflective emerald material properties
	const emeraldDiffuse = new Vector(0.07568, 0.61424, 0.07568);
	const emeraldSpecular = new Vector(0.633, 0.727811, 0.633);
	const emeraldAmbient = new Vector(0.0215, 0.1745, 0.0215);
	const emeraldShininess = 150.0;
	const emeraldReflectionIntensity = 0.4;
	const emeraldRefractionIntensity = 0.1;
	const emeraldRefractiveIndex = 1.5;
	
	// emerald material construction
	const emeraldMaterial = new ColoredRefractiveMaterial(
		gl, coloredRefractiveShader,
		skyboxImageIDs,
		emeraldReflectionIntensity,
		emeraldRefractionIntensity,
		emeraldRefractiveIndex,
		emeraldDiffuse,
		emeraldSpecular,
		emeraldAmbient,
		emeraldShininess
	);

	// suzy model 
	const suzyModelData = parseObjText(filemap['suzyOBJ']);

	const emeraldSuzy = new Mesh(
		gl,
		suzyModelData.positions,
		suzyModelData.normals,
		suzyModelData.index,
		emeraldMaterial
	);

	emeraldSuzy.translate(new Vector(0, -2, 0));

	// properties for glass
	const glassDiffuse = new Vector(1.0, 1.0, 1.0);
	const glassSpecular = new Vector(10.0, 10.0, 10.0);
	const glassAmbient = new Vector(0, 0, 0);
	const glassShininess = 1000.0;
	const glassReflectionIntensity = 0.0;
	const glassRefractionIntensity = 1.0;
	const glassRefractiveIndex = 1.1;

	// glass material
	const glassMaterial = new ColoredRefractiveMaterial(
		gl, coloredRefractiveShader,
		skyboxImageIDs,
		glassReflectionIntensity,
		glassRefractionIntensity,
		glassRefractiveIndex,
		glassDiffuse,
		glassSpecular,
		glassAmbient,
		glassShininess
	);

	// glass cube
	const glassCube = new Mesh(
		gl,
		Cube.positionArray(),
		Cube.normalArray(),
		Cube.indexArray(),
		glassMaterial
	);

	glassCube.translate(new Vector(2, 0, 0));

	// properties for mirror
	const mirrorDiffuse = new Vector(10.0, 10.0, 10.0);
	const mirrorSpecular = new Vector(10.0, 10.0, 10.0);
	const mirrorAmbient = new Vector(0, 0, 0);
	const mirrorShininess = 1000.0;
	const mirrorReflectionIntensity = 0.9;
	const mirrorRefractionIntensity = 0.0;
	const mirrorRefractiveIndex = 1.0;

	// mirror material
	const mirrorMaterial = new ColoredRefractiveMaterial(
		gl, coloredRefractiveShader,
		skyboxImageIDs,
		mirrorReflectionIntensity,
		mirrorRefractionIntensity,
		mirrorRefractiveIndex,
		mirrorDiffuse,
		mirrorSpecular,
		mirrorAmbient,
		mirrorShininess
	);

	// mirror cube
	const mirrorCube = new Mesh(
		gl,
		Cube.positionArray(),
		Cube.normalArray(),
		Cube.indexArray(),
		mirrorMaterial
	);

	mirrorCube.translate(new Vector(-2, 0, 0));

	// set up models to follow point lights
	const lightSuzy1 = new Mesh(
		gl,
		suzyModelData.positions,
		suzyModelData.normals,
		suzyModelData.index,
		emeraldMaterial
	);

	lightSuzy1.setScale(new Vector(0.1, 0.1, 0.1));

	lightSuzy2 = new Mesh(
		gl,
		suzyModelData.positions,
		suzyModelData.normals,
		suzyModelData.index,
		emeraldMaterial
	);

	lightSuzy2.setScale(new Vector(0.1, 0.1, 0.1));


	// set up some arbitrary constants for motion
	const startTime = Date.now();
	let time;
	let k_theta = 1/1000;
	let k_alpha = 1/3101;
	let hr = 5;
	let vr = 2;
	let theta;
	let alpha;
	let cosTheta;
	let lightPosition;

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		time = Date.now() - startTime;
		theta = time * k_theta;
		alpha = time * k_alpha;
		cosTheta = Math.cos(theta);

		lightPosition = new Vector(
			hr*cosTheta*Math.sin(alpha),
			vr*Math.sin(2*theta),
			vr*cosTheta*Math.cos(alpha)
		);

		lightManager.pointLights[0].setPosition(lightPosition);
		lightManager.pointLights[1].setPosition(lightPosition.inverse())
		lightManager.update();

		camera.update();

		lightSuzy1.setPosition(lightPosition);
		lightSuzy1.draw();

		lightSuzy2.setPosition(lightPosition.inverse());
		lightSuzy2.draw();

		emeraldSuzy.draw();

		glassCube.draw();

		mirrorCube.draw();

		skybox.draw();

		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
}

var InitDemo = function()
{
	const imports = [
		['suzyOBJ', 'models/suzy.obj'],
		['coloredVertShaderText', 'shaders/vert.coloredRefractive.glsl'],
		['coloredFragShaderText', 'shaders/frag.coloredRefractive.glsl'],
		['skyboxVertShaderText', 'shaders/vert.skybox.glsl'],
		['skyboxFragShaderText', 'shaders/frag.skybox.glsl']
		// TODO continue
	]
	
	const importer = new resourceImporter(imports, RunDemo);
}