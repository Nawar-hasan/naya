"use client";

import { useEffect, useRef } from "react";

export default function WavyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.5;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const waves = [
      { amplitude: 50, frequency: 0.005, speed: 0.001, opacity: 0.15 },
      { amplitude: 70, frequency: 0.003, speed: 0.002, opacity: 0.1 },
      { amplitude: 30, frequency: 0.008, speed: 0.0015, opacity: 0.2 },
    ];

    let animationFrameId: number;
    let time = 0;

    const drawWave = (wave: (typeof waves)[0], yOffset: number) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x++) {
        const y =
          Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
        ctx.lineTo(x, y + yOffset);
      }

      ctx.strokeStyle = `rgba(212, 175, 55, ${wave.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const hexSize = 40;
      const horizontalSpacing = hexSize * Math.sqrt(3);
      const verticalSpacing = hexSize * 1.5;
      const columns = Math.ceil(canvas.width / horizontalSpacing) + 2;
      const rows = Math.ceil(canvas.height / verticalSpacing) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const x =
            col * horizontalSpacing + (row % 2) * (horizontalSpacing / 2);
          const y = row * verticalSpacing;

          ctx.strokeStyle = `rgba(212, 175, 55, ${
            0.05 + Math.sin(time + row + col) * 0.02
          })`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const hx = x + Math.cos(angle) * hexSize;
            const hy = y + Math.sin(angle) * hexSize;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }

      waves.forEach((wave, i) => {
        drawWave(wave, canvas.height * (0.3 + i * 0.2));
      });

      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(212, 175, 55, 0.3)";

      time += 0.016;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-70"
    />
  );
}
