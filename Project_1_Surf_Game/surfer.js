class Surfer {
  constructor(game) {
    this.game = game;
    this.playerWidth = 50;
    this.playerHeight = 50;
    this.surfX = 250;
    this.surfY = 50;
    this.image = new Image();
    this.image.src = '/images/surf_norm.png';
    this.imageSurfUp = new Image();
    this.imageSurfUp.src = 'images/surf_up.png';
    this.imageSurfDown = new Image();
    this.imageSurfDown.src = 'images/surf_down.png';
    this.playerDirection = 'idle';
    this.speed = 0;
  }

  runLogic() {
    this.surfY += this.speed;
    this.speed = this.speed / 1.25;
    if (Math.round(this.speed * 10) / 10 === 0) {
      this.speed = 0;
      this.playerDirection = 'idle';
    }
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.shadowBlur = 20;
    context.shadowColor = 'lightblue';
    if (this.playerDirection === 'up') {
      context.drawImage(
        this.imageSurfUp,
        this.surfX,
        this.surfY,
        this.playerWidth,
        this.playerHeight
      );
    } else if (this.playerDirection === 'down') {
      context.drawImage(
        this.imageSurfDown,
        this.surfX,
        this.surfY,
        this.playerWidth,
        this.playerHeight
      );
    } else if (this.playerDirection === 'idle') {
      context.drawImage(
        this.image,
        this.surfX,
        this.surfY,
        this.playerWidth,
        this.playerHeight
      );
    }
    context.restore();
  }

  update() {
    this.paint();
  }
}
