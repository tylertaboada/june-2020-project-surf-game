class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.player = new Surfer(this);
    this.kook = new Kook(this);
    this.pineapples = new Pineapples(this);
    this.wave = new Wave(this);
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
    this.startImage = new Image();
    this.startImage.src = '/images/surf_image.png';
    this.image = new Image();
    this.image.src = '/images/endgame1.jpeg';
    this.imageLines = new Image();
    this.imageLines.src = '/images/lines.png';
    //  [
    //    '/images/endgame2.jpeg',
    //    '/images/endgame3.jpeg',
    //    '/images/endgame4.jpeg',
    //    '/images/endgame5.jpeg',
    //    '/images/endgame6.png',
    //    '/images/endgame7.png'
    //  ];
    this.audio = new Audio('sound/Pulp Fiction Misirlou.mp3');
    this.endAudio = new Audio('sound/RPReplay_Final1594982782.MP4');
  }

  // - - - - - - - - - - - - - - - - - - - - - -> START GAME MENU < - - - - -
  paintStartScreen() {
    if (this.running === false) {
      // MAIN BLOCK
      this.context.fillStyle = '#9cdaff';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // LEFT BLOCK
      this.context.fillStyle = 'salmon';
      this.context.fillRect(40, 70, 425, 290);
      this.context.fillStyle = 'white';
      this.context.fillRect(50, 50, 425, 300);
      this.context.fillStyle = 'black';
      this.context.font = '60px courier';
      this.context.fillText('SURF SESH', 95, 130);
      // this.context.font = '20px courier';
      // this.context.fillText('A Tyler Taboada Production', 95, 330);
      this.startImage.addEventListener('load', () => {
        this.context.drawImage(this.startImage, 120, 150, 250, 180);
      });
      console.log(this.startImage);

      // RIGHT BLOCK
      this.context.fillStyle = '#ffd265';
      this.context.fillRect(535, 40, 425, 280);
      this.context.fillStyle = 'white';
      this.context.fillRect(525, 50, 425, 300);
      this.context.fillStyle = 'black';
      this.context.font = '30px courier';
      this.context.fillText('How To Play:', 560, 100);
      this.context.font = '16px courier';
      this.context.fillText('⬆️  Up arrow to move up.', 560, 140);
      this.context.fillText('⬇️  Down arrow to move down.', 560, 175);
      this.context.fillText('🏄🏽‍♂️  Avoid the kooks (other surfers).', 560, 205);
      this.context.fillText('🍍  Collect pineapples, stay healthy.', 560, 235);
      this.context.fillText('🌊  Lifes a wave, enjoy the ride!', 560, 265);
      this.context.fillStyle = 'black';
      this.context.font = '18px courier';
      this.context.fillText('PRESS SPACE TO START', 620, 320);
      this.context.strokeStyle = 'black';
      this.context.beginPath();
      this.context.rect(560, 295, 350, 40);
      this.context.stroke();
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - -> END GAME MENU < - - - - -
  paintEndGame() {
    if (this.running === false) {
      // MAIN BLOCK
      this.context.fillStyle = '#9cdaff';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // LEFT BLOCK
      this.context.fillStyle = '#bcff7c';
      this.context.fillRect(40, 70, 550, 280);
      this.context.fillStyle = 'white';
      this.context.fillRect(50, 50, 550, 290);
      this.context.fillStyle = 'black';
      this.context.font = '50px courier';
      this.context.fillText('That was gnarly!', 75, 120);
      this.context.fillStyle = 'black';
      this.context.font = '20px courier';
      this.context.fillText(
        '🏆 Surf legend! You rode for  ' +
          this.scoreboard.currentScore +
          ' seconds.',
        75,
        180
      );
      this.context.strokeStyle = 'black';
      this.context.beginPath();
      this.context.rect(420, 162, 140, 24);
      this.context.stroke();
      this.context.fillText(
        '🍍 Yum! You collected ' + this.pineappleCount + ' Pineapples.',
        75,
        220
      );
      this.context.beginPath();
      this.context.rect(330, 203, 175, 24);
      this.context.stroke();
      this.context.fillStyle = 'salmon';
      this.context.font = '30px courier';
      this.context.fillText('PRESS ENTER TO TRY AGAIN ↪️', 75, 290);
      this.context.strokeStyle = 'teal';
      // this.context.beginPath();
      // this.context.rect(75, 290, 355, 50);
      // this.context.stroke();

      // RIGHT BLOCK
      this.context.fillStyle = '#cd94ff';
      this.context.fillRect(650, 40, 285, 290);
      this.context.drawImage(this.image, 640, 50, 285, 290);
      this.endaudio.play();
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - -> KEYBOARD CONTROLS < - - - - -
  setKeyBindings() {
    window.addEventListener('keydown', event => {
      const key = event.keyCode;
      switch (key) {
        case 38: // UP DIRECTION
          this.player.speed -= 12;
          this.player.playerDirection = 'up';
          break;
        case 40: // DOWN DIRECTION
          this.player.speed += 17;
          this.player.playerDirection = 'down';
          break;
        case 32: // SPACE BAR
          if (this.running === false) {
            this.running = true;
            this.gameStarted = true;
            this.audio.play();
            this.loop();
          }
          break;
        case 13: // ENTER
          if (this.running === false) {
            this.resetEverything();
            this.running = true;
            this.gameStarted = true;
            this.audio.play();
            this.loop();
          }
          break;
      }
    });
  }

  // - - - - - - - - - - - - - - - - - - - - - -> OBSTACLE CREATION < - - - - -
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

  // - - - - - - - - - - - - - - - - - - - - - -> LOSE GAME LOGIC < - - - - -
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
        this.audio.pause();
        this.audio.currentTime = 0;
        this.lose();
      }
    }
  }

  checkSurfBail() {
    if (this.player.surfY + this.player.playerHeight > 420) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.lose();
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - -> POWER UP < - - - - -
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

  // - - - - - - - - - - - - - - - - - - - - - -> GAME ENGINE < - - - - -
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

  resetEverything() {
    this.player = new Surfer(this);
    this.kook = new Kook(this);
    this.pineapples = new Pineapples(this);
    this.scoreboard = new Scoreboard(this);
    this.kooks = [];
    this.pineapple = [];
    this.obstacleDelta = 1500;
    this.timer = 0;
    this.gameStarted = false;
    this.pineappleCount = 0;
    this.timerPineapple = 0;
    this.scoreboard.currentScore = 0;
  }

  paint(timestamp) {
    if (this.running === true) {
      this.wave.paint(timestamp);
      this.player.paint();
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
