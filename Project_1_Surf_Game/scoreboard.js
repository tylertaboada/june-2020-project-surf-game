class Scoreboard {
  constructor(game) {
    this.game = game;
    this.currentScore = 0;
  }

  increaseScore(timestamp) {
    this.currentScore = Math.floor(Math.floor(timestamp) / 1000);
  }

  paint(timestamp) {
    const context = this.game.context;
    const canvas = this.game.canvas;
    context.save();
    context.font = '18px courier';
    context.fillStyle = 'white';
    context.fillText(
      'Current Wave: ' + this.currentScore,
      20,
      canvas.height - 10
    );
    context.restore();
  }
}
