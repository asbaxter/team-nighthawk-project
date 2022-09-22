export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 24;
    this.fontFamily = "Nosifer";
    this.livesImage = document.getElementById("lives");
    this.restartButton = document.getElementById("restart");
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 0.5;
    context.shadowOffsetY = 0.5;
    context.shadowColor = "red";
    context.shadowBlur = 0;
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    //score
    context.fillText("Score: " + this.game.score, 20, 50);
    // timer
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);
    // lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 30 * i + 20, 95, 25, 25);
    }
    // game over messages
    if (this.game.gameover) {
      context.textAlign = "center";
      context.font = this.fontSize * 1 + "px " + this.fontFamily;
      if (this.game.score > 50) {
        context.fillText(
          "Good Game! Press 'Escape' or 'Swipe Up' to play again!",
          this.game.width * 0.5,
          this.game.height * 0.95
        );
      } else {
        context.fillText(
          "Fail!! Press 'Escape' or 'Swipe Up' to play again!",
          this.game.width * 0.5,
          this.game.height * 0.95
        );
      }
    }
    context.restore();
  }
}
