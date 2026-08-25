import React, { useEffect, useRef } from 'react';

export default function AuthSideBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.015;

            const waves = [
                { amplitude: 90, frequency: 0.005, speed: 1.0, color: 'rgba(255, 255, 255, 0.15)' },
                { amplitude: 90, frequency: 0.003, speed: 1.5, color: 'rgba(255, 255, 255, 0.15)' },
                { amplitude: 90, frequency: 0.008, speed: 0.7, color: 'rgba(255, 255, 255, 0.31)' },
            ];

            const centerY = canvas.height / 2;
            waves.forEach(wave => {
                ctx.beginPath();
                for (let x = 0; x <= canvas.width; x++) {
                    const y = centerY + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.strokeStyle = wave.color;
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative bg-slate-950 h-screen overflow-hidden">
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
            </canvas>

            <div className="absolute bottom-8 left-8 right-8 sm:bottom-10 sm:left-10 sm:right-10">
                <p className="text-white text-xs sm:text-sm leading-relaxed text-left opacity-50">
                    Catálogo educativo con audio propio, libre o autorizado. <br /> CIT2308 · Desarrollo Web · Universidad Diego Portales
                </p>
            </div>
            
        </div>
    );
}