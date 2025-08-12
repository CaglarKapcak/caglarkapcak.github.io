// Particles.js Konfigürasyonu
document.addEventListener('DOMContentLoaded', function() {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#E74C3C" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#2C3E50", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            }
        }
    });

    // Fare ile Robot Kol Etkileşimi (Opsiyonel)
    const armSegment2 = document.querySelector('.arm-segment2');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 30 - 15;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        armSegment2.style.transform = `rotate(${x - y}deg)`;
    });
});
