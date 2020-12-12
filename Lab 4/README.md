# Computer Graphics - Intro GLSL, Graphics Conventions, and Mesh

In this lab, we will:

1. Learn the basics of GLSL, and write a shader together.
2. Build on our previously implemented Transform class to create utilities to easily draw 3D models.
3. Implement classes to generate vertex data for sphere and cube models.

In the process, we will discuss conventions in computer graphics, including:

* The right-handed view, world and model spaces (and the pinhole camera).
* The counter-clockwise front face (and cross products in right-handed spaces).

You will need to go through the following tasks:

1. Follow through (live or in the Zoom recording) the implementation of the vertex and fragment shaders for our 3D models. These will be the contents of the files in the [shaders](./lab/shaders) folder, which are currently empty. We will discuss the basics of GLSL as we go through creating these shaders together.
2. Read the commented instructions in the `Mesh` class ([mesh.js](./lab/mesh/mesh.js)) and complete it. It is very similar to the [Drawable class](https://github.com/arewhyaeenn/GRAPHICS_2D_WORLD/blob/master/lab/drawables/drawable.js) from a previous lab.
3. Run the lab. You should see a single, completely black box orbitting and spinning. Once you see this display, you are ready to move on.
4. Read and complete the `RGBMesh` class ([rgbmesh.js](./lab/mesh/rgbmesh.js)). It is to `Mesh` as `MultiColorDrawable` was to `Drawable`.
5. Uncomment these short snippets in [demo.js](./lab/demo.js), which create, set the initial position of, and define the frame-by-frame movement of a colored cube:

 ```javascript
	var rgbCube = new RGBMesh(
		gl, // WebGL context
		rgbShader, // shader program to use to draw this
		cubePositionArray, // position attribute array
		cubeNormalArray,
		cubeColorArray,
		cubeIndexArray
	);
 ```
 ```javascript
 rgbCube.translate(new Vector(-5,0,0));
 ```

 ```javascript
	rgbCube.localRotate(localRot);
	rgbCube.rotateAround(origin, orbit);
	rgbCube.draw();
 ```
6. Run again. Now, there should be a second cube orbitting, and this one should have red, green and blue faces.
7. Create a new file called `shapes.js` in the [mesh](./lab/mesh) directory. In it, create a `Cube` class to generate cube position, normal and index arrays (similar to the [Box class](https://github.com/arewhyaeenn/GRAPHICS_2D_WORLD/blob/master/lab/drawables/shapes.js) provided in a previous lab). Add a line to `index.html` to include `shapes.js` in the project. Replace the lines in `demo.js` which construct the cube position, normal and index arrays with calls to your new `Cube` class methods. Once this is working, you're ready to move on.
8. Create a second vertex and fragment shader pair in which the color is no longer `attribute` data, but instead `uniform` data. Create a second extension of the `Mesh` class called `UniformColorMesh` to use this shader. Replace the black box (an instance of `Mesh`) with a box that is one solid color of your choice (an instance of `UniformColorMesh`).
	* Create the files `vert.uniform.glsl` abd `frag.uniform.glsl` in the `shaders` folder.
	* Add these files to the imported text assets at the bottom of `demo.js`.
	* Search for the `createShader` call in `demo.js` which compiles and links the `rgbShader`. Add another call to `createShader` which compiles and links your new shader.
	* Add your new shader to the `shaders` list, which currently only includes the `rgbShader`. Otherwise, it won't be updated with the camera and light settings defined for the `rgbShader` in the demo.
	* Create and implement the `UniformColorMesh` class, either in its own file or in one of the already existing files in the `mesh` directory. If you create a new file, don't forget to add a line to `index.html` to include it. `UniformColorMesh` is to `Mesh` as `UniformColorDrawable` is to `Drawable`. This class should be very short.
	* Replace the `new Mesh(...)` call which creates the `meshCube` variable with a call to `new UniformColorMesh(...)` to instantiate your new class. Don't forget to adjust the arguments to include your new cube's color.
	* Once you have two cubes (the one with red, green and blue faces, and your solid colored one) orbitting, you're done!
9. (**OPTIONAL**) Add a `Sphere` class alongside your `Cube` class to create position, normal and index arrays for spheres, and modify `demo.js` to add a sphere or two to the scene. You may use your knowledge of trigonometry to create these by hand, or find an existing tool to generate them.
