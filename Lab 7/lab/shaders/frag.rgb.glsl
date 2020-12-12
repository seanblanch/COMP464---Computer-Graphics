//Sean Blanchard
//11/3/2020

precision mediump float;

// data type definitions
struct DirectionalLight
{
	vec3 direction; // xyz direction of light
	vec3 ambient; // rgb contribution to scene ambient light
	vec3 diffuse; // rgb intensity of diffuse 
	vec3 specular; // rgb intensity of specular
};

struct PointLight
{
	vec3 position; // xyz position of source
	vec3 ambient; // rgb contribution to scene ambient light
	vec3 diffuse; // rgb intensity of diffuse
	vec3 specular; // rgb intensity of specular
};

struct Material
{
	vec3 diffuse; // diffuse reflection constant
	vec3 specular; // specular reflection constant
	vec3 ambient; // ambient reflection constant
	float shininess; // shininess constant
};

struct Camera
{
	vec3 position;
	mat4 mProjView;
};

// lights
uniform vec3 ambientLight;
uniform DirectionalLight directionalLights[16];
uniform PointLight pointLights[16];

// material
uniform Material material;

// camera
uniform Camera cam;

// surface
varying vec3 fragPosition;
varying vec3 fragNormal;

void main()
{
	// TODO calculate illumination (I in the cheatsheet)
	vec3 illumination;

	vec3 light = ambientLight; // will be sum of all ambient light
	vec3 diffuse = vec3(0.0, 0.0, 0.0); // will me sum of all diffuse light
	vec3 specular = vec3(0.0, 0.0, 0.0); // will be sum of all specular light
	vec3 pointToSurfaceDirection; // direction from point light to surface
	float squaredPointToSurfaceDirection; // squared distance from point light to surface
	vec3 surfaceToCameraDirection; // direction from surface to camera
	vec3 reflectedLightDirection; // direction of perfectly reflected light
	float nDot;

	for (int i = 0; i < 16; i++)
	{
		// get lights
		DirectionalLight dlight = directionalLights[i];
		PointLight plight = pointLights[i];

		// get direction and squared distance for point light
		pointToSurfaceDirection = plight.position - fragPosition;
		squaredPointToSurfaceDirection = dot(pointToSurfaceDirection, pointToSurfaceDirection) + 1.0;
		pointToSurfaceDirection = normalize(pointToSurfaceDirection);

		// get direction from surface to camera
		surfaceToCameraDirection = normalize(cam.position - fragPosition);

		// ambient light
		light += dlight.ambient + plight.ambient;

		// directional light
		nDot = -dot(dlight.direction, fragNormal);
		if (nDot > 0.0)
		{
			// diffuse
			diffuse += dlight.diffuse * nDot;

			// specular
			reflectedLightDirection = 2.0 * nDot * fragNormal + dlight.direction ;
			specular += dlight.specular * pow( max( -dot(reflectedLightDirection, surfaceToCameraDirection), 0.0), material.shininess);
		}

		// point light
		nDot = dot(pointToSurfaceDirection, fragNormal);
		if (nDot > 0.0)
		{
			// diffuse
			diffuse += plight.diffuse * nDot / squaredPointToSurfaceDirection;

			// specular
			reflectedLightDirection = 2.0 * nDot * fragNormal - pointToSurfaceDirection;
			specular += plight.specular * pow( max( dot(reflectedLightDirection, surfaceToCameraDirection), 0.0), material.shininess) / squaredPointToSurfaceDirection;
		}
	}

	light = light * material.ambient + diffuse * material.diffuse + specular * material.specular;

	// TODO calculate gl_FragColor using illumination
	gl_FragColor = vec4(light, 1.0);

}