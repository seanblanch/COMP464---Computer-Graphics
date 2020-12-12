// This class will house and maintain a 2D World Transform.

class Transform2
{
	constructor(position, rotation, scale)
	{
		this.position = position;
		this.rotation = rotation;
		this.scale = scale;

		this.mWorld = null;
		this.needsUpdate = true;
		this.update();
	}

	update()
	{
		if (this.needsUpdate)
		{
			this.mWorld = Matrix3.worldMatrix(this.position, this.rotation, this.scale);
			this.needsUpdate = false;
		}
	}

	setPosition(v)
	{
		this.position = v;
		this.needsUpdate = true;
	}

	setRotation(theta)
	{
		this.rotation = theta;
		this.needsUpdate = true;
	}

	setScale(v)
	{
		this.scale = v;
		this.needsUpdate = true;
	}

	translate(v)
	{
		this.position.add(v);
		this.needsUpdate = true;
	}

	rotate(theta)
	{
		this.rotation += theta;
		this.rotation %= 2*Math.PI;
		this.needsUpdate = true;
	}

	rotateAround(center, theta, holdOrientation=false)
	{
		this.position.subtract(center);
		this.position.rotate(theta);
		this.position.add(center);
		if (!holdOrientation)
		{
			this.rotate(theta);
		}
		this.needsUpdate = true;
	}

	scaleBy(v)
	{
		this.scale.scaleBy(v);
		this.needsUpdate = true;
	}
}