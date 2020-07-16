class Surfer {
  constructor(game) {
    this.game = game;
    this.playerWidth = 50;
    this.playerHeight = 50;
    this.surfX = 175;
    this.surfY = 50;
    this.image = new Image();
    this.image.src = '/images/surf_norm.png';
  }

  calculateMovement(direction) {
    switch (direction) {
      case 'up':
        this.surfY -= 20;
        break;
      case 'down':
        this.surfY += 20;
        break;
    }
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'black';
    context.shadowBlur = 20;
    context.shadowColor = 'lightblue';
    //  context.fillRect(
    //    this.surfX,
    //    this.surfY,
    //    this.playerWidth,
    //    this.playerWidth
    //  );
    context.drawImage(
      this.image,
      this.surfX,
      this.surfY,
      this.playerWidth,
      this.playerHeight
    );
    context.restore();
  }

  update() {
    this.paint();
  }
}
