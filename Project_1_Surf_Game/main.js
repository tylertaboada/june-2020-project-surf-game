window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  const game = new Game(canvas, context);
  game.paintStartScreen();
});

// GAME AUDIO
// var audio = new Audio('sound/The XXIntro HQ.mp3');
// audio.play();
