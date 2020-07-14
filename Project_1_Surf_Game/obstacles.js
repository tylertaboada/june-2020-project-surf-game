class Kook {
  constructor(game) {
    this.game = game;
    this.kookWidth = 50;
    this.kookHeight = 50;
    this.kookX = 800;
    this.kookY = 200;
  }

  runLogic() {
    const CURRENT = -3.5;
    this.kookY = 150;
    this.kookX += CURRENT;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'red';
    context.fillRect(this.kookX, this.kookY, this.kookWidth, this.kookWidth);
    context.restore();
  }

  //   const kook1 = new Kook(100,100,50,50);
  //   const kook2 = new Kook(200,300,50,50);

  // kook.paint(context);
  // kook2.paint(context);
}
