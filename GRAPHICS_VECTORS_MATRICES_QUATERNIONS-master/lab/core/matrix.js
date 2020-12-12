//Sean Blanchard
//9/21/2020
//Lab 02 COMP 464

// MATRIX CLASS DESCRIPTION:
/*
	The Matrix class will contain utilities for generating and manipulating
	any 4x4 matrices needed for our purposes in graphics.

	Resulting matrices will be represented in column-major form as 1D
	Float32Arrays with 16 elements.

	This means the first 4 elements are the 1st column, the next 4 are the
	second column, and so on...

	This class will have no fields; it will contain only static methods to
	to generate and manipulate matrices in this form. The matrices themselves
	will be assumed to be Float32Arrays with 16 elements.
*/

class Matrix
{
	// returns the identity matrix
	static identity()
	{
		//return new Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
		//Matrix = new Float32Arrays([1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]);
		return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
	}

	// given two matrices (as Float32Arrays), multiplies them together and returns the result
	// don't forget, the inputs and result are in column-major form!
	//hardcode 16 entries
	static mul(mat1, mat2)
	{
		//var result = Matrix.indentity();

		//var multResult = new Float32Array(identity());
		var multResult = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);


		for (var i=0; i<4; i++) 
		{
			for (var j = 0; j < 4; j++)
			{
				var total = 0;
				for(var k = 0; k < 4; k++)
				{
					total += mat1[k * 4 + i] * mat2[j * 4 + k];
				}
				multResult[j * 4 + i] = total;
			}
		}
		return multResult

	}

	// given an array or list of matrices, multiplies them all (in order, left to right) and returns the result
	// use a loop and the mul method.
	// call mult in loop
	//get first index in mats
	static prod(mats)
	{
    var result = mats[0];
    for (let i = 1; i < mats.length; i++)
    	{
    		result = Matrix.mul(result, mats[i]);
   		}
   		return result;
	}


	// NOTE: We won't be implementing a method to apply matrix transformations to vectors.
	// 		 These transformations will be applied in our shaders, with GLSL's built-in matrix
	//       multiplication. We will often calculate a transform on the CPU with the matrix
	//       multiplication we've defined, and then apply it to every vector in a model in
	//       the shaders.
	//ALREADY FILLED OUT - USED FOR TESTING

	static equals(mat1, mat2)
	{
		if (! mat1 instanceof Float32Array || ! mat2 instanceof Float32Array 
			|| mat1.length != 16 || mat2.length != 16)
		{
			console.log("%cInvalid inputs for Matrix.equals.","color:red");
			return false;
		}

		let threshold = 0.001;
		for (var i = 0; i < 16; i++)
		{
			if (Math.abs(mat1[i]-mat2[i]) > threshold)
			{
				return false;
			}
		}
		return true;
	}
}