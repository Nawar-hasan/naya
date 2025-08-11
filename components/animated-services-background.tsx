// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck unknown types
"use client";

import { useEffect, useRef } from "react";

export default function AnimatedServicesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get the context with error handling
    let ctx: CanvasRenderingContext2D | null;
    try {
      ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) {
        console.error("Unable to get 2D context");
        return;
      }
    } catch (e) {
      console.error("Error getting 2D context:", e);
      return;
    }

    // Set canvas size with error handling
    const setCanvasSize = () => {
      if (!canvas || !ctx) return;

      try {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 2;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      } catch (e) {
        console.error("Error setting canvas size:", e);
      }
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create flowing lines
    class Line {
      x: number | undefined;
      y: number | undefined;
      length: number | undefined;
      angle: number | undefined;
      speed: number | undefined;
      width: number | undefined;
      opacity: number | undefined;
      //color: string

      constructor() {
        this.reset();
        this.y = Math.random() * (canvas?.height || 0);
      }

      reset() {
        this.x = -200;
        this.y = Math.random() * (canvas?.height || 0);
        this.length = Math.random() * 100 + 100;
        this.angle = Math.random() * 40 - 20;
        this.speed = Math.random() * 2 + 1;
        this.width = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        //this.color = '#D4AF37'
      }

      update() {
        //@ts-expect-error asd
        this.x += this.speed;
        if (this.x > (canvas?.width || 0) + 200) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);

        const gradient = ctx.createLinearGradient(0, 0, this.length, 0);
        gradient.addColorStop(0, `rgba(212, 175, 55, 0)`);
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(212, 175, 55, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.length, 0);
        ctx.stroke();

        ctx.restore();
      }
    }

    // Create particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      //color: string

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        //this.color = '#D4AF37'
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (
          this.x < 0 ||
          this.x > (canvas?.width || 0) ||
          this.y < 0 ||
          this.y > (canvas?.height || 0)
        ) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize objects with error handling
    let lines: Line[] = [];
    let particles: Particle[] = [];

    try {
      lines = Array.from({ length: 20 }, () => new Line());
      particles = Array.from({ length: 50 }, () => new Particle());
    } catch (e) {
      console.error("Error initializing objects:", e);
      return;
    }

    // Animation loop with error handling
    let animationFrameId: number;
    let isAnimating = true;

    const animate = () => {
      if (!ctx || !canvas || !isAnimating) return;

      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw grid pattern
        // ctx.strokeStyle = "rgba(212, 175, 55, 0.05)";
        // ctx.lineWidth = 1;
        // const gridSize = 50;

        // for (let x = 0; x < canvas.width; x += gridSize) {
        //   ctx.beginPath();
        //   ctx.moveTo(x, 0);
        //   ctx.lineTo(x, canvas.height);
        //   ctx.stroke();
        // }

        // for (let y = 0; y < canvas.height; y += gridSize) {
        //   ctx.beginPath();
        //   ctx.moveTo(0, y);
        //   ctx.lineTo(canvas.width, y);
        //   ctx.stroke();
        // }

        // Update and draw lines
        lines.forEach((line) => {
          line.update();
          line.draw();
        });

        // Update and draw particles
        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        // Add gradient overlay
        // const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        // gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        // gradient.addColorStop(0.2, "rgba(0, 0, 0, 0.7)");
        // gradient.addColorStop(0.8, "rgba(0, 0, 0, 0.7)");
        // gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        // ctx.fillStyle = gradient;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (isAnimating) {
          animationFrameId = requestAnimationFrame(animate);
        }
      } catch (e) {
        console.error("Error in animation loop:", e);
        isAnimating = false;
      }
    };

    // Start animation
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    animate();

    // Cleanup
    return () => {
      isAnimating = false;
      window.removeEventListener("resize", setCanvasSize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 size-full z-0"
      // style={{ opacity: 1 }}
    />
  );
}
