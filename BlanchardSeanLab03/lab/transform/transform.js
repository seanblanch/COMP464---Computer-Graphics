/*
	Transform Class

	Description:

		The Transform class stores and maintains a World Transform
		in order to track the position, orientation and scale of
		an object and to convert these measures to 4x4 matrices
		as needed.

	Directions / Notes:

		1. Carefully adhere to the commented descriptions to implement
			the incomplete methods
		2. Follow the nomenclature provided for the fields EXACTLY.
			Any deviation from the identifiers below will lead to errors.
		3. None of these methods is very complex if we take the utilities
			already provided in Vector, Quaternion and Matrix for granted.
			If you find yourself writing more than a few lines for any given
			method, you're likely overthinking it or repeating work that is
			already done in a method that you've already built. In my completed
			version of this file, the longest method (other than update, which
			is provided) is 11 lines long, including braces on their own lines
			and blank lines for readability. Most are less than 5 lines long.

	Fields:

		this.position (Vector) : the Transform's current position
		this.rotation (Quaternion) : the Transform's current orientation / rotation
		this.scale (Vector) : the Transform's current scale

		this.mTranslate (Matrix*) : the translation matrix; will coincide with
			this.position when updated
		this.mRotate (Matrix*) : the rotation matrix; will coincide with
			this.rotation when updated
		this.mScale (Matrix*) : the scale matrix; will coincide with this.scale
			when updated
		this.mWorld (Matrix*) : the world matrix; will coincide with this.position,
			this.rotation and this.scale when updated

		* Matrices are really just Float32Arrays with 16 elements, from Matrix static methods

		this.hasMoved (boolean) : true if the position has changed since the last time the
			translation matrix was updated
		this.hasRotated (boolean) : true of the rotation has changed since the last time the
			rotation matrix was updated
		this.hasScaled (boolean) : true if the scale has changed since the last time the scale
			matrix was updated
		this.needsUpdate (boolean) : true if the position, rotation or scale has changed since
			the last time the world matrix was updated
*/

class Transform
{
	/*
		constructor
			Initialize a new Transform.
		args:
			postion (Vector) : the starting position of the Transform
			rotation (Quaternion) : the starting rotation of the Transform
			scale (Vector) : the starting scale of the Transform
		tasks:
			1. Initialize this.position, this.rotation and this.scale.
				Store copies of the arguments, not the arguments themselves
				(see Vector.copy and Quaternion.copy).
			2. Initialize this.mTranslate, this.mRotate, and this.mScale by using 
				the appropriate Matrix methods to match the current position,
				rotation and scale.
			3. Initialize this.mWorld by using the appropriate Matrix method to
				match the current position, rotation and scale.
			4. Initialize this.hasMoved, this.hasRotated, this.hasScaled, and
				this.needsUpdate to false (everything is up to date).
		
	*/
	//Initialize variables
	//Make copies of the 3 to store
	//add a copy method for vector or quaternion
	//1 line for vector
	//2 for quaternion cant use constructor with w values
	constructor (position=new Vector(), rotation=new Quaternion(), scale=new Vector(1, 1, 1))
	{
		// TODO
		//this.position = position;


		this.position = Vector.copy(position);
		this.rotation = Quaternion.copy(rotation);
		this.scale = Vector.copy(scale);

		this.mTranslate = Matrix.translation(v);
		this.mRotate = Matrix.rotation(q);
		this.mScale = Matrix.scale(v);
		this.mWorld = Matrix.prod([this.mTranslate, this.mRotate, this.mScale]);

		this.hasMoved = false;
		this.hasRotated = false;
		this.hasScaled = false;

		this.needsUpdate = false;


	}


	/*
		setPosition(v)
			Set the position of the Transform.
		args:
			v (Vector) : the new position
		tasks:
			1. Set the coordinates of this.position to those provided in v.
				Use this.position's "set" method, it should be the same object
				with altered values.
			2. Update the appropriate boolean field(s), as the position has now changed.
	*/
	//set position to same value that is passed in.
	//this.position.set(v);
	setPosition(v)
	{
		// TODO
		this.position.set(v);

		this.needsUpdate = true;

	}


	/*
		setRotation(q)
			Set the rotation of the Transform.
		args:
			q (Quaternion) : the new rotation
		tasks:
			1. Set the fields of this.rotation to those provided in q.
				Use this.rotation's "set" method, it should be the same object
				with altered values.
			2. Update the appropriate boolean field(s), as the rotation has now changed.
	*/
	setRotation(q)
	{

		this.rotation.set(q);

		this.needsUpdate = true;

		// // TODO
		// 	return new Float32Array([
		// 	//COLUMN 1
		// 	1 - 2*q.y*q.y - 2*q.z*q.z, 
		// 		2*q.x*q.y + 2*q.z*q.w, 
		// 		2*q.x*q.z - 2*q.y*q.w,
		// 		0,
		// 	//COLUMN 2
		// 		2*q.x*q.y - 2*q.z*q.w,
		// 	1 - 2*q.x*q.x - 2*q.z*q.z,
		// 		2*q.y*q.z + 2*q.x*q.w,
		// 		0,
		// 	//COLUMN 3
		// 		2*q.x*q.z + 2*q.y*q.w,
		// 		2*q.y*q.z - 2*q.x*q.w,
		// 	1 - 2*q.x*q.x - 2*q.y*q.y,
		// 		0,
		// 	//COLUMN 4
		// 		0, 0, 0, 1
		// ]);

		// 	hasMoved = true;
		// 	needsUpdate = true;

	}


	/*
		setScale(v)
			Set the scale of the Transform.
		args:
			v (Vector) : the new scale
		tasks:
			1. Set the coordinates of this.scale to those provided in v.
				Use this.scale's "set" method, it should be the same object
				with altered values.
			2. Update the appropriate boolean field(s), as the scale has now changed.
	*/
	setScale(v)
	{
		// TODO

		this.scale.set(v);

		this.needsUpdate = true;

	}


	/*
		translate(v)
			Translate the Transform along a provided Vector.
		args:
			v (Vector) : the Vector along which to translate
		tasks:
			1. Update this.position (in place) using the appropriate Vector method.
			2. Update the appropriate boolean field(s), as the position has now changed.
	*/
	//add vector to our position
	translate(v)
	{
		// TODO

		return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.x, v.y, v.z, 1]);

		this.needsUpdate = true;
	}


	/*
		rotate(q)
			Rotate the Transform using a provided Quaternion.
		args:
			q (Quaternion) : the Quaternion by which to rotate
		tasks:
			1. Update this.rotation (in place) by composing q into it using the
				appropriate Quaternion method.
			2. Update the appropriate boolean field(s), as the rotation has now changed.
	*/
	//rotating by a new vector
	//compose new rotation into existiong rotation
	rotate(q)
	{
		// TODO

		return new Float32Array([
			//COLUMN 1
			1 - 2*q.y*q.y - 2*q.z*q.z, 
				2*q.x*q.y + 2*q.z*q.w, 
				2*q.x*q.z - 2*q.y*q.w,
				0,
			//COLUMN 2
				2*q.x*q.y - 2*q.z*q.w,
			1 - 2*q.x*q.x - 2*q.z*q.z,
				2*q.y*q.z + 2*q.x*q.w,
				0,
			//COLUMN 3
				2*q.x*q.z + 2*q.y*q.w,
				2*q.y*q.z - 2*q.x*q.w,
			1 - 2*q.x*q.x - 2*q.y*q.y,
				0,
			//COLUMN 4
				0, 0, 0, 1
		]);

		this.needsUpdate = true;
	}


	/*
		localRotate(q)
			Rotate the Transform using a provided quaternion in local space.
		args:
			q (Quaternion) : the Quaternion by which to rotate in local space
		tasks:
			1. Update this.rotation (in place) by composing q into it in local space
				using the appropriate Quaternion method.
			2. Update the appropriate boolean field(s), as the rotation has now changed.
	*/

	localRotate(q)
	{
		// TODO
	}


	/*
		rotateAround(point, rot, lockOrientation=false)
			Rotate ("orbit") around a specified point by a specified rotation.
			Change orientation in kind, unless the orientation is locked.
		args:
			point (Vector) : the point around which to "orbit"
			rot (Quaternion) : the rotation to do around point
			lockOrientation(boolean, default false) : If true, the Transform is
				"orbitting" but not rotating (so only its position changes).
				If false, the Transform is rotating as well, so its rotation
				changes too.
		tasks:
			1. Rotate the this.position around the provided point.
				(a) Subtract the point from this.position.
				(b) Rotate this.position by the provided rotation.
				(c) Add the point back to this.position.
			2. If lockOrientation is false, then also rotate the Transform
				(use the rotate method that you defined above).
			3. Update the appropriate boolean field(s):
				- The position has changed.
				- The rotation might have changed, but if it did then calling
					the rotate method already updated *that* boolean.

	*/
	//weird one
	//
	rotateAround(point, rot, lockOrientation=false)
	{
		// TODO
	}


	/*
		scaleBy(v)
			Scale the Transform by the provided vector.
		args:
			v (Vector) : the vector by which to scale
		tasks:
			1. Update this.scale (in place) to scale it up by v.
				The Vector class has a method for this.
			2. Update the appropriate boolean field(s), as the scale has now changed. 
	*/
	scaleBy(v)
	{
		// TODO
	}


	/*
		updateTranslationMatrix()
			Update the Transform's translation matrix so it matches the current position.
		tasks:
			1. Update this.mTranslate to match this.position by using the appropriate
				Matrix method.
			2. Update the appropriate boolean field(s); the translation matrix is now
				up to date.
	*/
	//set mTranslate to that
	//set bool to false after update translatematrix
	updateTranslationMatrix()
	{
		// TODO
	}


	/*
		updateRotationMatrix()
			Update the Transform's rotation matrix so it matches the current rotation.
		tasks:
			1. Update this.mRotate to match this.rotation by using the appropriate
				Matrix method.
			2. Update the appropriate boolean field(s); the rotation matrix is now
				up to date.
	*/
	updateRotationMatrix()
	{
		// TODO
	}


	/*
		updateScaleMatrix()
			Update the Transform's scale matrix so it matches the current scale.
		tasks:
			1. Update this.mScale to match this.scale by using the appropriate
				Matrix method.
			2. Update the appropriate boolean field(s); the scale matrix is now
				up to date.
	*/
	updateScaleMatrix()
	{
		// TODO
	}


	/*
		updateWorldMatrix()
			Update the Transform's world matrix so it matches the current translation,
			rotation and scale matrices (which are assumed to already be up to date).
		tasks:
			1. Update this.mWorld to match this.mTranslate, this.mRotate, and
				this.mScale by using the appropriate Matrix method.
			2. Update the appropriate boolean field(s); the world matrix is now
				up to date.
	*/
	updateWorldMatrix()
	{
		// TODO
	}

	/*
		update()
			Update all transformations, with the end goal of updating the world matrix to
			match the current position, rotation and scale. Avoid updating any matrices
			that have not changed.
	*/
	update()
	{
		if (this.needsUpdate)
		{
			if (this.hasMoved)
			{
				this.updateTranslationMatrix();
			}
			if (this.hasRotated)
			{
				this.updateRotationMatrix();
			}
			if (this.hasScaled)
			{
				this.updateScaleMatrix();
			}
			this.updateWorldMatrix();
		}
	}
}