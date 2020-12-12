/*
	The Mesh class will house the transform and model data for a 3D model.
	It is very similar to the "Drawable" class from a previous lab,
	which you should use as an example:
	https://github.com/arewhyaeenn/GRAPHICS_2D_WORLD/blob/master/lab/drawables/drawable.js

	The primary difference between these two classes is that Mesh is 3D whereas Drawable was 2D, so:
		- Each vertex position is 3 floats, not 2
		- Each vertex also has a normal attribute (3 floats representing the normal vector)
		- An extra transformation is included for normal vectors (which we discussed in lecture).
		  It has been included in this lab's Transform class; you don't need to implement it or
		  maintain it, but you will need to pass it into the shader (like you pass in the world
		  matrix) when drawing.
		- The world matrix is 4x4, meaning you'll need to use UniformMatrix4fv when plugging it in
		  (Drawable uses UniformMatrix3fv, because its world matrix is 3x3).
		  The normal matrix is 3x3, because it does not need to encode translation.
*/

class Mesh extends Transform
{
	/*
		Set up transform.
		Set up WebGL references.
		Create and populate position, normal and index buffers.
		Store index length.
		Store position and normal attribute locations ("vertPosition" and "vertNormal" in shader).
		Store world matrix and normal matrix uniform locations ("mWorld" and "mNormal" in the shader).
	*/
	constructor(gl, program, positionArray, normalArray, indexArray, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		// TODO
		super(position, rotation, scale);

		this.gl = gl;
		this.program = program;

		this.mWorldUniformLocation = this.gl.getUniformLocation(this.program, "mWorld");
		this.mNormalUniformLocation = this.gl.getUniformLocation(this.program, "mNormal");

		this.positionAttribLocation = this.gl.getAttribLocation(this.program, "vertPosition");
		this.positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, positionArray, this.gl.STATIC_DRAW);

		this.normalAttribLocation = this.gl.getAttribLocation(this.program, "vertNormal");
		this.normalBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, normalArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

		this.indexLength = indexArray.length;
		this.indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	}


	/*
		Update transform.
		Use this mesh's shader.
		Bind index array to element array buffer.
		Enable position and normal attribute arrays and set up attribute pointers.
		Plug in uniform data (mNormal and mWorld).
	*/
	activate()
	{
		// TODO
		this.update();

		this.gl.useProgram(this.program);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.enableVertexAttribArray(this.positionAttribLocation);
		this.gl.vertexAttribPointer(
			this.positionAttribLocation,
			3, this.gl.FLOAT, this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT, 0
		);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.enableVertexAttribArray(this.normalAttribLocation);
		this.gl.vertexAttribPointer(
			this.normalAttribLocation,
			3, this.gl.FLOAT, this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT, 0
		);

		this.gl.uniformMatrix4fv(
			this.mWorldUniformLocation,
			this.gl.FALSE,
			this.mWorld
		);

		this.gl.uniformMatrix3fv(
			this.mNormalUniformLocation,
			this.gl.FALSE,
			this.mNormal
		);
	}


	/*
		Call activate.
		Draw elements (GPU go brrrrrr).
		Call deactivate.
	*/
	draw()
	{
		this.activate();
		this.gl.drawElements(
			this.gl.TRIANGLES,
			this.indexLength,
			this.gl.UNSIGNED_SHORT,
			0
		);
		this.deactivate();
	}


	/*
		Unbind buffers.
		Disable attribute arrays.
	*/
	deactivate()
	{
		// TODO
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		this.gl.disableVertexAttribArray(this.positionAttribLocation);
		this.gl.disableVertexAttribArray(this.normalAttribLocation);
	}
}