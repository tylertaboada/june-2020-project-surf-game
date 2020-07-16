// class Wave {
//   constructor(game) {
//     this.game = game;
//     this.wave1 = new Image();
//     this.wave1.src = '/images/wave1.png';
//     this.wave2 = new Image();
//     this.wave2.src = '/images/wave2.png';
//     this.wave3 = new Image();
//     this.wave3.src = '/images/wave3.png';
//     this.wave4 = new Image();
//     this.wave4.src = '/images/wave4.png';
//     this.speed = 0;
//   }

//   runLogic() {}

//   paint() {
//     const context = this.game.context;
//     context.save();
//     context.drawImage(this.wave1, 0, 0, 200, 300);
//     console.log('drawing');
//     context.restore();
//   }

//   update() {
//     this.paint();
//   }
// }
