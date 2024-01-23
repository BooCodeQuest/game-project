class Game {
    constructor() {
        this.state = "splash"; // splash, game, gameover
        this.score = 0;
        this.terrorist = document.createElement("img");
        this.terrorist.setAttribute("class", "terrorist");
        this.terrorist.setAttribute("src", "./images/terrorist.png");
        this.bloodSpot = document.querySelector(".bloodSpot");
        this.startBtn = document.querySelector(".startBtn");
        this.container = document.querySelector(".container");
        this.cursor = document.querySelector(".cursor");
        this.gameOverScreen = document.querySelector(".game-over-screen");
        this.gameTimer = null;
        this.initEventListeners();
        this.startMusic = document.getElementById("startMusic");
        this.gameMusic = document.getElementById("gameMusic");
        this.splashSound = document.getElementById("splashSound");
    }

    initEventListeners() {
        this.startBtn.addEventListener("click", () => this.startGame());
        this.gameOverScreen.querySelector(".restartBtn").addEventListener("click", () => this.restartGame());
        window.addEventListener("click", (e) => this.handleWindowClick(e));
        window.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    }

    startGame() {
        if (this.state !== "splash") return;

        this.state = "game";
        this.score = 0;
        this.updateScoreDisplay();
        document.querySelector(".splash-screen").style.display = "none";
        this.container.style.display = "block";
        this.container.appendChild(this.terrorist);
        this.container.querySelector('.score-display').style.display = 'block'; // Show score display
        this.moveTerrorist();
        this.startTimer();
        this.container.style.cursor = "none"; // Hide the default cursor
        this.startMusic.pause();
        this.gameMusic.play();
    }

    gameOver() {
        this.state = "gameover";
        this.container.style.display = "none";
        this.gameOverScreen.style.display = "flex";
        clearInterval(this.gameTimer);
        document.querySelector('.final-score-display').innerText = "Final Score: " + this.score;
        document.querySelector('.final-score-display').style.display = 'block'; // Show final score
        this.container.style.cursor = "auto"; // Show the default cursor
    }

    restartGame() {
        if (this.state !== "gameover") return;
        this.state = "splash";
        this.score = 0;
        this.updateScoreDisplay();
        this.gameOverScreen.style.display = "none";
        document.querySelector(".splash-screen").style.display = "flex";
        this.gameMusic.pause();
        this.startMusic.play();
    }

    updateScoreDisplay() {
        this.container.querySelector('.score-display').innerText = "Score: " + this.score;
    }

    handleWindowClick(e) {
        if (this.state !== "game") return;

        this.bloodSpot.style.top = e.pageY + "px";
        this.bloodSpot.style.left = e.pageX + "px";

        if (e.target === this.terrorist) {
            this.score++;
            this.updateScoreDisplay();
            this.splashSound.currentTime = 0; // Reset the sound
            this.splashSound.play(); // Play the splash sound
        }
    }

    handleMouseMove(e) {
        this.cursor.style.top = e.pageY + "px";
        this.cursor.style.left = e.pageX + "px";
    }

    moveTerrorist() {
        setInterval(() => {
            if (this.state !== "game") return;

            const contHeight = this.container.offsetHeight;
            const contWidth = this.container.offsetWidth;
            const randTop = Math.random() * (contHeight - 100);
            const randLeft = Math.random() * (contWidth - 100);

            this.terrorist.style.position = "absolute";
            this.terrorist.style.top = randTop + "px";
            this.terrorist.style.left = randLeft + "px";
        }, 1000);
    }

    startTimer() {
        this.gameTimer = setTimeout(() => {
            this.gameOver();
        }, 25000); // 25 seconds
    }
}

const game = new Game();
