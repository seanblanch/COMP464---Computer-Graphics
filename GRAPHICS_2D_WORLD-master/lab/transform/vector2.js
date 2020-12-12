// This is a very simple 2D vector class

class Vector2
{
	constructor(x=0, y=0)
	{
		this.x = x;
		this.y = y;
	}

	set(x, y)
	{
		this.x = x;
		this.y = y;
	}

	add(v)
	{
		this.x += v.x;
		this.y += v.y;
	}

	subtract(v)
	{
		this.x -= v.x;
		this.y -= v.y;
	}

	scaleBy(v)
	{
		this.x *= v.x;
		this.y *= v.y;
	}

	rotate(theta)
	{
		var currentMag = this.magnitude();
		this.x = Math.cos(theta)*this.x - Math.sin(theta)*this.y;
		this.y = Math.cos(theta)*this.y + Math.sin(theta)*this.x;
		this.normalize(currentMag);
	}

	magnitude()
	{
		return Math.sqrt(this.x*this.x + this.y*this.y);
	}

	distanceTo(v)
	{
		let dx = this.x - v.x;
		let dy = this.y - v.y;
		return Math.sqrt(dx*dx + dy*dy)
	}

	normalize(mag=1)
	{
		var currentMag = this.magnitude();
		if (currentMag != 0)
		{
			this.x = this.x * mag / currentMag;
			this.y = this.y * mag / currentMag;
		}
	}

	inverse()
	{
		return new Vector2(-this.x, -this.y);
	}
}