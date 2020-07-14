class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.player = new Surfer(this);
    this.kook = new Kook(this);
    this.setKeyBindings();
    this.running = true;
    this.kooks = [];
    this.obstacleDelta = 1500;
    this.timer = 0;
    this.scoreboard = new Scoreboard(this);
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
        case 27:
          game.togglePause();
          break;
      }
    });
  }

  addMoreKooks(timestamp) {
    if (this.timer < timestamp - this.obstacleDelta) {
      this.timer = timestamp;
      this.kooks.push(new Kook(this));
    }
  }

  lose() {
    this.running = false;
    clearInterval();
    window.location.reload();
  }

  checkCollission() {
    for (let kook of this.kooks) {
      if (
        this.player.surfX < kook.kookX + kook.kookWidth &&
        this.player.surfX + this.player.playerWidth > kook.kookX &&
        this.player.surfY < kook.kookY + kook.kookHeight &&
        this.player.surfY + this.player.playerHeight > kook.kookY
      ) {
        this.lose();
      }
    }
  }

  checkSurfBail() {
    if (this.player.surfY + this.player.playerHeight > 400) {
      this.lose();
    }
  }

  runLogic(timestamp) {
    this.player.runLogic();
    for (let kook of this.kooks) {
      kook.runLogic();
    }
    this.checkCollission();
    this.checkSurfBail();
    this.addMoreKooks(timestamp);
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint(timestamp) {
    this.player.paint();
    for (let kook of this.kooks) {
      kook.paint();
    }
    this.scoreboard.paint(timestamp);
  }

  loop(timestamp) {
    this.runLogic(timestamp);
    this.clean();
    this.paint(timestamp);
    if (this.running === true) {
      window.requestAnimationFrame(timestamp => this.loop(timestamp));
    }
  }
}
