class ColoredRefractiveMaterial extends ColoredMaterial
{
	constructor(gl, program, imageIDs, reflectionIntensity = 0.1, refractionIntensity = 0.9, refractiveIndex = 2.0, diffuse=new Vector(1,1,1), specular=new Vector(1,1,1), ambient=new Vector(1,1,1), shininess=0.3)
	{
		super(gl, program, diffuse, specular, ambient, shininess);
		
		this.reflectionIntensity = reflectionIntensity;
		this.refractionIntensity = refractionIntensity;
		this.baseIntensity = 1.0 - reflectionIntensity - refractionIntensity;
		this.refractionConstant = 1.0 / refractiveIndex;

		this.reflectionIntensityUniformLocation = this.gl.getUniformLocation(
			this.program, 'material.reflectionIntensity'
		);
		this.refractionIntensityUniformLocation = this.gl.getUniformLocation(
			this.program, 'material.refractionIntensity'
		);
		this.baseIntensityUniformLocation = this.gl.getUniformLocation(
			this.program, 'material.baseIntensity'
		);
		this.refractionConstantUniformLocation = this.gl.getUniformLocation(
			this.program, 'material.refractionConstant'
		);

		this.gl.activeTexture(this.gl.TEXTURE0);
		this.cubemap = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.cubemap);

		for(let i = 0; i < imageIDs.length; i++)
		{
			this.gl.texImage2D(
				this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
				0,
				this.gl.RGBA,
				this.gl.RGBA,
				this.gl.UNSIGNED_BYTE,
				document.getElementById(imageIDs[i])
			);
		}

		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP, 
			this.gl.TEXTURE_WRAP_S, 
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP, 
			this.gl.TEXTURE_WRAP_T, 
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP, 
			this.gl.TEXTURE_MIN_FILTER, 
			this.gl.LINEAR
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP, 
			this.gl.TEXTURE_MAG_FILTER, 
			this.gl.LINEAR
		);
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);
	}

	activate()
	{
		this.gl.uniform3fv(this.diffuseUniformLocation, this.diffuse);
		this.gl.uniform3fv(this.specularUniformLocation, this.specular);
		this.gl.uniform3fv(this.ambientUniformLocation, this.ambient);
		this.gl.uniform1f(this.shininessUniformLocation, this.shininess);
		this.gl.uniform1f(this.reflectionIntensityUniformLocation, this.reflectionIntensity);
		this.gl.uniform1f(this.refractionIntensityUniformLocation, this.refractionIntensity);
		this.gl.uniform1f(this.baseIntensityUniformLocation, this.baseIntensity);
		this.gl.uniform1f(this.refractionConstantUniformLocation, this.refractionConstant);
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.cubemap);
	}

	deactivate()
	{
		super.deactivate();
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);
	}
}