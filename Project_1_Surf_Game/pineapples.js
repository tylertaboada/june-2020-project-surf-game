class Pineapples {
  constructor(game) {
    this.game = game;
    this.pineapplesWidth = 50;
    this.pineapplesHeight = 50;
    this.pineapplesX = this.game.canvas.width;
    this.pineapplesY = Math.random() * (this.game.canvas.height - 75);
    this.image = new Image();
    this.image.src = '/images/pineappleSurf.png';
  }

  runLogic() {
    const CURRENT = -1.5;
    this.pineapplesX += CURRENT;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.shadowBlur = 20;
    context.shadowColor = 'lightblue';
    context.drawImage(
      this.image,
      this.pineapplesX,
      this.pineapplesY,
      this.pineapplesWidth,
      this.pineapplesWidth
    );
    context.restore();
  }
}
