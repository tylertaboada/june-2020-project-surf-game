class Surfer {
  constructor(game) {
    this.game = game;
    this.playerWidth = 50;
    this.playerHeight = 50;
    this.surfX = 100;
    this.surfY = 50;
  }

  calculateMovement(direction) {
    switch (direction) {
      case 'up':
        this.surfY -= 20;
        console.log('up');
        break;
      case 'down':
        this.surfY += 20;
        console.log('down');
        break;
    }
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'black';
    context.fillRect(
      this.surfX,
      this.surfY,
      this.playerWidth,
      this.playerWidth
    );
    context.restore();
  }

  update() {
    this.paint();
  }
}
