document.addEventListener('DOMContentLoaded', () => {
    // Matrix Rain Effect
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?\\/';
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = fontSize + 'px "Fira Code", monospace';

        for (let i = 0; i < drops.length; i++) {
            // Random chance for sky blue instead of hacker green
            if (Math.random() > 0.85) {
                ctx.fillStyle = '#00a8ff'; // Sky blue
            } else {
                ctx.fillStyle = '#00ff41'; // Hacker green
            }

            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 35);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    });

    // Download Button Interaction
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', (e) => {
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = `
            <span class="btn-icon sys-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                </svg>
            </span>
            [ EXTRACTING... ]
        `;
        
        // Terminal glitch effect on the body temporarily
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 150);
        setTimeout(() => {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        }, 300);
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 450);

        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
        }, 3000);
    });

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.4s ease-out ${index * 0.15}s`;
        observer.observe(card);
    });
});
