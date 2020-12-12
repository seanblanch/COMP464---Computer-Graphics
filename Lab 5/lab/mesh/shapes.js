class Cube
{
	static positionArray()
	{
		return new Float32Array([
			// top (+y)
			-0.5, 0.5, -0.5,
			-0.5, 0.5, 0.5,
			0.5,  0.5, 0.5,
			0.5,  0.5, -0.5,

			// bottom (-y)
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,
			0.5,  -0.5, -0.5,
			0.5,  -0.5, 0.5,

			// left (-x)
			-0.5, 0.5,  -0.5,
			-0.5, -0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, 0.5,  0.5,

			// right (+x)
			0.5, 0.5,  0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
			0.5, 0.5,  -0.5,

			// back (-z)
			0.5,  0.5,  -0.5,
			0.5,  -0.5, -0.5,
			-0.5, -0.5, -0.5,
			-0.5, 0.5,  -0.5,

			// front (+z)
			-0.5, 0.5,  0.5,
			-0.5, -0.5, 0.5,
			0.5,  -0.5, 0.5,
			0.5,  0.5,  0.5
		]);
	}

	static normalArray()
	{
		return new Float32Array([	
			// top
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			// bottom
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,

			// left
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			// right
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			// back
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,

			// front
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		]);
	}

	static defaultColorArray()
	{
		return new Float32Array([
			// top / bottom is green
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,

			// left / right is red
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
	 		1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
	 		1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,

			// front / back is blue
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
	 		0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,

			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
	 		0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		]);
	}

	static uvRepeatArray()
	{
		// TODO
		// Write UV coords matching the positions array
		// to map every face to the entirety of an image
		// (each face displays the whole image).

		return new Float32Array([
			// // top (+y)
			// -0.5, 0.5, -0.5,
			// -0.5, 0.5, 0.5,
			// 0.5,  0.5, 0.5,
			// 0.5,  0.5, -0.5,
			0, 0,
			0, 1,
			1, 1,
			1, 0,

			// // bottom (-y)
			// -0.5, -0.5, 0.5,
			// -0.5, -0.5, -0.5,
			// 0.5,  -0.5, -0.5,
			// 0.5,  -0.5, 0.5,
			0, 0,
			0, 1,
			1, 1,
			1, 0,


			// // left (-x)
			// -0.5, 0.5,  -0.5,
			// -0.5, -0.5, -0.5,
			// -0.5, -0.5, 0.5,
			// -0.5, 0.5,  0.5,
			0, 0,
			0, 1,
			1, 1,
			1, 0,

			// // right (+x)
			// 0.5, 0.5,  0.5,
			// 0.5, -0.5, 0.5,
			// 0.5, -0.5, -0.5,
			// 0.5, 0.5,  -0.5,
			1, 0,
			0, 0,
			0, 1,
			1, 1,

			// // back (-z)
			// 0.5,  0.5,  -0.5,
			// 0.5,  -0.5, -0.5,
			// -0.5, -0.5, -0.5,
			// -0.5, 0.5,  -0.5,
			1, 0,
			0, 0,
			0, 1,
			1, 1,

			// // front (+z)
			// -0.5, 0.5,  0.5,
			// -0.5, -0.5, 0.5,
			// 0.5,  -0.5, 0.5,
			// 0.5,  0.5,  0.5
			0, 0,
			0, 1,
			1, 1,
			1, 0
		]);
	}

	static uvUnwrappedArray()
	{
		// TODO
		// Write UV coords matching the positions array
		// to map vertices to the provided unwrapped cube texture
		return new Float32Array([
		// // top (+y)
		// 	-0.5, 0.5, -0.5,
		// 	-0.5, 0.5, 0.5,
		// 	0.5,  0.5, 0.5,
		// 	0.5,  0.5, -0.5,
			0.25, 0,
			0.25, 0.33,
			0.50, 0.34,
			0.50, 0,


		// 	// bottom (-y)
		// 	-0.5, -0.5, 0.5,
		// 	-0.5, -0.5, -0.5,
		// 	0.5,  -0.5, -0.5,
		// 	0.5,  -0.5, 0.5,
			0.25, 0.66,
			0.25, 1,
			0.5, 1,
			0.5, 0.66,

		// 	// left (-x)
		// 	-0.5, 0.5,  -0.5,
		// 	-0.5, -0.5, -0.5,
		// 	-0.5, -0.5, 0.5,
		// 	-0.5, 0.5,  0.5,
		0, 1/3,
		0, 2/3,
		1/4, 2/3,
		1/4, 1/3,

		// 	// right (+x)
		// 	0.5, 0.5,  0.5,
		// 	0.5, -0.5, 0.5,
		// 	0.5, -0.5, -0.5,
		// 	0.5, 0.5,  -0.5,
		2/4, 1/3,
		2/4, 2/3,
		3/4, 2/3,
		3/4, 1/3,

		// 0.75, 0.34,
		// 	0.75, 0.66,
		// 	0.5, 0.66,
		// 	0.5, 0.34,

		// 	// back (-z)
		// 	0.5,  0.5,  -0.5,
		// 	0.5,  -0.5, -0.5,
		// 	-0.5, -0.5, -0.5,
		// 	-0.5, 0.5,  -0.5,
		3/4, 1/3,
		3/4, 2/3,
		1, 2/3,
		1, 1/3,

		// 	// front (+z)
		// 	-0.5, 0.5,  0.5,
		// 	-0.5, -0.5, 0.5,
		// 	0.5,  -0.5, 0.5,
		// 	0.5,  0.5,  0.5
		0.5, 0.34,
		0.25, 0.34,
		0.25, 0.66,
		0.5, 0.66,

		]);

	}

	static indexArray()
	{
		return new Uint16Array([
			// top
			0, 1, 2,
			0, 2, 3,
			// bottom
			4, 5, 6,
			4, 6, 7,
			// right
			8, 9, 10,
			8, 10, 11,
			// left
			12, 13, 14,
			12, 14, 15,
			// back
			16, 17, 18,
			16, 18, 19,
			// front
			20, 21, 22,
			20, 22, 23
		]);
	}
}

class Sphere
{
	static positionArray(latBands, longBands)
	{
		var pos = [];
		for (var lat = 0; lat <= latBands; lat++)
		{
			var theta = lat * Math.PI / latBands;
			var sinTheta = Math.sin(theta);
			var cosTheta = Math.cos(theta);

			for (var long = 0; long <= longBands; long++)
			{
				var phi = long * 2 * Math.PI / longBands;
				var sinPhi = Math.sin(phi);
				var cosPhi = Math.cos(phi);

				var x = sinTheta * sinPhi;
				var y = cosTheta;
				var z = sinTheta * cosPhi; 

				pos.push(x);
				pos.push(y);
				pos.push(z);
			}
		}
		return new Float32Array(pos);
	}

	static normalArray(latBands, longBands)
	{
		return Sphere.positionArray(latBands, longBands);
	}

	static uvArray(latBands, longBands)
	{
		// TODO
		// Map the sphere to the sphereical texture.
		// Each latitude band spans the entire width of the picture.
		// Must match the position array; read through it first.
		// It goes from top to bottom, in counterclockwise circles
		// (counterclockwise if viewed from above)
	}

	static indexArray(latBands, longBands)
	{
		var ind = [];
		for (var lat = 0; lat < latBands; lat++)
		{
			for (var long = 0; long < longBands; long++)
			{
				var topLeftIndex = lat * (longBands + 1) + long;
				var topRightIndex = topLeftIndex + 1;
				var bottomLeftIndex = topLeftIndex + longBands + 1;
				var bottomRightIndex = bottomLeftIndex + 1;

				// top left triangle
				ind.push(topLeftIndex);
				ind.push(bottomLeftIndex);
				ind.push(topRightIndex);

				// bottom right triangle
				ind.push(bottomLeftIndex);
				ind.push(bottomRightIndex);
				ind.push(topRightIndex);
			}
		}
		return new Uint16Array(ind);
	}
}