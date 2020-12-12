// test functions
var testlog = function(bool)
{
	if (bool)
	{
		console.log("%cTEST PASSED","color:green");
	}
	else
	{
		console.log("%cTEST FAILED","color:red");
	}
}

var floatApproxEquals = function(f1, f2)
{
	let threshold = 0.001;
	if (Math.abs(f1-f2) > threshold)
	{
		return false;
	}
	return true;
}

var forceCreateVector = function(x, y, z)
{
	var out = new Vector();
	out.x = x;
	out.y = y;
	out.z = z;
	return out;
}

var forceCreateQuaternion = function(w, x, y, z)
{
	var out = new Quaternion();
	out.w = w;
	out.x = x;
	out.y = y;
	out.z = z;
	return out;
}


// 4x4 MATRIX TRANSFORMATIONS

console.log("%c***TESTING Matrix.translation***","color:blue");

var v = new Vector(1,2,3);
console.log("	Creating translation matrix for position:\n\t", v);
var M = Matrix.translation(v);
var correct = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1])

console.log("	Translation matrix is:");
console.log("	",M);
console.log("	Translation matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));

var v = new Vector(33,-44,132);
console.log("	Creating translation matrix for position:\n\t", v);
var M = Matrix.translation(v);
var correct = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 33, -44, 132, 1])

console.log("	Translation matrix is:");
console.log("	",M);
console.log("	Translation matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));


console.log("%c***TESTING Matrix.scale***","color:blue");

var v = new Vector(4,5,6);
console.log("	Creating scale matrix for scale:\n\t", v);
M = Matrix.scale(v);
var correct = new Float32Array([4, 0, 0, 0, 0, 5, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1]);

console.log("	Scale matrix is:");
console.log("	",M);
console.log("	Scale matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));

var v = new Vector(-4,127.5,72.98);
console.log("	Creating scale matrix for scale:\n\t", v);
M = Matrix.scale(v);
var correct = new Float32Array([-4, 0, 0, 0, 0, 127.5, 0, 0, 0, 0, 72.98, 0, 0, 0, 0, 1]);

console.log("	Scale matrix is:");
console.log("	",M);
console.log("	Scale matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));


console.log("%c***TESTING Matrix.rotation***","color:blue");

var q = new Quaternion(Math.PI, 1,0,0);
console.log("	Creating rotation matrix for 180 degrees about the x axis.");
M = Matrix.rotation(q);
correct = new Float32Array([1, 0,  0,  0, 
							0, -1, 0,  0,
							0, 0,  -1, 0,
							0, 0,  0,  1]);
	
console.log("	Rotation matrix is:");
console.log("	",M);
console.log("	Rotation matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));

q = new Quaternion(Math.PI, 0,1,0);
console.log("	Creating rotation matrix for 180 degrees about the y axis.");
M = Matrix.rotation(q);
correct = new Float32Array([-1, 0,  0,  0, 
							0,  1,  0,  0,
							0,  0,  -1, 0,
							0,  0,  0,  1]);
	
console.log("	Rotation matrix is:");
console.log("	",M);
console.log("	Rotation matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));

q = new Quaternion(Math.PI, 0,0,1);
console.log("	Creating rotation matrix for 180 degrees about the z axis.");
M = Matrix.rotation(q);
correct = new Float32Array([-1, 0,  0, 0, 
							0,  -1, 0, 0,
							0,  0,  1, 0,
							0,  0,  0, 1]);

q = new Quaternion(Math.PI/2, 1,0,0);
console.log("	Creating rotation matrix for 90 degrees about the x axis.");
M = Matrix.rotation(q);
correct = new Float32Array([1, 0,  0, 0, 
							0, 0,  1, 0,
							0, -1, 0, 0,
							0, 0,  0, 1]);
	
console.log("	Rotation matrix is:");
console.log("	",M);
console.log("	Rotation matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));

q = new Quaternion(Math.PI/2, 0,1,0);
console.log("	Creating rotation matrix for 90 degrees about the y axis.");
M = Matrix.rotation(q);
correct = new Float32Array([0, 0,  -1, 0, 
							0, 1,  0,  0,
							1, 0,  0,  0,
							0, 0,  0,  1]);
	
console.log("	Rotation matrix is:");
console.log("	",M);
console.log("	Rotation matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));

q = new Quaternion(Math.PI/2, 0,0,1);
console.log("	Creating rotation matrix for 90 degrees about the z axis.");
M = Matrix.rotation(q);
correct = new Float32Array([0,  1, 0, 0, 
							-1, 0, 0, 0,
							0,  0, 1, 0,
							0,  0, 0, 1]);
	
console.log("	Rotation matrix is:");
console.log("	",M);
console.log("	Rotation matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));

q = new Quaternion(Math.PI*25/180, 1,2,3);
console.log("	Creating rotation matrix for 25 degrees about axis (1,2,3)");
M = Matrix.rotation(q);
correct = new Float32Array([0.9130001068115234, 0.35223305225372314, -0.20582206547260284, 0,
							-0.32546383142471313, 0.9330769777297974, 0.1531032919883728, 0,
							0.24597586691379547, -0.07279567420482635, 0.9665384888648987, 0,
							0, 0, 0, 1]);

console.log("	Rotation matrix is:");
console.log("	",M);
console.log("	Rotation matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));

q = new Quaternion(Math.PI*310/180, 122,1,2);
console.log("	Creating rotation matrix for 310 degrees about axis (1,2,3)");
M = Matrix.rotation(q);
correct = new Float32Array([0.9998800158500671, -0.009629009291529655, 0.012131973169744015, 0,
							0.01548298355191946, 0.6428115963935852, -0.7658678293228149, 0,
							-0.00042402412509545684, 0.7659637928009033, 0.6428835988044739, 0,
							0, 0, 0, 1]);

console.log("	Rotation matrix is:");
console.log("	",M);
console.log("	Rotation matrix should be:");
console.log("	",correct);
testlog(Matrix.equals(M, correct));


console.log("%c***TESTING Transform.constructor with default values***","color:blue");

console.log("	Constructing a new Transform...");
var t = new Transform();
var id = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
var correctPosition = forceCreateVector(0,0,0);
var correctRotation = forceCreateQuaternion(1,0,0,0);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = id;
var correctMRotate = id;
var correctMScale = id;
var correctMWorld = id;
var correctHasMoved = false;
var correctHasRotated = false;
var correctHasScaled = false;
var correctNeedsUpdate = false;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMScale);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMRotate);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld);
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate
);


console.log("%c***TESTING Transform.constructor with custom values***","color:blue");

position = new Vector(1,2,3);
rotation = new Quaternion(5*Math.PI/3,3,4,5);
scale = new Vector(8,5,2);
console.log("\tConstructing a new Transform with:",
	"\n\ttranslation :", position,
	"\n\trotation :", rotation,
	"\n\tscale :", scale
);
console.log("	Constructing a new Transform...");
t = new Transform(position, rotation, scale);
var id = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
var correctPosition = forceCreateVector(1,2,3);
var correctRotation = forceCreateQuaternion(
	-0.8660254037844387, 0.21213203435596423, 
	0.28284271247461895, 0.3535533905932737
);
var correctScale = forceCreateVector(8,5,2);
var correctMTranslate = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]);
var correctMRotate = new Float32Array([
	0.5899999737739563, -0.49237242341041565, 0.6398979425430298,   0,
	0.7323724627494812,  0.6600000262260437,  -0.16742345690727234, 0,
	-0.3398979604244232, 0.5674234628677368,  0.75,                 0,
	0,                   0,                   0,                    1
]);
var correctMScale = new Float32Array([8, 0, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1]);
var correctMWorld = new Float32Array([
	4.71999979019165,    -3.938979387283325, 5.119183540344238,   0,
	3.661862373352051,   3.3000001907348633, -0.8371173143386841, 0,
	-0.6797959208488464, 1.1348469257354736, 1.5,                 0,
	1,                   2,                  3,                   1
]);
var correctHasMoved = false;
var correctHasRotated = false;
var correctHasScaled = false;
var correctNeedsUpdate = false;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Position", (t.position === position ? "IS" : "is not"),
	"the same object as the original (should not be, should be a copy)."
);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Rotation", (t.rotation === rotation ? "IS" : "is not"),
	"the same object as the original (should not be, should be a copy)."
);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Scale", (t.scale === scale ? "IS" : "is not"),
	"the same object as the original (should not be, should be a copy)."
);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld);
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate && t.position !== position
	&& t.rotation !== rotation && t.scale !== scale
);


console.log("%c***TESTING Transform.setPosition***","color:blue");

console.log("	Constructing default transform...")
t = new Transform();
position = new Vector(1,2,3);
var originalPositionReference = t.position;
console.log("	Setting position to", position);
t.setPosition(position);

var correctPosition = forceCreateVector(1,2,3);
var correctRotation = forceCreateQuaternion(1, 0, 0, 0);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = id;
var correctMRotate = id;
var correctMScale = id;
var correctMWorld = id;
var correctHasMoved = true;
var correctHasRotated = false;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Position", (t.position === position ? "IS" : "is not"),
	"the same object as the argument (should not be)."
);
console.log("	Position", (t.position === originalPositionReference ? "is" : "IS NOT"),
	"the same object as it originally was (should be; use the old position's \"set\" method)."
);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate, "(it should not have updated yet.");
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld, "(it should not have updated yet).");
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate && t.position !== position
	&& t.position === originalPositionReference
);


console.log("%c***TESTING Transform.translate***","color:blue");

position = new Vector(1,2,3);
console.log("	Constructing new Transform at position", position);
t = new Transform(position);
var originalPositionReference = t.position;
console.log("	Translating by", position);
t.translate(position);

var correctPosition = forceCreateVector(2,4,6);
var correctRotation = forceCreateQuaternion(1, 0, 0, 0);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]);
var correctMRotate = id;
var correctMScale = id;
var correctMWorld = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]);
var correctHasMoved = true;
var correctHasRotated = false;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Position", (t.position === position ? "IS" : "is not"),
	"the same object as the argument (should not be)."
);
console.log("	Position", (t.position === originalPositionReference ? "is" : "IS NOT"),
	"the same object as it originally was (should be; use the old position's \"set\" method)."
);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate,
	"(it should not have updated with the new translation)"
);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld,
	"(it should not have updated yet with the new translation)"
);
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate && t.position !== position
	&& t.position === originalPositionReference
);


console.log("%c***TESTING Transform.updateTranslationMatrix***","color:blue");

position = new Vector(1,2,3);
console.log("	Constructing new Transform at position", position);
t = new Transform(position);
var originalPositionReference = t.position;
console.log("	Translating by", position);
t.translate(position);
console.log("	Updating Translation Matrix...");
t.updateTranslationMatrix();

var correctPosition = forceCreateVector(2,4,6);
var correctRotation = forceCreateQuaternion(1, 0, 0, 0);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 4, 6, 1]);
var correctMRotate = id;
var correctMScale = id;
var correctMWorld = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]);
var correctHasMoved = false;
var correctHasRotated = false;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld,
	"(it should not have updated yet with the new translation)"
);
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate
);


console.log("%c***TESTING Transform.setRotation***","color:blue");

console.log("	Creating default Transform...");
t = new Transform();
rotation = new Quaternion(Math.PI/2,1,0,0);
var originalRotationReference = t.rotation;
console.log("	Setting rotation to", rotation);
t.setRotation(rotation);

var correctPosition = forceCreateVector(0,0,0);
var correctRotation = forceCreateQuaternion(0.7071067811865476, 0.7071067811865476, 0, 0);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = id;
var correctMRotate = id;
var correctMScale = id;
var correctMWorld = id;
var correctHasMoved = false;
var correctHasRotated = true;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Rotation", (t.rotation === rotation ? "IS" : "is not"),
	"the same object as the argument (should not be)."
);
console.log("	Rotation", (t.rotation === originalRotationReference ? "is" : "IS NOT"),
	"the same object as it originally was (should be; use the old rotation's \"set\" method)."
);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate, "(it should not have updated yet).");
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld, "(it should not have updated yet).");
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate && t.rotation !== rotation
	&& t.rotation === originalRotationReference
);


console.log("%c***TESTING Transform.rotate***","color:blue");

rotation = new Quaternion(Math.PI/2,0,1,0);
console.log("	Creating Transform with rotation", rotation);
t = new Transform(new Vector(), rotation);
var originalRotationReference = t.rotation;
rotation = new Quaternion(Math.PI/2,0,0,1);
console.log("	rotating by ", rotation);
t.rotate(rotation);

var correctPosition = forceCreateVector(0,0,0);
var correctRotation = forceCreateQuaternion(0.5, -0.5, 0.5, 0.5);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = id;
var correctMRotate = new Float32Array([
	0, 0, -1, 0,
	0, 1,  0, 0,
	1, 0,  0, 0,
	0, 0,  0, 1
]);
var correctMScale = id;
var correctMWorld = correctMRotate;
var correctHasMoved = false;
var correctHasRotated = true;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Rotation", (t.rotation === originalRotationReference ? "is" : "IS NOT"),
	"the same object as it originally was (should be; use the old rotation's \"set\" method)."
);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate,
	"(it should not have updated yet)."
);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld,
	"(it should not have updated yet)."
);
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate && t.rotation === originalRotationReference
);


console.log("%c***TESTING Transform.localRotate***","color:blue");

rotation = new Quaternion(Math.PI/2,0,1,0);
console.log("	Creating Transform with rotation", rotation);
t = new Transform(new Vector(), rotation);
var originalRotationReference = t.rotation;
rotation = new Quaternion(Math.PI/2,0,0,1);
console.log("	rotating (in local space) by ", rotation);
t.localRotate(rotation);

var correctPosition = forceCreateVector(0,0,0);
var correctRotation = forceCreateQuaternion(0.5, 0.5, 0.5, 0.5);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = id;
var correctMRotate = new Float32Array([
	0, 0, -1, 0,
	0, 1, 0,  0,
	1, 0, 0,  0,
	0, 0, 0,  1
]);
var correctMScale = id;
var correctMWorld = correctMRotate;
var correctHasMoved = false;
var correctHasRotated = true;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Rotation", (t.rotation === originalRotationReference ? "is" : "IS NOT"),
	"the same object as it originally was (should be; use the old rotation's \"set\" method)."
);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate, "(it should not have updated yet).");
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld, "(it should not have updated yet).");
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate && t.rotation === originalRotationReference
);


console.log("%c***TESTING Transform.rotateAround (lockOrientation = false)***","color:blue");

position = new Vector(1, 0, 0);
rotation = new Quaternion(Math.PI/2,0,0,1);
console.log("\tConstructing a new Transform with:",
	"\n\ttranslation :", position,
	"\n\trotation :", rotation
);
t = new Transform(position, rotation);
position = new Vector(0, 1, 0);
console.log("	Rotating around", position, "by", rotation);
t.rotateAround(position, rotation);

var correctPosition = forceCreateVector(1,2,0);
var correctRotation = forceCreateQuaternion(0, 0, 0, 1);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = new Float32Array([
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	1, 0, 0, 1
]);
var correctMRotate = new Float32Array([
	0,  1, 0, 0,
	-1, 0, 0, 0,
	0,  0, 1, 0,
	0,  0, 0, 1
]);
var correctMScale = id;
var correctMWorld = new Float32Array([
	0,  1, 0, 0,
	-1, 0, 0, 0,
	0,  0, 1, 0,
	1,  0, 0, 1
]);
var correctHasMoved = true;
var correctHasRotated = true;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate, "(it should not have updated yet).");
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate, "(it should not have updated yet).");
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld, "(it should not have updated yet).");
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate
);


console.log("%c***TESTING Transform.rotateAround (lockOrientation = true)***","color:blue");

position = new Vector(1, 0, 0);
rotation = new Quaternion(Math.PI/2,0,0,1);
console.log("\tConstructing a new Transform with:",
	"\n\ttranslation :", position,
	"\n\trotation :", rotation
);
t = new Transform(position, rotation);
position = new Vector(0, 1, 0);
console.log("	Rotating around", position, "by", rotation);
t.rotateAround(position, rotation, true);

var correctPosition = forceCreateVector(1,2,0);
var correctRotation = forceCreateQuaternion(0.7071067811865476, 0, 0, 0.7071067811865476);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = new Float32Array([
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	1, 0, 0, 1
]);
var correctMRotate = new Float32Array([
	0,  1, 0, 0,
	-1, 0, 0, 0,
	0,  0, 1, 0,
	0,  0, 0, 1
]);
var correctMScale = id;
var correctMWorld = new Float32Array([
	0,  1, 0, 0,
	-1, 0, 0, 0,
	0,  0, 1, 0,
	1,  0, 0, 1
]);
var correctHasMoved = true;
var correctHasRotated = false;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate, "(it should not have updated yet).");
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate, "(it should not have updated yet).");
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld, "(it should not have updated yet).");
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate
);


console.log("%c***TESTING Transform.updateRotationMatrix***","color:blue");

console.log("	Creating default Transform...");
t = new Transform();
rotation = new Quaternion(Math.PI/2,1,0,0);
console.log("	Setting rotation to", rotation);
t.setRotation(rotation);
console.log("	Updating rotation matrix...");
t.updateRotationMatrix();

var correctPosition = forceCreateVector(0,0,0);
var correctRotation = forceCreateQuaternion(0.7071067811865476, 0.7071067811865476, 0, 0);
var correctScale = forceCreateVector(1,1,1);
var correctMTranslate = id;
var correctMRotate = new Float32Array([
	1, 0,  0, 0,
	0, 0,  1, 0,
	0, -1, 0, 0,
	0, 0,  0, 1
]);
var correctMScale = id;
var correctMWorld = id;
var correctHasMoved = false;
var correctHasRotated = false;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld, "(it should not have updated yet).");
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate
);


console.log("%c***TESTING Transform.setScale***","color:blue");

console.log("	Creating default Transform...");
t = new Transform();
scale = new Vector(2,3,4);
var originalScaleReference = t.scale;
t.setScale(scale);
console.log("	Setting scale to", scale);
t.setScale(scale);

var correctPosition = forceCreateVector(0,0,0);
var correctRotation = forceCreateQuaternion(1, 0, 0, 0);
var correctScale = forceCreateVector(2,3,4);
var correctMTranslate = id;
var correctMRotate = id;
var correctMScale = id;
var correctMWorld = id;
var correctHasMoved = false;
var correctHasRotated = false;
var correctHasScaled = true;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Scale", (t.scale === scale ? "IS" : "is not"),
	"the same object as the argument (should not be)."
);
console.log("	Scale", (t.scale === originalScaleReference ? "is" : "IS NOT"),
	"the same object as it originally was (should be; use the old rotation's \"set\" method)."
);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale, "(it should not have updated yet).");
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld, "(it should not have updated yet).");
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate && t.scale !== scale
	&& t.scale === originalScaleReference
);


console.log("%c***TESTING Transform.scaleBy***","color:blue");

position = new Vector();
rotation = new Quaternion();
scale = new Vector(2, 3, 4);
console.log("\tConstructing a new Transform with:",
	"\n\ttranslation :", position,
	"\n\trotation :", rotation,
	"\n\tscale :", scale
);
t = new Transform(position, rotation, scale);
scale = new Vector(-2, 3, -4);
var originalScaleReference = t.scale;
console.log("	Scaling by", scale);
t.scaleBy(scale);

var correctPosition = forceCreateVector(0,0,0);
var correctRotation = forceCreateQuaternion(1, 0, 0, 0);
var correctScale = forceCreateVector(-4,9,-16);
var correctMTranslate = id;
var correctMRotate = id;
var correctMScale = new Float32Array([
	2, 0, 0, 0,
	0, 3, 0, 0,
	0, 0, 4, 0,
	0, 0, 0, 1
]);
var correctMWorld = correctMScale;
var correctHasMoved = false;
var correctHasRotated = false;
var correctHasScaled = true;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Scale", (t.scale === scale ? "IS" : "is not"),
	"the same object as the argument (should not be)."
);
console.log("	Scale", (t.scale === originalScaleReference ? "is" : "IS NOT"),
	"the same object as it originally was (should be; use the old rotation's \"set\" method)."
);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale, "(it should not have updated yet).");
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld, "(it should not have updated yet).");
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate && t.scale !== scale
	&& t.scale === originalScaleReference
);


console.log("%c***TESTING Transform.updateScaleMatrix***","color:blue");

position = new Vector();
rotation = new Quaternion();
scale = new Vector(2, 3, 4);
console.log("\tConstructing a new Transform with:",
	"\n\ttranslation :", position,
	"\n\trotation :", rotation,
	"\n\tscale :", scale
);
t = new Transform(position, rotation, scale);
scale = new Vector(-2, 3, -4);
console.log("	Scaling by", scale);
t.scaleBy(scale);
console.log("	Updating scale matrix...");
t.updateScaleMatrix();

var correctPosition = forceCreateVector(0,0,0);
var correctRotation = forceCreateQuaternion(1, 0, 0, 0);
var correctScale = forceCreateVector(-4,9,-16);
var correctMTranslate = id;
var correctMRotate = id;
var correctMScale = new Float32Array([
	-4, 0, 0,   0,
	0,  9, 0,   0,
	0,  0, -16, 0,
	0,  0, 0,   1
]);
var correctMWorld = new Float32Array([
	2, 0, 0, 0,
	0, 3, 0, 0,
	0, 0, 4, 0,
	0, 0, 0, 1
]);
var correctHasMoved = false;
var correctHasRotated = false;
var correctHasScaled = false;
var correctNeedsUpdate = true;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld, "(it should not have updated yet).");
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate
);


console.log("%c***TESTING Transform.updateWorldMatrix***","color:blue");

console.log("	Creating default Transform...");
t = new Transform();
position = new Vector(2, 3, 4);
rotation = new Quaternion(Math.PI/2, 0, 0, 1);
scale = new Vector(5, 6, 7);
console.log("	Setting:",
	"\n\tposition :", position,
	"\n\trotation :", rotation,
	"\n\tscale :", scale
);
t.setPosition(position);
t.setRotation(rotation);
t.setScale(scale);
console.log("	Updating translation, rotation and scale matrices...");
t.updateTranslationMatrix();
t.updateRotationMatrix();
t.updateScaleMatrix();
console.log("	Updating world matrix...");
t.updateWorldMatrix();

var correctPosition = forceCreateVector(2, 3, 4);
var correctRotation = forceCreateQuaternion(0.7071067811865476, 0, 0, 0.7071067811865476);
var correctScale = forceCreateVector(5, 6, 7);
var correctMTranslate = new Float32Array([
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	2, 3, 4, 1
]);
var correctMRotate = new Float32Array([
	0,  1, 0, 0,
	-1, 0, 0, 0,
	0,  0, 1, 0,
	0,  0, 0, 1
]);
var correctMScale = new Float32Array([
	5, 0, 0, 0,
	0, 6, 0, 0,
	0, 0, 7, 0,
	0, 0, 0, 1
]);
var correctMWorld = new Float32Array([
	0,  5, 0, 0,
	-6, 0, 0, 0,
	0,  0, 7, 0,
	2,  3, 4, 1
]);
var correctHasMoved = false;
var correctHasRotated = false;
var correctHasScaled = false;
var correctNeedsUpdate = false;

console.log("	Position is", t.position);
console.log("	Position should be", correctPosition);
console.log("	Rotation is", t.rotation);
console.log("	Rotation should be", correctRotation);
console.log("	Scale is", t.scale);
console.log("	Scale should be", correctScale);
console.log("	Translation matrix is", t.mTranslate);
console.log("	Translation matrix should be", correctMTranslate);
console.log("	Rotation matrix is", t.mRotate);
console.log("	Rotation matrix should be", correctMRotate);
console.log("	Scale matrix is", t.mScale);
console.log("	Scale matrix should be", correctMScale);
console.log("	World matrix is", t.mWorld);
console.log("	World matrix should be", correctMWorld);
console.log("	hasMoved is", t.hasMoved,"-- should be", correctHasMoved);
console.log("	hasRotated is", t.hasRotated,"-- should be", correctHasRotated);
console.log("	hasScaled is", t.hasScaled,"-- should be", correctHasScaled);
console.log("	needsUpdate is", t.needsUpdate,"-- should be", correctNeedsUpdate);
testlog(
	Vector.equals(t.position, correctPosition) && Quaternion.equals(t.rotation, correctRotation)
	&& Vector.equals(t.scale, correctScale) && Matrix.equals(t.mTranslate, correctMTranslate)
	&& Matrix.equals(t.mRotate, correctMRotate) && Matrix.equals(t.mScale, correctMScale)
	&& Matrix.equals(t.mWorld, correctMWorld) && t.hasMoved == correctHasMoved
	&& t.hasRotated == correctHasRotated && t.hasScaled == correctHasScaled
	&& t.needsUpdate == correctNeedsUpdate
);
