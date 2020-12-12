# Computer Graphics - 2D World Transform

This should be a quick, fun lab. Download the [lab](./lab) folder contents, and complete `transform/matrix3.js` to allow for the creation of 3x3 translation, rotation and scale matrices for use in a 2D space. 

When you've gotten them right, there should be a simple display with several moving and rotating shapes visible.

Then, explore the contents of the project, and modify `demo.js` by adding at least one object to the scene. Your object(s) should:

* always be moving, or intermittently moving; it should never stay still indefinitely.
* always be visible, or only intermittently invisible; it should never leave view or become otherwise not visible indefinitely.
* never overlap with any other objects.

You may find it informative to read through `transform/transform2.js`, `transform/vector2.js`, and `drawables/drawable.js`. You do not need to edit these files, but you will need to use methods defined in them.

You may also find it informative to read through the provided shaders, which have been commented heavily. We will spend some time in future labs learning our way around GLSL and writing some more interesting shaders, and a little familiarity will help!

Note that the tedious setup process for shader creation has been moved to a function called `createShader` in `utils/shaderUtils.js`, but the process being used is the same as in the first lab.
