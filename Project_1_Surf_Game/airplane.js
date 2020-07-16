class Airplane {
  constructor(canvas2, context2) {
    this.canvas2 = canvas2;
    this.context2 = context2;
    this.canvas2.width = canvas2.width;
    this.canvas2.height = canvas2.height;
    this.image = new Image();
    this.image.src = '/images/airplane.png';
    this.flyX = canvas2.width - 10;
  }

  paint() {
    this.context2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
    this.context2.drawImage(this.image, this.flyX, 20, 50, 50);
  }

  loop() {}
}

// this.image.addEventListener('load', () => {
// });
