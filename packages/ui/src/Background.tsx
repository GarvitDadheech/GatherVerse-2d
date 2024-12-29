import { Star, Sparkles } from "lucide-react";
import { ReactNode } from "react";

export const Background = ({ children }: { children: ReactNode }) => {
  const starPositions = [
    // Large Feature Stars - Creating focal points
    { top: "5%", left: "10%", size: 28, delay: "0s", type: "big" },
    { top: "15%", left: "90%", size: 26, delay: "1.5s", type: "big" },
    { top: "45%", left: "5%", size: 24, delay: "0.7s", type: "big" },
    { top: "60%", left: "95%", size: 28, delay: "1.2s", type: "big" },
    { top: "85%", left: "15%", size: 26, delay: "0.9s", type: "big" },
    { top: "95%", left: "80%", size: 24, delay: "0.3s", type: "big" },

    // Medium Stars - Creating a balanced grid
    { top: "10%", left: "30%", size: 18, delay: "0.2s", type: "normal" },
    { top: "10%", left: "70%", size: 16, delay: "0.5s", type: "normal" },
    { top: "25%", left: "20%", size: 18, delay: "1.0s", type: "normal" },
    { top: "25%", left: "50%", size: 16, delay: "1.5s", type: "normal" },
    { top: "25%", left: "80%", size: 18, delay: "0.7s", type: "normal" },
    { top: "40%", left: "35%", size: 16, delay: "1.2s", type: "normal" },
    { top: "40%", left: "65%", size: 18, delay: "0.3s", type: "normal" },
    { top: "55%", left: "25%", size: 16, delay: "0.8s", type: "normal" },
    { top: "55%", left: "75%", size: 18, delay: "1.4s", type: "normal" },
    { top: "70%", left: "40%", size: 16, delay: "0.6s", type: "normal" },
    { top: "70%", left: "60%", size: 18, delay: "1.1s", type: "normal" },
    { top: "85%", left: "45%", size: 16, delay: "0.4s", type: "normal" },

    // Small Stars - Filling the gaps
    { top: "5%", left: "50%", size: 8, delay: "0.2s", type: "small" },
    { top: "15%", left: "40%", size: 8, delay: "0.7s", type: "small" },
    { top: "20%", left: "65%", size: 8, delay: "1.1s", type: "small" },
    { top: "30%", left: "35%", size: 8, delay: "0.5s", type: "small" },
    { top: "35%", left: "85%", size: 8, delay: "0.9s", type: "small" },
    { top: "45%", left: "45%", size: 8, delay: "1.3s", type: "small" },
    { top: "50%", left: "15%", size: 8, delay: "0.4s", type: "small" },
    { top: "60%", left: "40%", size: 8, delay: "0.8s", type: "small" },
    { top: "65%", left: "85%", size: 8, delay: "1.2s", type: "small" },
    { top: "75%", left: "30%", size: 8, delay: "0.6s", type: "small" },
    { top: "80%", left: "70%", size: 8, delay: "1.0s", type: "small" },
    { top: "90%", left: "25%", size: 8, delay: "0.3s", type: "small" },

    // Tiny Stars - Creating depth
    { top: "8%", left: "15%", size: 4, delay: "0.4s", type: "tiny" },
    { top: "12%", left: "55%", size: 4, delay: "0.9s", type: "tiny" },
    { top: "18%", left: "35%", size: 4, delay: "1.3s", type: "tiny" },
    { top: "22%", left: "75%", size: 4, delay: "0.6s", type: "tiny" },
    { top: "28%", left: "45%", size: 4, delay: "1.1s", type: "tiny" },
    { top: "33%", left: "25%", size: 4, delay: "0.3s", type: "tiny" },
    { top: "38%", left: "80%", size: 4, delay: "0.8s", type: "tiny" },
    { top: "43%", left: "20%", size: 4, delay: "1.2s", type: "tiny" },
    { top: "48%", left: "60%", size: 4, delay: "0.5s", type: "tiny" },
    { top: "53%", left: "40%", size: 4, delay: "1.0s", type: "tiny" },
    { top: "58%", left: "70%", size: 4, delay: "0.7s", type: "tiny" },
    { top: "63%", left: "30%", size: 4, delay: "1.4s", type: "tiny" },
    { top: "68%", left: "50%", size: 4, delay: "0.2s", type: "tiny" },
    { top: "73%", left: "85%", size: 4, delay: "0.9s", type: "tiny" },
    { top: "78%", left: "20%", size: 4, delay: "1.3s", type: "tiny" },
    { top: "83%", left: "60%", size: 4, delay: "0.6s", type: "tiny" },
    { top: "88%", left: "35%", size: 4, delay: "1.1s", type: "tiny" },
    { top: "93%", left: "75%", size: 4, delay: "0.4s", type: "tiny" },
  ];

  const cloudPositions = [
    // Large foreground clouds
    {
      top: "15%",
      left: "10%",
      width: "w-48",
      height: "h-24",
      duration: "15s",
      delay: "0s",
      opacity: "0.7",
    },
    {
      top: "25%",
      left: "75%",
      width: "w-40",
      height: "h-20",
      duration: "12s",
      delay: "-3s",
      opacity: "0.6",
    },
    {
      top: "45%",
      left: "20%",
      width: "w-44",
      height: "h-22",
      duration: "18s",
      delay: "-6s",
      opacity: "0.65",
    },
    {
      top: "60%",
      left: "85%",
      width: "w-36",
      height: "h-18",
      duration: "14s",
      delay: "-4s",
      opacity: "0.7",
    },
    {
      top: "75%",
      left: "15%",
      width: "w-42",
      height: "h-20",
      duration: "16s",
      delay: "-7s",
      opacity: "0.6",
    },

    // Medium background clouds
    {
      top: "5%",
      left: "40%",
      width: "w-32",
      height: "h-16",
      duration: "20s",
      delay: "-2s",
      opacity: "0.4",
    },
    {
      top: "35%",
      left: "65%",
      width: "w-28",
      height: "h-14",
      duration: "17s",
      delay: "-8s",
      opacity: "0.35",
    },
    {
      top: "55%",
      left: "5%",
      width: "w-36",
      height: "h-16",
      duration: "19s",
      delay: "-5s",
      opacity: "0.45",
    },
    {
      top: "80%",
      left: "60%",
      width: "w-30",
      height: "h-14",
      duration: "16s",
      delay: "-9s",
      opacity: "0.4",
    },

    // Small distant clouds
    {
      top: "10%",
      left: "60%",
      width: "w-24",
      height: "h-12",
      duration: "22s",
      delay: "-1s",
      opacity: "0.25",
    },
    {
      top: "40%",
      left: "45%",
      width: "w-20",
      height: "h-10",
      duration: "21s",
      delay: "-4s",
      opacity: "0.3",
    },
    {
      top: "70%",
      left: "40%",
      width: "w-24",
      height: "h-12",
      duration: "23s",
      delay: "-7s",
      opacity: "0.25",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a2945] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Stars Layer */}
      {starPositions.map((star, i) => (
        <div
          key={`star-${i}`}
          className="absolute"
          style={{
            top: star.top,
            left: star.left,
          }}
        >
          {star.type === "big" ? (
            <Star
              className="text-yellow-200 animate-pulse fill-yellow-200"
              size={star.size}
              style={{ animationDelay: star.delay }}
            />
          ) : (
            <Sparkles
              className="text-yellow-200 animate-pulse"
              size={star.size}
              style={{ animationDelay: star.delay }}
            />
          )}
        </div>
      ))}

      {/* Moon */}
      <div className="absolute top-[5%] right-[10%]">
        <div className="w-24 h-24 bg-white rounded-full shadow-[0_0_80px_rgba(255,255,255,0.4)]" />
      </div>

      {/* Clouds Layer */}
      {cloudPositions.map((cloud, i) => (
        <div
          key={`cloud-${i}`}
          className={`absolute ${cloud.width} ${cloud.height}`}
          style={{
            top: cloud.top,
            left: cloud.left,
            animation: `float ${cloud.duration} infinite ease-in-out`,
            animationDelay: cloud.delay,
            opacity: cloud.opacity,
          }}
        >
          <div className="w-full h-full bg-[#2a415f] rounded-3xl" />
        </div>
      ))}
      
      {children}
    </div>
  );
};
