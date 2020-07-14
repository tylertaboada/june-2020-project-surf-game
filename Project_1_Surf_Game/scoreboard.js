class Scoreboard {
  constructor(game) {
    this.game = game;
  }

  paint(timestamp) {
    const context = this.game.context;
    const score = Math.floor(Math.floor(timestamp) / 1000);
    const bestScore = 0;
    context.save();
    context.font = '32px sans-serif';
    context.fillText('Best Wave: ' + bestScore, 20, 350);
    context.fillText('Current Wave: ' + score, 20, 380);
    context.restore();
  }
}
