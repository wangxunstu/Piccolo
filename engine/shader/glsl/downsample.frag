#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"
precision highp float;
precision highp int;


layout(location = 0) out highp vec4 out_color;

layout(location = 0) in vec2 in_uv;

layout(set = 0, binding = 0) uniform sampler2D in_color;


void main()
{

    vec2 RTSize = vec2(textureSize(in_color,0));

	RTSize = vec2(1.0/RTSize.x , 1.0/RTSize.y);


    vec2 UV[4];

	vec2 Offset = vec2((RTSize.x * 2.0), (RTSize.y * 2.0));
	UV[0] = in_uv + Offset * vec2(-1.0, -1.0);
	UV[1] = in_uv + Offset * vec2( 1.0, -1.0);
	UV[2] = in_uv + Offset * vec2(-1.0,  1.0);
	UV[3] = in_uv + Offset * vec2( 1.0,  1.0);


    // texture(color_grading_lut_texture_sampler, uv)


    vec4 sample_color[4];

	for(int i = 0; i < 4; ++i)
	{
		sample_color[i].rgb = max((texture(in_color, UV[i])).rgb, vec3(0.0, 0.0, 0.0));
	}

	out_color = (sample_color[0] + sample_color[1] + sample_color[2] + sample_color[3]) * 0.25;
}
