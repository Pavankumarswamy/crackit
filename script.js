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

    // Custom Video Controller Logic
    const video = document.getElementById('heroVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');

    if(video) {
        // Toggle Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '⏸';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶';
            }
        });

        // Toggle Mute
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            muteBtn.textContent = video.muted ? '🔇' : '🔊';
        });

        // Update Progress Bar
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });

        // Click on progress bar to seek
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / progressContainer.offsetWidth;
            video.currentTime = pos * video.duration;
        });

        // End of video resets play button
        video.addEventListener('ended', () => {
            playPauseBtn.textContent = '▶';
        });
    }

    // Download Button Interaction
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
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
            setTimeout(() => { document.body.style.filter = 'none'; }, 150);
            setTimeout(() => { document.body.style.filter = 'invert(1) hue-rotate(180deg)'; }, 300);
            setTimeout(() => { document.body.style.filter = 'none'; }, 450);

            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
            }, 3000);
        });
    }
});
