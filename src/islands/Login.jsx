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
                { amplitude: 60, frequency: 0.005, speed: 1.0, color: 'rgba(255, 255, 255, 0.15)' },
                { amplitude: 90, frequency: 0.003, speed: 1.5, color: 'rgba(255, 255, 255, 0.08)' },
                { amplitude: 40, frequency: 0.008, speed: 0.7, color: 'rgba(255, 255, 255, 0.2)' },
            ];

            const centerY = canvas.height / 2;

            // Dibujar cada onda
            waves.forEach(wave => {
                ctx.beginPath();
                for (let x = 0; x <= canvas.width; x++) {
                    // Fórmula matemática de la onda
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

        // Limpieza al desmontar el componente
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="bg-[#14161A] text-white p-[52px] flex flex-col justify-between relative overflow-hidden h-screen">
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
            ></canvas>
        </div>
    );
}