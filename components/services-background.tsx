// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck unknown types
"use client";

import { useEffect, useRef } from "react";

export default function ServicesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2; // Taller for services section

      // Set high DPI for sharp rendering
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

    // Particle system
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.01;
        this.opacity = this.life * 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(218, 165, 32, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create hexagonal grid
    class Hexagon {
      x: number;
      y: number;
      size: number;
      angle: number;
      pulseOffset: number;
      glowIntensity: number;

      constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = 0;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.glowIntensity = Math.random();
      }

      draw(time: number) {
        const pulse = Math.sin(time * 0.001 + this.pulseOffset) * 0.5 + 0.5;
        const size = this.size * (0.8 + pulse * 0.2);
        const glow = this.glowIntensity * pulse;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Draw glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.5);
        gradient.addColorStop(0, `rgba(218, 165, 32, ${0.1 * glow})`);
        gradient.addColorStop(1, "rgba(218, 165, 32, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * size * 1.5;
          const y = Math.sin(angle) * size * 1.5;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // Draw hexagon
        ctx.strokeStyle = `rgba(218, 165, 32, ${0.1 + 0.1 * pulse})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = Math.cos(angle) * size;
          const y = Math.sin(angle) * size;
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw inner lines
        ctx.strokeStyle = `rgba(218, 165, 32, ${0.05 + 0.05 * pulse})`;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 3; i++) {
          const angle = (i * Math.PI) / 3;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
          ctx.stroke();
        }

        ctx.restore();
      }

      update(time: number) {
        this.angle = Math.sin(time * 0.0005 + this.pulseOffset) * 0.1;
      }
    }

    // Initialize particles and hexagons
    const particles: Particle[] = [];
    const hexagons: Hexagon[] = [];
    const hexSize = 40;
    const horizontalSpacing = hexSize * Math.sqrt(3);
    const verticalSpacing = hexSize * 1.5;
    const columns = Math.ceil(canvas.width / horizontalSpacing) + 2;
    const rows = Math.ceil(canvas.height / verticalSpacing) + 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * horizontalSpacing + (row % 2) * (horizontalSpacing / 2);
        const y = row * verticalSpacing;
        hexagons.push(new Hexagon(x, y, hexSize));
      }
    }

    // Animation
    let animationFrameId: number;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw hexagons
      hexagons.forEach((hexagon) => {
        hexagon.update(timestamp);
        hexagon.draw(timestamp);
      });

      // Update and draw particles
      if (Math.random() < 0.1) {
        particles.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      // Create vertical gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(0.2, "rgba(0, 0, 0, 0.8)");
      gradient.addColorStop(0.8, "rgba(0, 0, 0, 0.8)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ opacity: 0.6 }}
    />
  );
}
