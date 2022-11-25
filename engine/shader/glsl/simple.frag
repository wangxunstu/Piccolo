#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(location = 0) out highp vec4 out_color;

void main()
{

    highp vec4 color = subpassLoad(in_color).rgba;
    
    // texture(color_grading_lut_texture_sampler, uv)

    highp float c = (color.r + color.g + color.b) / 3.0;

    out_color = vec4(c , c , c , 1);
}
