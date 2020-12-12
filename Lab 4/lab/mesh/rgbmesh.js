//Sean Blanchard
//Lab 4
//Comp464
//10-10-20

/*
	RGBMesh is to Mesh as MultiColorDrawable is to Drawable:
	https://github.com/arewhyaeenn/GRAPHICS_2D_WORLD/blob/master/lab/drawables/drawable.js

	It is essentially Mesh, with an additional attribute (color).
*/

class RGBMesh extends Mesh
{
	/*
		Set up Mesh with appropriate args (all of them but the colorArray).
		Store attribute location for color ("vertColor" in shader).
		Create and populate buffer for color attribute.
	*/ 
	constructor(gl, program, positionArray, normalArray, colorArray, indexArray, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		// TODO
		super(gl, program, positionArray, indexArray, position, rotation, scale);

		this.colorAttribLocation = gl.getAttribLocation(this.program, 'vertColor')
		this.normalAttribLocation = gl.getAttribLocation(this.program, 'vertNormal');

		this.vertColors = new Float32Array(colorArray);
		this.colorBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, this.vertColors, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		this.vertNormals = new Float32Array(normalArray);
		this.normalBufferObject = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBufferObject);
		gl.bufferData(gl.ARRAY_BUFFER, this.vertNormals, gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}


	/*
		Call Mesh's activate.
		Enable color attribute array and set up color attribute pointer.
	*/
	activate()
	{
		// TODO
		super.activate();
		this.gl.enableVertexAttribArray(this.colorAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBufferObject);
		this.gl.vertexAttribPointer
		(
			this.colorAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);

		this.gl.enableVertexAttribArray(this.normalAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBufferObject);
		this.gl.vertexAttribPointer(
			this.normalAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
	}


	/*
		Call Mesh's deactivate.
		Disable the color vertex attribute array.
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