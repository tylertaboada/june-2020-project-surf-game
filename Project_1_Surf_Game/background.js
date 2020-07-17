class Wave {
  constructor(game) {
    this.game = game;
    this.wave1 = new Image();
    this.wave1.src = '/images/wave1.png';
    this.wave2 = new Image();
    this.wave2.src = '/images/wave2.png';
    this.wave3 = new Image();
    this.wave3.src = '/images/wave3.png';
    this.wave4 = new Image();
    this.wave4.src = '/images/wave4.png';
    this.waves = [this.wave1, this.wave2, this.wave3, this.wave4];
    this.waveBackground = new Image();
    this.waveBackground.src = 'images/waveBackground.png';
    this.waveBackgroundX = 0;
    this.waveBackgroundArray = [];
    this.speed = 200;
    this.timer = 0;
    this.arrayIx = 0;
    this.x = 0;
  }

  runLogic() {}

  paint(timestamp) {
    if (this.timer < timestamp - this.speed) {
      //iterate through the arrray
      this.timer = timestamp;
      if (this.arrayIx === 3) {
        this.arrayIx = 0;
      } else {
        this.arrayIx++;
      }
    }
    /*this.x--;
    if (this.x === this.waveBackground.width) {
      this.x = this.x % this.waveBackground.width;
    }
    */
    const context = this.game.context;
    context.save();
    context.drawImage(
      this.waveBackground,
      this.x % this.waveBackground.width,
      0,
      1000,
      400
    );

    context.drawImage(this.waves[this.arrayIx], 0, 0, 300, 370);
    context.restore();
  }

  update() {
    this.paint();
  }
}
