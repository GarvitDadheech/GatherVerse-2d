import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { GameScene } from "../../game/GameScene";

interface GameContainerProps {
  isChatOpen: boolean;
}

export const GameContainer: React.FC<GameContainerProps> = ({ isChatOpen }) => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameRef.current,
        width: isChatOpen ? window.innerWidth * 0.7 : window.innerWidth * 0.95,
        height: window.innerHeight,
        scene: GameScene,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { x: 0, y: 0 },
          },
        },
      };

      const game = new Phaser.Game(config);

      return () => {
        game.destroy(true);
      };
    }
  }, [isChatOpen]);

  return (
    <div
      ref={gameRef}
      className="relative h-full"
      style={{ width: isChatOpen ? "70%" : "95%" }}
    />
  );
};
