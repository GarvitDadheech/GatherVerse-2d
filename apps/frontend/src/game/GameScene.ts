import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("tiles", "/api/placeholder/32/32");
    this.load.spritesheet("character", "/api/placeholder/32/32", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    const map = this.make.tilemap({ width: 20, height: 20 });
    const tiles = map.addTilesetImage("tiles");
    if (tiles) {
      const layer = map.createBlankLayer("layer", tiles);
    } else {
      console.error("Failed to load tileset");
    }

    const character = this.add.sprite(100, 100, "character");
  }
}
