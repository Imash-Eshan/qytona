// Simplified particles.js implementation for the website
// This is a lightweight version for the demo

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const particlesContainer = document.getElementById('particles-js');
    
    if (!particlesContainer) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesContainer.appendChild(canvas);
    
    const particles = [];
    const particleCount = 80;
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = Math.random() > 0.5 ? '#f0361e' : '#2e4351';
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Draw lines between close particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#2e4351';
                    ctx.globalAlpha = 0.4 * (1 - distance / 150);
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Initialize and start animation
    init();
    animate();
    
    // Add interactivity
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.speedX = dx * 0.01;
                particle.speedY = dy * 0.01;
            }
        });
    });
    
    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Add new particles on click
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle());
            particles[particles.length - 1].x = mouseX;
            particles[particles.length - 1].y = mouseY;
        }
        
        // Remove oldest particles if we have too many
        if (particles.length > particleCount + 20) {
            particles.splice(0, 5);
        }
    });
});