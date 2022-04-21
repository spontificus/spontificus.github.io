// a shader variable
let theShader;
let backbuffer1;
let backbuffer2;
let canvas;

function preload() {
  // load the shader
  theShader = loadShader('basic.vert', 'basic.frag');
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  backbuffer1 = createGraphics(windowWidth, windowHeight, WEBGL);
  backbuffer2 = createGraphics(windowWidth, windowHeight, WEBGL);
  // turn off the createGraphics layers stroke
  backbuffer1.noStroke();
  backbuffer2.noStroke();
}

function getHexIndex(x, y) {
  // // brick interlocking
  // hexmatrix = [
  //     [0, 0], [1, 0], [1, 0], [2, 0],
  //     [0, 1], [1, 0], [1, 0], [2, 1],
  //     [0, 1], [1, 1], [1, 1], [2, 1],
  //     [0, 2], [1, 1], [1, 1], [2, 2]
  // ];

  // hexmatrix = [
  //     [0, 0], [1, 1], [1, 1], [2, 0],
  //     [0, 1], [1, 1], [1, 1], [2, 1],
  //     [0, 1], [1, 2], [1, 2], [2, 1],
  //     [0, 2], [1, 2], [1, 2], [2, 2]
  // ];

  // // tetramino T
  hexmatrix = [
    [0, 0], [0, 0], [1, 0], [2, 0],
    [0, 0], [1, 0], [1, 0], [1, 0],
    [0, 1], [1, 1], [1, 1], [1, 1],
    [0, 1], [0, 1], [1, 1], [2, 1]
  ];

  // get position in hexmatrix
  var xindex = x % 4;
  var yindex = y % 4;
  var hex = hexmatrix[xindex + yindex * 4];

  var hexx = hex[0] + (x - xindex) / 2;
  var hexy = hex[1] + (y - yindex) / 2;

  return [hexx, hexy];
}

// particle class with a position and velocity
class Particle {
  constructor(x, y, col, size) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.size = size;
    this.vx = 0;
    this.vy = 0;
    this.fx = 0;
    this.fy = 0;


  }

  // set the position of the particle
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setForce(fx, fy) {
    this.fx += fx;
    this.fy += fy;
  }

  setVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }

  update() {
    this.vx += this.fx;
    this.vy += this.fy - 0.75;
    this.fx = 0;
    this.fy = 0;

    // if (abs(this.vx) > 5) {
    this.vx *= 0.95;
    // }

    // if (abs(this.vy) > 5) {
    this.vy *= 0.95;
    // }

    this.x += this.vx;
    this.y += this.vy;
  }
}


var p1 = new Particle(200, 200, [0.5, 1, 0.25, 1], 20);
var p2 = new Particle(150, 100, [1, 0.25, 0.5, 1], 15);
var p3 = new Particle(250, 100, [0.25, 0.5, 1, 1], 5);

function vec2(x, y) {
  return [x, y];
}

function getHexFlatTopTrixelsMatrix(hexindex) {
  if (hexindex < 4) { return vec2(1., 1.); }
  else if (hexindex < 9) { return vec2(2., 1.); }
  else if (hexindex < 12) { return vec2(3., 0.); }
  else if (hexindex < 15) { return vec2(1., 1.); }
  else if (hexindex < 22) { return vec2(2., 1.); }
  else if (hexindex < 24) { return vec2(3., 0.); }
  else if (hexindex < 27) { return vec2(1., 2.); }
  else if (hexindex < 34) { return vec2(2., 1.); }
  else if (hexindex < 36) { return vec2(3., 1.); }
  else if (hexindex < 40) { return vec2(1., 2.); }
  else if (hexindex < 45) { return vec2(2., 1.); }
  else if (hexindex < 48) { return vec2(3., 1.); }
  else if (hexindex < 52) { return vec2(1., 2.); }
  else if (hexindex < 57) { return vec2(2., 2.); }
  else if (hexindex < 60) { return vec2(3., 1.); }
  else if (hexindex < 63) { return vec2(1., 2.); }
  else if (hexindex < 70) { return vec2(2., 2.); }
  else if (hexindex < 72) { return vec2(3., 1.); }
  else if (hexindex < 75) { return vec2(1., 3.); }
  else if (hexindex < 82) { return vec2(2., 2.); }
  else if (hexindex < 84) { return vec2(3., 2.); }
  else if (hexindex < 88) { return vec2(1., 3.); }
  else if (hexindex < 93) { return vec2(2., 2.); }
  else if (hexindex < 96) { return vec2(3., 2.); }


  return vec2(0., 0.);
}

function getHexFlatTopTrixels(p) {
  // get position in hexmatrix
  var xindex = p[0] % 12.;
  var yindex = p[1] % 8.;
  var hexindex = xindex + yindex * 12;
  var hex = getHexFlatTopTrixelsMatrix(hexindex);
  return vec2(hex[0] + float((int(floor(p[0])) - xindex) / 6), hex[1] + float((int(floor(p[1])) - yindex) / 4) + hex[0] / 2.0);


}


function draw() {
  backbuffer1.clear();
  backbuffer1.image(canvas, width * -0.5, windowHeight * -0.5, width, windowHeight);

  clear();
  shader(theShader);



  // send resolution of sketch into shader
  theShader.setUniform('u_p1col', p1.col);
  theShader.setUniform('u_p1width', p1.size);
  theShader.setUniform('u_p2col', p2.col);
  theShader.setUniform('u_p2width', p2.size);
  theShader.setUniform('u_p3col', p3.col);
  theShader.setUniform('u_p3width', p3.size);
  theShader.setUniform('u_resolution', [width, windowHeight]);
  theShader.setUniform('u_mouse', [mouseX, windowHeight - mouseY]);


  // apply spring between mouse and particle
  // var mhex = getHexIndex(mouseX, windowHeight - mouseY);
  var mhex = getHexFlatTopTrixels([mouseX, windowHeight-mouseY]);
  var fp1 = [];


  p1.setForce(lerp(p1.x, mhex[0], 0.03) - p1.x, lerp(p1.y, mhex[1], 0.03) - p1.y);
  p1.setForce(lerp(p1.x, p2.x, 0.015) - p1.x, lerp(p1.y, p2.y, 0.015) - p1.y);


  p2.setForce(lerp(p2.x, p1.x, 0.05) - p2.x, lerp(p2.y, p1.y, 0.05) - p2.y);
  p2.setForce(lerp(p2.x, p3.x, 0.05) - p2.x, lerp(p2.y, p3.y, 0.05) - p2.y);

  p3.setForce(lerp(p3.x, p2.x, 0.01) - p3.x, lerp(p3.y, p2.y, 0.01) - p3.y);
  p3.setForce(lerp(p3.x, p1.x, 0.01) - p3.x, lerp(p3.y, p1.y, 0.01) - p3.y);

  p1.update();
  p2.update();
  p3.update();

  theShader.setUniform('u_p1', [p1.x, p1.y]);
  theShader.setUniform('u_p2', [p2.x, p2.y]);
  theShader.setUniform('u_p3', [p3.x, p3.y]);


  // apply gravity
  // p1[1] -= 2;



  hexmatrix = [
    [0, 0], [0, 0], [1, 0], [2, 0],
    [0, 0], [1, 0], [1, 0], [1, 0],
    [0, 1], [1, 1], [1, 1], [1, 1],
    [0, 1], [0, 1], [1, 1], [2, 1]
  ];
  theShader.setUniform('u_hexmatrix', hexmatrix);

  // shader() sets the active shader with our shader
  //shader(theShader);



  // rect gives us some geometry on the screen
  rect(0, 0, windowWidth, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}