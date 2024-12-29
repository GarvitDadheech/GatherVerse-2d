import { useEffect, useState } from "react";

const BubbleAnimation = () => {
  interface Bubble {
    id: string;
    size: number;
    left: number;
    duration: number;
  }

  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const createBubble = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 100;
      const duration = Math.random() * 2 + 10;

      setBubbles((prev) => [...prev, { id, size, left, duration }]);

      setTimeout(() => {
        setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
      }, duration * 1000);
    };

    const interval = setInterval(createBubble, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Bubble animation */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 rounded-full opacity-40 bg-gradient-to-br from-[#4fd1c5] to-[#38a89d]"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animation: `rise ${bubble.duration}s linear forwards`,
          }}
        ></div>
      ))}
      <style>
        {`
          @keyframes rise {
            from {
              bottom: 0;
              opacity: 0.5;
            }
            to {
              bottom: 55%;
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BubbleAnimation;
