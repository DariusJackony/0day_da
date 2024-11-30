
alert('Welcome!')
const canvas = document.getElementById('bondsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bonds = [];
const bondCount = 50;

// Bond object
class Bond {
  constructor(x, y, dx, dy, size) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}
// Initialize bonds
function init() {
  for (let i = 0; i < bondCount; i++) {
    const size = 2;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    bonds.push(new Bond(x, y, dx, dy, size));
  }
}

// Animate bonds
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bonds and lines connecting them
  for (let i = 0; i < bonds.length; i++) {
    bonds[i].update();
    for (let j = i + 1; j < bonds.length; j++) {
      const distance = Math.hypot(bonds[i].x - bonds[j].x, bonds[i].y - bonds[j].y);
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(bonds[i].x, bonds[i].y);
        ctx.lineTo(bonds[j].x, bonds[j].y);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  bonds.length = 0;
  init();
});

init();
animate();
