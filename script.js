var tl = new TimelineMax();
tl.staggerFrom(
  ".decoration-square, .flower",
  1.6,
  {
    scale: 0.9,
    autoAlpha: 0,
    force3D: true,
    ease: Linear.easeNone
  },
  0.15
);

TweenMax.set(document.body, { perspective: 800 });
var $bg = document.body.querySelectorAll(".bagonia");
var $bg2 = document.body.querySelectorAll(".watercolor");
function findNewPoint(point, angle, distance) {
  var result = {};
  result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + point.x);
  result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + point.y);
  return result;
}
var handleMove = event => {
  var p1 = {
    x: event.clientX,
    y: event.clientY
  };
  var p2 = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
  var p3y = p2.y - p1.y;
  var p3x = p2.x - p1.x;
  var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

  var distance = Math.sqrt(p3y * p3y + p3x * p3x);
  distance = distance / window.innerWidth / 2 * 100;
  var point = findNewPoint({ x: 0, y: 0 }, angleDeg, distance);
  TweenMax.to(document.body.querySelector(".decoration-square"), 0.5, {
    force3D: true,
    rotationX: -point.y * 0.25,
    scale: 1 + distance / window.innerWidth * 1.2,
    rotationY: point.x * 0.25
  });
  TweenMax.to($bg, 0.3, {
    force3D: true,
    x: point.x * 0.5,
    y: point.y * 0.5,
    scale: 1 - distance / window.innerWidth * 1.2,
    rotationX: -point.y * 0.125,
    rotationY: point.x * 0.125,
    transformOrigin: "50% 100%"
  });
  TweenMax.to($bg2, 0.5, {
    force3D: true,
    x: point.x * 0.75,
    y: point.y * 0.75,
    scale: 1 - distance / window.innerWidth * 1.6,
    rotationX: -point.y * 0.25,
    rotationY: point.x * 0.25,
    transformOrigin: "50% 100%"
  });
};

window.addEventListener("mousemove", handleMove, false);
document.body.addEventListener(
  "click",
  () => (tl.reversed() ? tl.play() : tl.reverse()),
  false
);
