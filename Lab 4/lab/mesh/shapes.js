//Sean Blanchard
//Lab 4
//Comp464
//10-10-20


class Cube extends Transform
{
	static positionArray()
	{
		 return [
            // top			
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,
            // bottom
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, -0.5,
            // right
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            // left
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, -0.5,
            // back
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,
            // front
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5
        ];
	}

	static indexArray()
	{
		 return [
            // top
            0, 2, 1,
            0, 3, 2,
            // bottom
            4, 6, 5,
            4, 7, 6,
            // right
            8, 10, 9,
            8, 11, 10,
            // left
            12, 14, 13,
            12, 15, 14,
            // back
            16, 18, 17,
            16, 19, 18,
            // front
            20, 22, 21,
            20, 23, 22
        ];
	}

	 static normalArray() {
        return [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
    
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
    
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
    
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
    
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
    
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];
    }

	static colorArray(c)
	{
		  var r = c[0];
        var g = c[1];
        var b = c[2];
            
        return [
            // top / bottom
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
    
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
            // left / right
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
    
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,

            // front / back
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b,
    
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b
        ];
	}
}