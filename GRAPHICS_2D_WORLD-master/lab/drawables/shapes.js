class Box
{
	static positionArray()
	{
		return new Float32Array([
			-1.0, -1.0, // bottom left
			1.0,  -1.0, // bottom right
			1.0,  1.0,  // top right
			-1.0, 1.0,  // top left
		]);
	}

	static indexArray()
	{
		return new Uint16Array([
			0, 1, 2,
			0, 2, 3
		]);
	}

	static colorArray(bl, br, tr, tl)
	{
		return new Float32Array([
			bl[0], bl[1], bl[2],
			br[0], br[1], br[2],
			tr[0], tr[1], tr[2],
			tl[0], tl[1], tl[2]
		]);
	}
}

class Oval
{
	static positionArray(nSides)
	{
		var positions = [
			0.0, 0.0
		];

		let twoPi = 2*Math.PI;
		for (var i = 0; i <= nSides; i++)
		{
			var theta = twoPi * i / nSides;
			positions.push(Math.cos(theta));
			positions.push(Math.sin(theta));
		}

		return new Float32Array(positions);
	}

	static indexArray(nSides)
	{
		var index = [];

		for (var i = 1; i <= nSides; i++)
		{
			index.push(0);
			index.push(i);
			index.push(i+1);
		}

		return new Uint16Array(index);
	}

	static colorFadeArray(nSides, centerColor, rimColor)
	{
		var colors = [];
		colors.push(centerColor[0]);
		colors.push(centerColor[1]);
		colors.push(centerColor[2]);

		for (var i = 0; i <= nSides; i++)
		{
			colors.push(rimColor[0]);
			colors.push(rimColor[1]);
			colors.push(rimColor[2]);
		}

		return new Float32Array(colors);
	}
}