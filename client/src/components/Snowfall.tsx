import { useEffect, useRef } from 'react';

export function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakes: { x: number; y: number; radius: number; speed: number; wind: number }[] = [];
    const snowflakeCount = 100;

    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        wind: Math.random() * 1 - 0.5,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      ctx.beginPath();

      for (let i = 0; i < snowflakes.length; i++) {
        const f = snowflakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, true);
      }
      ctx.fill();
      move();
    }

    function move() {
      for (let i = 0; i < snowflakes.length; i++) {
        const f = snowflakes[i];
        f.y += f.speed;
        f.x += f.wind;

        if (f.y > height) {
          f.y = 0;
          f.x = Math.random() * width;
        }
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;
      }
    }

    let animationFrameId: number;
    function animate() {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50"
    />
  );
}
