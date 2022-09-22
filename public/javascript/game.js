import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 500;
  const fullScreenButton = document.getElementById("fullScreenButton");

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 57.5;
      this.speed = 0;
      this.maxSpeed = 1.5;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.enemyTimer = 0;
      this.enemyInterval = 500;
      this.debug = false;
      this.score = 0;
      this.fontColor = "rgb(0,0,0)";
      this.time = 0;
      this.maxTime = 200000;
      this.gameover = false;
      this.lives = 3;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameover = true;
      else if (this.lives <= 0) this.gameover = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handleEnemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion)
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });
      // handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) this.particles.splice(index, 1);
      });
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      // handle collision sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
        if (collision.markedForDeletion) this.collisions.splice(index, 1);
      });
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
    async postScore() {
      const highscore = this.score;

      const response = await fetch("/api/scores", {
        method: "POST",
        body: JSON.stringify({
          highscore,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("hello");
      } else {
        alert(response.statusText);
      }
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameover) {
      requestAnimationFrame(animate);
    } else if (game.gameover) {
      game.postScore();
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch((err) => {
        alert(`Error, can't enable full-screen mode: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  fullScreenButton.addEventListener("click", toggleFullscreen);

  animate(0);
});
