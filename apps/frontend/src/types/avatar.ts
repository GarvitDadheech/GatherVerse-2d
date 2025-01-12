// types/avatar.ts
export interface SpriteFrame {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  export interface AnimationSequence {
    frames: SpriteFrame[];
    frameCount: number;
  }
  
  export interface AvatarAnimations {
    idle: AnimationSequence;
    run: AnimationSequence;
    sit: {
      up: SpriteFrame;
      down: SpriteFrame;
      left: SpriteFrame;
      right: SpriteFrame;
    };
  }
  
  export interface Avatar {
    id: string;
    name: string;
    description: string;
    spriteSheet: string;  // URL to the sprite sheet image
    animations: AvatarAnimations;
    frameWidth: number;
    frameHeight: number;
  }
  
  // Example avatar data
  export const AVATARS: Avatar[] = [
    {
      id: 'adam',
      name: 'Adam',
      description: 'A brave adventurer',
      spriteSheet: '/assets/avatars/adam.png',
      frameWidth: 32,
      frameHeight: 48,
      animations: {
        idle: {
          frames: Array.from({ length: 24 }, (_, i) => ({
            x: i * 32,
            y: 0,
            width: 32,
            height: 48
          })),
          frameCount: 24
        },
        run: {
          frames: Array.from({ length: 24 }, (_, i) => ({
            x: (i + 24) * 32, // Start after idle frames
            y: 0,
            width: 32,
            height: 48
          })),
          frameCount: 24
        },
        sit: {
          up: { x: 1632, y: 0, width: 32, height: 48 },
          down: { x: 1536, y: 0, width: 32, height: 48 },
          left: { x: 1568, y: 0, width: 32, height: 48 },
          right: { x: 1600, y: 0, width: 32, height: 48 }
        }
      }
    }
    // Add more avatars here...
  ];