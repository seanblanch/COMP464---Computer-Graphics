// Sean Blanchard
//9/21/20
//COMP 464 Lab 2

// QUATERNION CLASS DESCRIPTION
/*
	The Quaternion class will 4-component structure to represent and apply rotations.
*/

// QUATERNION CLASS FIELDS:
//		w (numerical) : real component
//		x (numerical) : x-axis component
//		y (numerical) : y-axis component
//		z (numerical) : z-axis component

class Quaternion
{
	// "theta" is how far to turn, in radians
	// "x y z" are the axis of rotation
	// "normalized" denotes whether the input axis "x y z" has been normalized already
	// if "normalized" is false, then the constructor will need to normalize the axis
	// should set components "this.w, this.x, this.y, this.z" as detailed in slides
	constructor(theta=0, x=1, y=0, z=0, normalized=false)
	{
		let a = x;
		let b = y;
		let c = z;

		if(!normalized)
		{
			const mag = Math.sqrt(x * x + y * y + z * z);
			a /= mag;
			b /= mag;
			c /= mag;
		}
		
		const cos = Math.cos(theta/2);
		const sin = Math.sin(theta/2);

		this.w = cos;
		this.x = a * sin;
		this.y = b * sin;
		this.z = c * sin;

	}

	// sets this quaternion's components to the inputs
	set(w, x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		
	}

	// returns the inverse quaternion as detailed in slides
	// NOTE: may assume that this quaternion is already normalized
	// because while we may use non-normalized quaternions, we will not need to invert them!
	inverse()
	{
		return new Quaternion(-this.w, -this.x, -this.y, -this.z)
	}

	// keep the w component the same
	// scale x y and z components to normalize
	// (i.e. to make sum of squared components, including w, equal 1)
	// this is to ensure that floating point rounding errors don't slowly add up
	// HINT: use the pythagorean trig identity!
	renormalize()
	{
			const mag = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
			this.x /= mag;
			this.y /= mag;
			this.z /= mag;
	}

	 // multiply the input quaternion "q" on the left (i.e. get q * this)
	 // as usual, if "inplace" is true then modify this quaternion, otherwise return a new one
	 // if "renormalize" is true, then renormalize the result
	 // NOTE: if "inplace" is false, renormalize the NEW quaternion and NOT this one
	compose(q, inplace=true, renormalize=true)
	{
		
	}

	// apply the rotation represented by this quaternion to the input quaternion "q"
	// i.e. this * q * this.inverse()
	// return the result
	// use Quaternion.composition (static function defined below, complete it first)
	// HINT: compose multiplies from the left, so the inputs will need to be in reverse order!
	applyRotation(q)
	{
		
	}

	// rotate by quaternion "q", but in local space
	// i.e. treat q's axis as if it is in local space
	// rotate q's axis by this quaternion to find it in world space
	// then compose the rotated q with this quaternion
	// don't forget to account for "inplace"!
	localCompose(q, inplace=true)
	{
		
	}

	toString()
	{
		return "Quaternion ("+this.w.toString()+", "+this.x.toString()+", "+this.y.toString()+", "+this.z.toString()+")";
	}

	// input vector "v"
	// returns a pure quaternion (i.e. one with w-value 0) and with x y z values equal to v's
	// HINT: don't use "new Quaternion(0, v.x, v.y, v.z)", w does not equal the input angle
	// instead make a new quaternion and then use its "set" function before returning it
	static fromVector(v)
	{
		
	}

	// given a list of quaternions, compose them chronologically
	// i.e. given [q1, q2, q3] return q3 * q2 * q1
	// HINT1: the "compose" function multiplies a new quaternion in from the left
	// HINT2: make sure the "renormalize" input for any "compose" calls is false
	// because we might be rotating a non-normalized pure quaternion if we're rotating a vector!
	static composition(quats) // given q1, q2, q3 returns q3 * q2 * q1
	{
		
	}

	static equals(q1, q2)
	{
		if (! q1 instanceof Quaternion || ! q2 instanceof Quaternion)
		{
			console.log("%cInvalid inputs for Quaternion.equals.","color:red");
			return false;
		}

		var threshold = 0.001;

		if (Math.abs(q1.w - q2.w) > threshold || isNaN(Math.abs(q1.w - q2.w)))
		{
			return false;
		}
		
		if (Math.abs(q1.x - q2.x) > threshold || isNaN(Math.abs(q1.x - q2.x)))
		{
			return false;
		}
		
		if (Math.abs(q1.y - q2.y) > threshold || isNaN(Math.abs(q1.y - q2.y)))
		{
			return false;
		}
		
		if (Math.abs(q1.z - q2.z) > threshold || isNaN(Math.abs(q1.z - q2.z)))
		{
			return false;
		}

		return true;
	}
}