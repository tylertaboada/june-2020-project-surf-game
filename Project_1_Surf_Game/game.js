class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.player = new Surfer(this);
    this.kook = new Kook(this);
    this.setKeyBindings();
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      const key = event.key;
      switch (key) {
        case 'ArrowUp':
          this.player.surfY -= 15;
          break;
        case 'ArrowDown':
          this.player.surfY += 15;
          break;
      }
    });
  }

  lose() {
    clearInterval();
    window.location.reload();
  }

  checkCollission() {
    if (
      this.player.surfX < this.kook.kookX + this.kook.kookWidth &&
      this.player.surfX + this.player.playerWidth > this.kook.kookX &&
      this.player.surfY < this.kook.kookY + this.kook.kookHeight &&
      this.player.surfY + this.player.playerHeight > this.kook.kookY
    ) {
      this.lose();
    }
  }

  checkSurfBail() {
    if (this.player.surfY + this.player.playerHeight > 400) {
      this.lose();
    }
  }

  runLogic() {
    this.player.runLogic();
    this.kook.runLogic();
    this.checkCollission();
    this.checkSurfBail();
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.player.paint();
    this.kook.paint();
  }

  loop() {
    this.runLogic();
    this.clean();
    this.paint();

    window.requestAnimationFrame(() => this.loop());
  }
}
