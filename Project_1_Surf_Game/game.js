class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.player = new Surfer(this);
    this.kook = new Kook(this);
    this.pineapples = new Pineapples(this);
    //  this.wave = new Wave(this);
    this.setKeyBindings();
    this.running = false;
    this.kooks = [];
    this.pineapple = [];
    this.obstacleDelta = 1500;
    this.pineappleDelta = 3000;
    this.timer = 0;
    this.scoreboard = new Scoreboard(this);
    this.gameStarted = false;
    this.timeGameStarted = 0;
    this.timerPineapple = 0;
    this.pineappleCount = 0;
  }

  resetEverything() {
    this.player = new Surfer(this);
    this.kook = new Kook(this);
    this.pineapples = new Pineapples(this);
    this.running = false;
    this.kooks = [];
    this.pineapple = [];
    this.obstacleDelta = 1500;
    this.timer = 0;
    this.gameStarted = false;
    this.timeGameStarted = 0;
    this.pineappleCount = 0;
    this.scoreboard.currentScore = 0;
    this.paintStartScreen();
  }

  paintStartScreen() {
    if (this.running === false) {
      this.context.fillStyle = 'white';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = 'salmon';
      this.context.font = '50px courier';
      this.context.fillText("Let's Shred", 350, 170);
      this.context.font = '30px courier';
      this.context.fillText('🤙🏼 🏄🏽‍♂️ ☀️ 🍍', 430, 220);
      this.context.fillStyle = 'salmon';
      this.context.font = '20px courier';
      this.context.fillText('PRESS SPACE TO START', 400, 260);
    }
  }

  paintEndGame() {
    if (this.running === false) {
      this.context.fillStyle = 'white';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = 'salmon';
      this.context.font = '55px courier';
      this.context.fillText('That was gnarly!', 75, 100);
      this.context.fillStyle = 'teal';
      this.context.font = '20px courier';
      this.context.fillText(
        'You were a surf legend for ' +
          this.scoreboard.currentScore +
          ' SECONDS',
        75,
        150
      );
      this.context.fillText(
        ' & collected ' + this.pineappleCount + ' PINEAPPLE POINTS.',
        75,
        180
      );
      this.context.fillStyle = 'salmon';
      this.context.font = '30px courier';
      this.context.fillText('🤙🏼 🏄🏽‍♂️ ☀️ 🍍', 100, 245);
      this.context.font = '20px courier';
      this.context.fillText('PRESS ENTER TO TRY AGAIN', 110, 320);
      this.context.strokeStyle = 'teal';
      this.context.beginPath();
      this.context.rect(75, 290, 355, 50);
      this.context.stroke();
      this.context.fillRect(650, 60, 275, 280);
      // this.context.videoContainer;
    }
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      const key = event.keyCode;
      switch (key) {
        case 38:
          this.player.speed -= 12;
          this.player.playerDirection = 'up';
          break;
        case 40:
          this.player.speed += 17;
          this.player.playerDirection = 'down';
          break;
        case 32:
          if (this.running === false) {
            this.running = true;
            this.gameStarted = true;
            this.loop();
          }
          break;
        case 13:
          this.resetEverything();
          this.running = true;
          this.gameStarted = true;
          this.loop();
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

  addMorePineapples(timestamp) {
    if (this.timerPineapple < timestamp - this.pineappleDelta) {
      this.timerPineapple = timestamp;
      this.pineapple.push(new Pineapples(this));
    }
  }

  increaseDifficulty() {
    if (!(this.scoreboard.currentScore % 5) && this.scoreboard.currentScore) {
      this.obstacleDelta = this.obstacleDelta / 1.002;
    }
  }

  lose() {
    this.running = false;
    clearInterval();
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

  checkPineappleCollission() {
    for (let pineapple of this.pineapple) {
      if (
        this.player.surfX < pineapple.pineapplesX + pineapple.pineapplesWidth &&
        this.player.surfX + this.player.playerWidth > pineapple.pineapplesX &&
        this.player.surfY <
          pineapple.pineapplesY + pineapple.pineapplesHeight &&
        this.player.surfY + this.player.playerHeight > pineapple.pineapplesY
      ) {
        this.pineappleCount += 1;
        this.pineapple.splice(this.pineapple.indexOf[pineapple], 1);
      }
    }
  }

  checkSurfBail() {
    if (this.player.surfY + this.player.playerHeight > 420) {
      this.lose();
    }
  }

  runLogic(timestamp) {
    this.player.runLogic();
    for (let kook of this.kooks) {
      kook.runLogic();
    }
    for (let pineapple of this.pineapple) {
      pineapple.runLogic();
    }
    this.checkCollission();
    this.checkPineappleCollission();
    this.checkSurfBail();
    if (this.gameStarted && timestamp) {
      this.timeGameStarted = timestamp;
      this.gameStarted = false;
    }
    this.addMoreKooks(timestamp - this.timeGameStarted);
    this.addMorePineapples(timestamp - this.timeGameStarted);
    this.scoreboard.increaseScore(timestamp - this.timeGameStarted);
    this.increaseDifficulty();
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint(timestamp) {
    if (this.running === true) {
      this.player.paint();
      // this.background.paint();
      for (let kook of this.kooks) {
        kook.paint();
      }
      for (let pineapple of this.pineapple) {
        pineapple.paint();
      }
      this.scoreboard.paint();
    } else {
      this.paintEndGame();
    }
  }

  loop(timestamp) {
    this.runLogic(timestamp);
    this.clean();
    if (this.running === true) {
      window.requestAnimationFrame(timestamp => this.loop(timestamp));
    }
    this.paint(timestamp);
  }
}
