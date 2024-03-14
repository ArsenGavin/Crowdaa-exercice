import React, { useEffect, useRef, useState } from 'react';
import './Matrix-canva.css';

function MatrixWallCanvas() {
  const colorpolicecanvas = '#6f42c1';
  const ref = useRef<HTMLCanvasElement>(null);
  const intervalIDRef = useRef<number | null>(null);
  const policeCanvas = 'crowdaa';
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const maxWidth = 600;
      const maxPercentage = 0.3;
      const width = Math.min(window.innerWidth * maxPercentage, maxWidth);
      const height = Math.min(window.innerWidth * maxPercentage, maxWidth);
      setCanvasSize({ width, height });
    };
    updateSize();

    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const { width, height } = canvasSize;
    canvas.width = width;
    canvas.height = height;
    const alphabet = policeCanvas;
    const fontSize = 12;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      if (!context) return;
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      if (Array.isArray(colorpolicecanvas)) {
        context.fillStyle = colorpolicecanvas[Math.floor(Math.random() * colorpolicecanvas.length)];
      } else {
        context.fillStyle = colorpolicecanvas;
      }

      context.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet;
        if (!context) return;
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    intervalIDRef.current = window.setInterval(draw, 140);
    return () => {
      cleanupCanvas(canvas, context);
      clearInterval(intervalIDRef.current as number);
    };
  }, [policeCanvas, colorpolicecanvas, canvasSize]);

  const cleanupCanvas = (canvas: HTMLCanvasElement | null, context: CanvasRenderingContext2D | null) => {
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const props = { colorpolicecanvas };
  return <canvas className="WallCanva" ref={ref} width={canvasSize.width} height={canvasSize.height} {...props} />;
}

export default MatrixWallCanvas;
