const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();
    }
}

// Implementation
let particles;
function init() {
    particles = []

    for (let i = 0; i < 700; i++) {
        const x = Math.random() * canvas.width - canvas.width / 2;
        const y = Math.random() * canvas.width - canvas.width / 2;
        const radius = Math.random() * 2;
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.push(new Particle(x, y, radius, color));
    }
}

// Animation loop
let radians = 0;
function animate() {
    ctx.fillStyle = 'rgba(10, 10, 10, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(radians);
    particles.forEach(particle => {
        particle.update();
    });
    ctx.restore();

    radians += 0.001;

    requestAnimationFrame(animate)
}

init();
animate();
