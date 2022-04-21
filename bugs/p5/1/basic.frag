#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // This is passed in as a uniform from the sketch.js file
uniform vec2 u_mouse; // This is passed in as a uniform from the sketch.js file
uniform vec2 u_hexmatrix[16];
uniform vec2 u_p1;
uniform float u_p1width;
uniform vec4 u_p1col;
uniform vec2 u_p2;
uniform float u_p2width;
uniform vec4 u_p2col;
uniform vec2 u_p3;
uniform float u_p3width;
uniform vec4 u_p3col;

int modI(float a,float b) {
    float m=a-floor((a+0.5)/b)*b;
    return int(floor(m+0.5));
}

vec2 getHexBrickVertical(vec2 p) {
    // get position in hexmatrix
    int xindex = modI(p.x, 4.);
    int yindex = modI(p.y, 4.);
    int hexindex = xindex + yindex * 4;
    vec2 hex;

    // interlocking bricks vertically
    if ( hexindex == 0 ) {hex = vec2(0., 0.);} 
    else if ( hexindex == 1 ) {hex = vec2(1., 1.);} 
    else if ( hexindex == 2 ) {hex = vec2(1., 1.);} 
    else if ( hexindex == 3 ) {hex = vec2(2., 0.);} 
    else if ( hexindex == 4 ) {hex = vec2(0., 1.);} 
    else if ( hexindex == 5 ) {hex = vec2(1., 1.);} 
    else if ( hexindex == 6 ) {hex = vec2(1., 1.);} 
    else if ( hexindex == 7 ) {hex = vec2(2., 1.);} 
    else if ( hexindex == 8 ) {hex = vec2(0., 1.);} 
    else if ( hexindex == 9 ) {hex = vec2(1., 2.);} 
    else if ( hexindex == 10 ) {hex = vec2(1., 2.);} 
    else if ( hexindex == 11 ) {hex = vec2(2., 1.);} 
    else if ( hexindex == 12 ) {hex = vec2(0., 2.);} 
    else if ( hexindex == 13 ) {hex = vec2(1., 2.);} 
    else if ( hexindex == 14 ) {hex = vec2(1., 2.);} 
    else if ( hexindex == 15 ) {hex = vec2(2., 2.);}

    int hexx = int(hex.x) + (int(floor(p.x)) - xindex) / 2;
    int hexy = int(hex.y) + (int(floor(p.y)) - yindex) / 2;

    return vec2(hexx, hexy);   
}

vec2 getHexBrickHorizontal(vec2 p) {
    // get position in hexmatrix
    int xindex = modI(p.x, 4.);
    int yindex = modI(p.y, 4.);
    int hexindex = xindex + yindex * 4;
    vec2 hex;

    // interlocking bricks horizontally
    if ( hexindex == 0 ) {hex = vec2(0., 0.);} 
    else if ( hexindex == 1 ) {hex = vec2(1., 0.);} 
    else if ( hexindex == 2 ) {hex = vec2(1., 0.);} 
    else if ( hexindex == 3 ) {hex = vec2(2., 0.);} 
    else if ( hexindex == 4 ) {hex = vec2(0., 1.);} 
    else if ( hexindex == 5 ) {hex = vec2(0., 1.);} 
    else if ( hexindex == 6 ) {hex = vec2(1., 1.);} 
    else if ( hexindex == 7 ) {hex = vec2(1., 1.);} 
    else if ( hexindex == 8 ) {hex = vec2(0., 1.);} 
    else if ( hexindex == 9 ) {hex = vec2(0., 1.);} 
    else if ( hexindex == 10 ) {hex = vec2(1., 1.);} 
    else if ( hexindex == 11 ) {hex = vec2(1., 1.);} 
    else if ( hexindex == 12 ) {hex = vec2(0., 2.);} 
    else if ( hexindex == 13 ) {hex = vec2(1., 2.);} 
    else if ( hexindex == 14 ) {hex = vec2(1., 2.);} 
    else if ( hexindex == 15 ) {hex = vec2(2., 2.);}

    int hexx = int(hex.x) + (int(floor(p.x)) - xindex) / 2;
    int hexy = int(hex.y) + (int(floor(p.y)) - yindex) / 2;

    return vec2(hexx, hexy);
}

vec2 getHexTrixels(vec2 p) {
    int xindex = modI(p.x, 4.);
    int yindex = modI(p.y, 4.);
    int hexindex = xindex + yindex * 4;
    vec2 hex;

    if ( hexindex == 0 ) {
        hex = vec2(0., 0.);
    } else if ( hexindex == 1 ) {
        hex = vec2(0., 0.);
    } else if ( hexindex == 2 ) {
        hex = vec2(1., 0.);
    } else if ( hexindex == 3 ) {
        hex = vec2(2., 0.);
    } else if ( hexindex == 4 ) {
        hex = vec2(0., 0.);
    } else if ( hexindex == 5 ) {
        hex = vec2(1., 0.);
    } else if ( hexindex == 6 ) {
        hex = vec2(1., 0.);
    } else if ( hexindex == 7 ) {
        hex = vec2(1., 0.);
    } else if ( hexindex == 8 ) {
        hex = vec2(0., 1.);
    } else if ( hexindex == 9 ) {
        hex = vec2(1., 1.);
    } else if ( hexindex == 10 ) {
        hex = vec2(1., 1.);
    } else if ( hexindex == 11 ) {
        hex = vec2(1., 1.);
    } else if ( hexindex == 12 ) {
        hex = vec2(0., 1.);
    } else if ( hexindex == 13 ) {
        hex = vec2(0., 1.);
    } else if ( hexindex == 14 ) {
        hex = vec2(1., 1.);
    } else if ( hexindex == 15 ) {
        hex = vec2(2., 1.);
    }

    int hexx = int(hex.x) + (int(floor(p.x)) - xindex) / 2;
    int hexy = int(hex.y) + (int(floor(p.y)) - yindex) / 2;

    return vec2(hexx, hexy);
}

vec2 getHexFlatTopTrixelsMatrix(int hexindex) {
    if ( hexindex < 4 ) {return vec2(1., 1.);}
    else if (hexindex < 9) { return vec2(2., 1.);}
    else if (hexindex < 12) { return vec2(3., 0.);}
    else if (hexindex < 15) { return vec2(1., 1.);}
    else if (hexindex < 22) { return vec2(2., 1.);}
    else if (hexindex < 24) { return vec2(3., 0.);}
    else if (hexindex < 27) { return vec2(1., 2.);}
    else if (hexindex < 34) { return vec2(2., 1.);}
    else if (hexindex < 36) { return vec2(3., 1.);}
    else if (hexindex < 40) { return vec2(1., 2.);}
    else if (hexindex < 45) { return vec2(2., 1.);}
    else if (hexindex < 48) { return vec2(3., 1.);}
    else if (hexindex < 52) { return vec2(1., 2.);}
    else if (hexindex < 57) { return vec2(2., 2.);}
    else if (hexindex < 60) { return vec2(3., 1.);}
    else if (hexindex < 63) { return vec2(1., 2.);}
    else if (hexindex < 70) { return vec2(2., 2.);}
    else if (hexindex < 72) { return vec2(3., 1.);}
    else if (hexindex < 75) { return vec2(1., 3.);}
    else if (hexindex < 82) { return vec2(2., 2.);}
    else if (hexindex < 84) { return vec2(3., 2.);}
    else if (hexindex < 88) { return vec2(1., 3.);}
    else if (hexindex < 93) { return vec2(2., 2.);}
    else if (hexindex < 96) { return vec2(3., 2.);}
  
    return vec2(0., 0.);
}

vec2 getHexFlatTopTrixels(vec2 p) {
      // get position in hexmatrix
    int xindex = modI(p.x, 12.);
    int yindex = modI(p.y, 8.);
    int hexindex = xindex + yindex * 12;
    vec2 hex = getHexFlatTopTrixelsMatrix(hexindex);
    return vec2(hex.x + float((int(floor(p.x)) - xindex) / 6), hex.y + float((int(floor(p.y)) - yindex) / 4 ) + hex.x/2.0);
}

// function to get hexgrid index from cavas x,y 
vec2 getHexIndex(vec2 p) {
    //return getHexBrickHorizontal(p);
    return getHexFlatTopTrixels(p);
}

void main() {
    // position of the pixel divided by resolution, to get normalized positions on the canvas 0 to 1
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 

    vec2 mouseHex = getHexIndex(u_mouse);
    vec2 fragHex = getHexIndex(vec2(gl_FragCoord.x, gl_FragCoord.y ));

    gl_FragColor = vec4(12.*fragHex.x/u_resolution.x,0.0,8.*fragHex.y/u_resolution.y,1.0); // R,G,B,A

    float mdx = abs(mouseHex.x-fragHex.x);
    float mdy = abs(mouseHex.y-fragHex.y);
    
    if (abs(mdx-mdy) < 2.) {
        gl_FragColor = vec4(0.5,0.5,0.5,0.5);
    }

    float dx = abs(fragHex.x - mouseHex.x);
    float dy = abs(fragHex.y - mouseHex.y);
    float hdist = dx * (dx + dy) + dy*dy;
    float dist = sqrt(hdist);

    float hsize = 40.;

    if ( dist < 40. ) {
      float bgRatio = (hdist / hsize);
      float fgRatio = 1.0 - bgRatio;

      vec4 bgcol = gl_FragColor * bgRatio;
      vec4 fgcol = u_p1col * fgRatio;
      gl_FragColor = bgcol + fgcol;
    //   gl_FragColor = vec4(1.0,1.0,1.0,fgRatio);
    }

}