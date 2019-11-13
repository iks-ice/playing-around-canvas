const canvas = document.querySelector('canvas');
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

const drawZigzag = (x, y) => {

    const drawPart = (delta, coord, direction, low, high) => {
        ctx.beginPath();
        ctx.moveTo(x, y);

        if (coord === 'x') {
            y = y === low ? high : low;
            x += direction === 'positive' ? delta : -delta;
        } else {
            x = x === high ? low : high;
            y += direction === 'positive' ? delta : -delta;
        }

        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }

    for (let i = 1; i < 10; i++) {
        drawPart(50, 'x', 'positive', 50, 100);
    }
    for (let i = 1; i < 10; i++) {
        drawPart(50, 'y', 'positive', 550, 600);
    }
    for (let i = 1; i < 10; i++) {
        drawPart(50, 'x', 'negative', 500, 550);
    }
    for (let i = 1; i < 10; i++) {
        drawPart(50, 'y', 'negative', 100, 150);
    }

}
drawZigzag(100, 100);
