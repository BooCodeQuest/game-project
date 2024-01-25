class Game {
    constructor() {
        // Initializing game properties, UI elements, and sounds
        this.state = "splash"; // Game states: splash, game, gameover
        this.score = 0;
        this.fly = document.createElement("img");
        this.fly.setAttribute("class", "fly");
        this.fly.setAttribute("src", "./assets/images/fly.png");
        this.bloodSpot = document.querySelector(".bloodSpot");
        this.startBtn = document.querySelector(".startBtn");
        this.container = document.querySelector(".container");
        this.cursor = document.querySelector(".cursor");
        this.gameOverScreen = document.querySelector(".game-over-screen");
        this.gameTimer = null;
        this.startMusic = document.getElementById("startMusic");
        this.gameMusic = document.getElementById("gameMusic");
        this.splashSound = document.getElementById("splashSound");

        // Setting up event listeners for game interactions
        this.initEventListeners();
    }

    initEventListeners() {
        // Event listeners for starting the game and handling mouse interactions
        document.body.addEventListener("click", () => {
            this.startMusic.play().catch(e => console.error("Start music play failed:", e));
        }, { once: true });

        this.startBtn.addEventListener("click", () => this.startGame());
        this.gameOverScreen.querySelector(".restartBtn").addEventListener("click", () => this.restartGame());
        window.addEventListener("click", (e) => this.handleWindowClick(e));
        window.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    }

    startGame() {
        // Starts the game: sets up the game environment, music, and UI elements
        if (this.state !== "splash") return;

        this.startMusic.pause();
        this.gameMusic.play().catch(e => console.error("Game music play failed:", e));
        this.state = "game";
        this.score = 0;
        this.updateScoreDisplay();
        document.querySelector(".splash-screen").style.display = "none";
        this.container.style.display = "block";
        this.container.appendChild(this.fly);
        this.container.querySelector('.score-display').style.display = 'block';
        this.movefly();
        this.startTimer();
        this.container.style.cursor = "none";
    }

    gameOver() {
        // Handles the game over state: stops the game and shows the final score
        this.state = "gameover";
        this.container.style.display = "none";
        this.gameOverScreen.style.display = "flex";
        clearInterval(this.gameTimer);
        document.querySelector('.final-score-display').innerText = "Final Score: " + this.score;
        document.querySelector('.final-score-display').style.display = 'block';
        this.container.style.cursor = "auto";
        this.gameMusic.pause();
    }

    restartGame() {
        // Resets the game to its initial state
        if (this.state !== "gameover") return;
        this.state = "splash";
        this.score = 0;
        this.updateScoreDisplay();
        this.gameOverScreen.style.display = "none";
        document.querySelector(".splash-screen").style.display = "flex";
        this.gameMusic.pause();
    }

    updateScoreDisplay() {
        // Updates the score display during the game
        this.container.querySelector('.score-display').innerText = "Score: " + this.score;
    }

    handleWindowClick(e) {
        // Manages the scoring and interactions during the game
        if (this.state !== "game") return;

        this.bloodSpot.style.top = e.pageY + "px";
        this.bloodSpot.style.left = e.pageX + "px";

        if (e.target === this.fly) {
            this.score++;
            this.updateScoreDisplay();
            this.splashSound.currentTime = 0;
            this.splashSound.play();
        }
    }

    handleMouseMove(e) {
        // Moves the custom cursor according to the mouse movement
        this.cursor.style.top = e.pageY + "px";
        this.cursor.style.left = e.pageX + "px";
    }

    movefly() {
        // Randomly moves the fly around the game container
        setInterval(() => {
            if (this.state !== "game") return;

            const contHeight = this.container.offsetHeight;
            const contWidth = this.container.offsetWidth;
            const randTop = Math.random() * (contHeight - 100);
            const randLeft = Math.random() * (contWidth - 100);

            this.fly.style.position = "absolute";
            this.fly.style.top = randTop + "px";
            this.fly.style.left = randLeft + "px";
        }, 1000);
    }

    startTimer() {
        // Starts a timer for the game duration
        this.gameTimer = setTimeout(() => {
            this.gameOver();
        }, 25000);
    }
}

const game = new Game(); // Instantiation of the Game class
