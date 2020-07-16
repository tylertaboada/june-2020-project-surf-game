window.addEventListener('load', () => {
  const canvas = document.getElementById('mainCanvas');
  const context = canvas.getContext('2d');
  const game = new Game(canvas, context);
  game.paintStartScreen();

  const canvas2 = document.getElementById('topCanvas');
  const context2 = canvas2.getContext('2d');
  const airplane = new Airplane(canvas2, context2);
  airplane.paint();
});

// GAME AUDIO
// var audio = new Audio('sound/The XXIntro HQ.mp3');
// audio.play();
