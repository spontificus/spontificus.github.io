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

  
    // vec2 hex = getHexBrickHorizontal(p);




      return getHexFlatTopTrixels(p);
}


float sqr(float x) { 
  return x * x; 
}


float dist2(vec2 v, vec2 w) {
  return sqr(v.x - w.x) + sqr(v.y - w.y) ; 
  // return sqr(v.x - w.x) + sqr(v.y - w.y) + (v.x - w.x) * (v.y - w.y); 
  // return sqr(v.x - w.x) + sqr(v.y - w.y) + (abs(v.x) - abs(w.x)) * (abs(v.y) - abs(w.y)); 
  // return sqr(v.x - w.x) + sqr(v.y - w.y) + abs((v.x - w.x) * (v.y - w.y)); 
  //  return sqr(v.x - w.x) + sqr(v.y - w.y) + (v.x - w.x) * (v.y - w.y); 
}


float distToSegmentSquared(vec2 p, vec2 v, vec2 w) {
    float l2 = dist2(v, w);
    if (l2 == 0.) return dist2(p, v);
    float t = ((p.x - v.x) * (w.x- v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = max(0., min(1., t));
    return dist2(p, vec2(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y)));
}


float distToSegment(vec2 p, vec2 v, vec2 w) {
  return sqrt(distToSegmentSquared(p, v, w)); 
}


void main() {
    // position of the pixel divided by resolution, to get normalized positions on the canvas 0 to 1
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 

    // Lets use the pixels position on the x-axis as our gradient for the red color
    // Where the position is closer to 0.0 we get black (st.x = 0.0)
    // Where the position is closer to width (defined as 1.0) we get red (st.x = 1.0)




    vec2 mouseHex = getHexIndex(u_mouse);
    vec2 fragHex = getHexIndex(vec2(gl_FragCoord.x, gl_FragCoord.y ));

    gl_FragColor = vec4(12.*fragHex.x/u_resolution.x,0.0,8.*fragHex.y/u_resolution.y,1.0); // R,G,B,A

    // if (mouseHex.x == fragHex.x || mouseHex.y == fragHex.y) {
      float dist = distance(mouseHex.xy, fragHex.xy);
      if ((mouseHex.x == fragHex.x || mouseHex.y == fragHex.y) && (dist > 5. && dist < 15.)) {
        
        gl_FragColor = vec4(1.0,1.0,1.0,1.0-(dist/4.));
    }

    //float lineWidth = 5.;
    // float lineDist = DistToLine(mouseHex.xy, vec2(0,0), fragHex.xy);
    float lineDist = 0.;
    // vec4
    lineDist = distToSegment( fragHex.xy, u_p1, mouseHex.xy );
    // lineDist = distToSegment( vec2(0,0), fragHex.xy-u_p1, fragHex.xy-mouseHex.xy );
    if (lineDist <= u_p1width) {
      float distRatio = (lineDist / u_p1width);
      float invDistRatio = 1.0 - distRatio;

      vec4 bgcol = gl_FragColor * distRatio;
      vec4 fgcol = u_p1col * invDistRatio;
      gl_FragColor = bgcol + fgcol;

    }

    lineDist = distToSegment( fragHex.xy, u_p2, u_p1);
    if (lineDist <= u_p2width) {
      float distRatio = (lineDist / u_p2width);
      float invDistRatio = 1.0 - distRatio;

      vec4 bgcol = gl_FragColor * distRatio;
      vec4 fgcol = u_p2col * invDistRatio;
      gl_FragColor = bgcol + fgcol;

    }

    lineDist = distToSegment( fragHex.xy, u_p3, u_p2);
    if (lineDist <= u_p3width) {
      float distRatio = (lineDist / u_p3width);
      float invDistRatio = 1.0 - distRatio;

      vec4 bgcol = gl_FragColor * distRatio;
      vec4 fgcol = u_p3col * invDistRatio;
      gl_FragColor = bgcol + fgcol;
    }

}