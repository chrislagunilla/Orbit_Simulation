// Christopher Lagunilla
// CJL71@pitt.edu

var au_scale = 110;
var diameter_scale = 3;

var orbit_gap = 60;
var planet_size = 15;
var orbital_velocity = {
  mercury: 1.61,
  venus: 1.18,
  earth: 1,
  mars: .808,
  jupiter: .439,
  saturn: .325,
  uranus: .229,
  neptune: .182
}

// Create oCanvas object to instantiate background
var canvas = oCanvas.create({
  canvas: "#canvas",
  background: "#222",
  fps: 60
});

// Create SUN object, which is the origin of the model
var sun = canvas.display.ellipse({
  x: canvas.width/2,
  y: canvas.height/2,
  radius: 25,
  fill: '#ffff00'
}).add();

// Create arrays to hold path and planet objects
var orbit_paths = [];
var planets = [];

// ==================== Instantiate Orbit Paths ====================
var mercuryPath = canvas.display.ellipse({
  radius: 1 * orbit_gap,
  x: canvas.width/2,
  y: canvas.height/2,
  stroke: ".5px #999",
  strokeColor: "#818487"
}).add();
orbit_paths.push(mercuryPath);
var venusPath = canvas.display.ellipse({
  radius: 2 * orbit_gap,
  x: canvas.width/2,
  y: canvas.height/2,
  stroke: ".5px #999",
  strokeColor: "#d6c27a"
}).add();
orbit_paths.push(venusPath);
var earthPath = canvas.display.ellipse({
  radius: 3 * orbit_gap,
  x: canvas.width/2,
  y: canvas.height/2,
  stroke: ".5px #999",
  strokeColor: "#2d76e2"
}).add();
orbit_paths.push(earthPath);
var marsPath = canvas.display.ellipse({
  radius: 4 * orbit_gap,
  x: canvas.width/2,
  y: canvas.height/2,
  stroke: ".5px #999",
  strokeColor: "#a54435"
}).add();
orbit_paths.push(marsPath);
var jupiterPath = canvas.display.ellipse({
  radius: 5 * orbit_gap,
  x: canvas.width/2,
  y: canvas.height/2,
  stroke: ".5px #999",
  strokeColor: "#ef8809"
}).add();
orbit_paths.push(jupiterPath);
var saturnPath = canvas.display.ellipse({
  radius: 6 * orbit_gap,
  x: canvas.width/2,
  y: canvas.height/2,
  stroke: ".5px #999",
  strokeColor: "#f4c542"
}).add();
orbit_paths.push(saturnPath);
var uranusPath = canvas.display.ellipse({
  radius: 7 * orbit_gap,
  x: canvas.width/2,
  y: canvas.height/2,
  stroke: ".5px #999",
  strokeColor: "#14ce5b"
}).add();
orbit_paths.push(uranusPath);
var neptunePath = canvas.display.ellipse({
  radius: 8 * orbit_gap,
  x: canvas.width/2,
  y: canvas.height/2,
  stroke: ".5px #999",
  strokeColor: "#18d8e2"
}).add();
orbit_paths.push(neptunePath);
// ================================================================

// ===================== Create Labels ============================
var sun_label = canvas.display.text({
  origin: {
    x: "center",
    y: "center"
  },
  x: canvas.width/2,
  y: canvas.height/2,
  font: "15px sans-serif",
  text: "Sun",
  fill: "255",
}).add();
var mercury_label = canvas.display.text({
  origin: {
    x: "center",
    y: "center"
  },
  x: canvas.width/2,
  y: 7.5 * orbit_gap,
  font: "15px sans-serif",
  text: "Mercury",
  fill: "#FFF",
}).add();
var venus_label = canvas.display.text({
  origin: {
    x: "center",
    y: "center"
  },
  x: canvas.width/2,
  y: 6.5 * orbit_gap,
  font: "15px sans-serif",
  text: "Venus",
  fill: "#FFF",
}).add();
var earth_label = canvas.display.text({
  origin: {
    x: "center",
    y: "center"
  },
  x: canvas.width/2,
  y: 5.5 * orbit_gap,
  font: "15px sans-serif",
  text: "Earth",
  fill: "#FFF",
}).add();
var mars_label = canvas.display.text({
  origin: {
    x: "center",
    y: "center"
  },
  x: canvas.width/2,
  y: 4.5 * orbit_gap,
  font: "15px sans-serif",
  text: "Mars",
  fill: "#FFF",
}).add();
var jupiter_label = canvas.display.text({
  origin: {
    x: "center",
    y: "center"
  },
  x: canvas.width/2,
  y: 3.5 * orbit_gap,
  font: "15px sans-serif",
  text: "Jupiter",
  fill: "#FFF",
}).add();
var saturn_label = canvas.display.text({
  origin: {
    x: "center",
    y: "center"
  },
  x: canvas.width/2,
  y: 2.5 * orbit_gap,
  font: "15px sans-serif",
  text: "Saturn",
  fill: "#FFF",
}).add();
var uranus_label = canvas.display.text({
  origin: {
    x: "center",
    y: "center"
  },
  x: canvas.width/2,
  y: 1.5 * orbit_gap,
  font: "15px sans-serif",
  text: "Uranus",
  fill: "#FFF",
}).add();
var neptune_label = canvas.display.text({
  origin: {
    x: "center",
    y: "center"
  },
  x: canvas.width/2,
  y: .5 * orbit_gap,
  font: "15px sans-serif",
  text: "Neptune",
  fill: "#FFF",
}).add();
var title = canvas.display.text({
  x: 50,
  y: 100,
  origin: { x: "left", y: "top" },
  font: "30px sans-serif",
  text: "Heliocentric Model of\nthe Solar System*",
  fill: "#FFF"
}).add();
var subtitle = canvas.display.text({
  x: 50,
  y: 160,
  origin: { x: "left", y: "top" },
  font: "15px sans-serif",
  text: "*not to scale" +
  "\n\n[start positions based off planets'\npositions at 9:23PM, 4/26/2017]" +
  "\n\n[orbital velocities are accurate,\nrelative to the orbital\nvelocity of the Earth.]",
  fill: "#FFF"
}).add();
var control = canvas.display.text({
  x: 50,
  y: canvas.height-100,
  origin: { x: "left", y: "top" },
  font: "20px sans-serif",
  text: "Press [SPACE] to start/stop animation.",
  fill: "#FFF"
}).add();
// ================================================================

// ===================== Instantiate Planets ======================
var mercury = canvas.display.ellipse({
  // defines radius of orbit
  origin: {
    x: 1 * orbit_gap,
    y: 0
  },
  // defines the origin of the orbit
  x: canvas.width/2,
  y: canvas.height/2,
  // defines radius of the planet
  radius: planet_size,
  // defines the color of the planet
  fill: '#818487',
  // defines the speed of orbit
  speed: orbital_velocity.mercury,
  // defines the angle of rotation each time tick
  rotation: -47,
  start: -47
}).add();
planets.push(mercury);
var venus = canvas.display.ellipse({
  // defines radius of orbit
  origin: {
    x: 2 * orbit_gap,
    y: 0
  },
  // defines the origin of the orbit
  x: canvas.width/2,
  y: canvas.height/2,
  // defines radius of the planet
  radius: planet_size,
  // defines the color of the planet
  fill: '#d6c27a',
  // defines the speed of orbit
  speed: orbital_velocity.venus,
  // defines the angle of rotation each time tick
  rotation: -47,
  start: -47
}).add();
planets.push(venus);
var earth = canvas.display.ellipse({
  // defines radius of orbit
  origin: {
    x: 3 * orbit_gap,
    y: 0
  },
  // defines the origin of the orbit
  x: canvas.width/2,
  y: canvas.height/2,
  // defines radius of the planet
  radius: planet_size,
  // defines the color of the planet
  fill: '#2d76e2',
  // defines the speed of orbit
  speed: orbital_velocity.earth,
  // defines the angle of rotation each time tick
  rotation: -25,
  start: -25
}).add();
planets.push(earth);
var mars = canvas.display.ellipse({
  // defines radius of orbit
  origin: {
    x: 4 * orbit_gap,
    y: 0
  },
  // defines the origin of the orbit
  x: canvas.width/2,
  y: canvas.height/2,
  // defines radius of the planet
  radius: planet_size,
  // defines the color of the planet
  fill: '#a54435',
  // defines the speed of orbit
  speed: orbital_velocity.mars,
  // defines the angle of rotation each time tick
  rotation: 100,
  start: 100
}).add();
planets.push(mars);
var jupiter = canvas.display.ellipse({
  // defines radius of orbit
  origin: {
    x: 5 * orbit_gap,
    y: 0
  },
  // defines the origin of the orbit
  x: canvas.width/2,
  y: canvas.height/2,
  // defines radius of the planet
  radius: planet_size,
  // defines the color of the planet
  fill: '#ef8809',
  // defines the speed of orbit
  speed: orbital_velocity.jupiter,
  // defines the angle of rotation each time tick
  rotation: -12,
  start: -12
}).add();
planets.push(jupiter);
var saturn = canvas.display.ellipse({
  // defines radius of orbit
  origin: {
    x: 6 * orbit_gap,
    y: 0
  },
  // defines the origin of the orbit
  x: canvas.width/2,
  y: canvas.height/2,
  // defines radius of the planet
  radius: planet_size,
  // defines the color of the planet
  fill: '#f4c542',
  // defines the speed of orbit
  speed: orbital_velocity.saturn,
  // defines the angle of rotation each time tick
  rotation: -75,
  start: -75
}).add();
planets.push(saturn);
var uranus = canvas.display.ellipse({
  // defines radius of orbit
  origin: {
    x: 7 * orbit_gap,
    y: 0
  },
  // defines the origin of the orbit
  x: canvas.width/2,
  y: canvas.height/2,
  // defines radius of the planet
  radius: planet_size,
  // defines the color of the planet
  fill: '#14ce5b',
  // defines the speed of orbit
  speed: orbital_velocity.uranus,
  // defines the angle of rotation each time tick
  rotation: 155,
  start: 155
}).add();
planets.push(uranus);
var neptune = canvas.display.ellipse({
  // defines radius of orbit
  origin: {
    x: 8 * orbit_gap,
    y: 0
  },
  // defines the origin of the orbit
  x: canvas.width/2,
  y: canvas.height/2,
  // defines radius of the planet
  radius: planet_size,
  // defines the color of the planet
  fill: '#18d8e2',
  // defines the speed of orbit
  speed: orbital_velocity.neptune,
  // defines the angle of rotation each time tick
  rotation: 190,
  start: 190
}).add();
planets.push(neptune);
// ================================================================

// ================== Track Revolutions (Years) ===================
var revs = [];
for(var i = 0; i < planets.length; i++){
  revs.push(0);
}
var rev_tracker = canvas.display.text({
  x: canvas.width - 100,
  y: 100,
  origin:{x: "right", y: "top"},
  font: "20px sans-serif",
  text: "# of Revolutions:\nMercury: " + revs[0] + "\nVenus: "
  + revs[1] + "\nEarth: " + revs[2] + "\nMars: " + revs[3] + "\nJupiter: "
  + revs[4] + "\nSaturn: " + revs[5] + "\nUranus: " + revs[6]
  + "\nNeptune: " + revs[7],
  fill: "#FFF"
}).add();
// ================================================================

// Add Start/Stop Controls via the Space Bar
var isPaused = true;
canvas.bind("keydown", function () {
	if(canvas.keyboard.getKeysDown()[0] = 32 && isPaused){
    canvas.setLoop(function(){
      for(var i = 0; i < planets.length; i++){
        planets[i].rotation += planets[i].speed;
        if(planets[i].rotation - 360 * (revs[i]+1) >= planets[i].start){
          revs[i] += 1;
      }
      rev_tracker.text = "# of Revolutions:\nMercury: " + revs[0] + "\nVenus: "
      + revs[1] + "\nEarth: " + revs[2] + "\nMars: " + revs[3] + "\nJupiter: "
      + revs[4] + "\nSaturn: " + revs[5] + "\nUranus: " + revs[6]
      + "\nNeptune: " + revs[7];
    }}).start();
    isPaused = false;
  }
  else if(canvas.keyboard.getKeysDown()[0] = 32 && !isPaused){
    canvas.timeline.stop()
    isPaused = true;
  }
});
