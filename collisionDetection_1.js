const canvas = document.querySelector('canvas');
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = window.innerWidth;;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const mouse = {
    x: undefined,
    y: undefined
}
const maxRadius = 50;

const colors = [
    '#A7C8F2',
    '#048ABF',
    '#027368',
    '#F25116',
    '#0D0D0D',
];
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.originalRadius = radius;
        this.color = color;
    }
    draw () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    updaate () {

        this.draw();
    }
}
let circle1;
let circle2;
const init = () => {
    circle1 = new Circle(canvas.width / 2, canvas.height / 2, 100, 'black');
    circle2 = new Circle(undefined, undefined, 30, 'red');

}
init();
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    circle1.updaate();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.updaate();

    const distance = getDistance(circle2, circle1);
    if (distance <= circle2.radius + circle1.radius) {
        circle2.color = 'black';
        // circle1.radius += 1
    } else {
        circle2.color = 'red';
    }
}
animate();
window.addEventListener('mousemove', ({x, y}) => {
    mouse.x = x;
    mouse.y = y;
});
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
window.addEventListener('click', init);

function randomInteger (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getDistance ({x: x1, y: y1}, {x: x2, y: y2}) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

const objectsOverlapping = () => {

}
const collisionDistance = circle2.radius + circle1.originalRadius;
let prevDistance = collisionDistance;
window.addEventListener('mousemove', ({x, y}) => {
    const curDistance = getDistance(circle1, circle2);
    if (curDistance <= collisionDistance) {
        if (prevDistance > curDistance) {
            circle1.radius += 1;
            prevDistance = curDistance;
        } else if (prevDistance < curDistance) {
            circle1.radius -= 1;
            prevDistance = curDistance;
        }
    }

})