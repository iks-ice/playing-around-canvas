const car1 = document.createElement('img');
car1.src = './car1.jpg';
const car2 = document.createElement('img');
car2.src = './car2.jpg';
const canvas = document.querySelector('canvas');
const width = 600;
const height = 339;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

const mouse = {
    x: undefined,
    y: undefined
}
const slider = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(0, 0)
    ctx.lineTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.lineTo(0, 0)
    ctx.clip();
}

const animate = () => {
    requestAnimationFrame(animate);
    ctx.drawImage(car1, 0, 0, width, height, 0, 0, width, height);
    ctx.save();
    slider(mouse.x, mouse.y);
    ctx.drawImage(car2, 0, 0, width, height, 0, 0, width, height);
    ctx.restore();
}
animate();

document.addEventListener('mousemove', ({x, y}) => {
    mouse.x = x;
    mouse.y = y;
})
