class Kook {
  constructor(game) {
    this.game = game;
    this.kookWidth = 50;
    this.kookHeight = 50;
    this.kookX = this.game.canvas.width;
    this.kookY = Math.random() * (this.game.canvas.height - 75);
    this.image = new Image();
    this.image.src = '/images/kook.gif';
  }

  runLogic() {
    const CURRENT = -4.5;
    this.kookX += CURRENT;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'red';
    //  context.fillRect(this.kookX, this.kookY, this.kookWidth, this.kookWidth);
    context.drawImage(
      this.image,
      this.kookX,
      this.kookY,
      this.kookWidth,
      this.kookWidth
    );
    context.restore();
  }
}
