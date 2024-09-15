document.getElementById('startButton').addEventListener('click', startGame);

let score = 0;
const bubblesContainer = document.getElementById('bubbles');
const scoreDisplay = document.getElementById('score');
const popSound = document.getElementById('popSound');
const particlesCanvas = document.getElementById('particles');
const ctx = particlesCanvas.getContext('2d');

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

function startGame() {
    document.getElementById('startButton').style.display = 'none';
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    spawnBubbles();
}

function spawnBubbles() {
    setInterval(() => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.backgroundImage = 'url("bubble.png")'; // Replace with your bubble image URL
        bubble.style.left = Math.random() * window.innerWidth + 'px';
        bubble.style.top = Math.random() * window.innerHeight + 'px';
        bubble.addEventListener('click', bubbleClicked);
        bubblesContainer.appendChild(bubble);

        setTimeout(() => {
            bubble.remove();
        }, 5000);
    }, 1000);
}

function bubbleClicked(e) {
    const bubble = e.target;
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    
    popSound.play();
    createParticles(bubble.style.left, bubble.style.top);
    bubble.remove();
}

function createParticles(x, y) {
    const particles = [];
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: parseFloat(x),
            y: parseFloat(y),
            size: Math.random() * 10 + 5,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 4 - 2,
            life: Math.random() * 20 + 10
        });
    }
    animateParticles(particles);
}

function animateParticles(particles) {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.96;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
        ctx.fill();
    });

    particles = particles.filter(p => p.life > 0);

    if (particles.length > 0) {
        requestAnimationFrame(() => animateParticles(particles));
    }
}

window.addEventListener('resize', () => {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
});
