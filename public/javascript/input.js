export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.touchY = "";
    this.touchX = "";
    this.touchTreshold = 30;
    // keyboard keymapping
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === " ") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      } else if (e.key === "d") this.game.debug = !this.game.debug;
      else if (e.key === "Escape") location.reload();
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === " "
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });

    // mobile keymapping
    window.addEventListener("touchstart", (e) => {
      this.touchY = e.changedTouches[0].pageY;
      this.touchX = e.changedTouches[0].pageX;
    });
    window.addEventListener("touchmove", (e) => {
      const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
      const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
      if (
        swipeDistanceY < -this.touchTreshold &&
        this.keys.indexOf("swipe up") === -1
      ) {
        this.keys.push("swipe up");
        console.log("up");
        if (this.game.gameover) {
          window.location.reload();
        }
      } else if (
        swipeDistanceY > this.touchTreshold &&
        this.keys.indexOf("swipe down") === -1
      ) {
        this.keys.push("swipe down");
        console.log("down");
      } else if (
        swipeDistanceX > this.touchTreshold &&
        this.keys.indexOf("swipe right") === -1
      ) {
        this.keys.push("swipe right");
        console.log("right");
      } else if (
        swipeDistanceX < -this.touchTreshold &&
        this.keys.indexOf("swipe left") === -1
      ) {
        this.keys.push("swipe left");
        console.log("left");
      }
    });
    window.addEventListener("touchend", (e) => {
      this.keys.splice(this.keys.indexOf("swipe up"), 1);
      this.keys.splice(this.keys.indexOf("swipe down"), 1);
      this.keys.splice(this.keys.indexOf("swipe right"), 1);
      this.keys.splice(this.keys.indexOf("swipe left"), 1);
    });
  }
}
