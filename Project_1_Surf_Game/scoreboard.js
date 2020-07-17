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
    context.fillStyle = '#bcff7c';
    context.fillRect(535, 360, 427, 28);
    context.fillStyle = 'white';
    context.fillRect(540, 365, 427, 28);
    context.restore();
    context.font = '18px courier';
    context.fillStyle = 'black';
    context.fillText(
      'Current Wave: ' +
        this.currentScore +
        '   Pineapple Points: ' +
        this.game.pineappleCount,
      550,
      canvas.height - 15
    );
  }
}
