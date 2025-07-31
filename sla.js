document.addEventListener('DOMContentLoaded', () => {
    const mimi = document.getElementById('mimi');
    const nightmare = document.getElementById('nightmare');
    const star = document.getElementById('star');
    const scoreDisplay = document.getElementById('score');
    const jumpCountDisplay = document.getElementById('jump-count');
    const starCountDisplay = document.getElementById('star-count');
    const gameOverDisplay = document.getElementById('game-over');
    const restartBtn = document.getElementById('restart-btn');
    const gameContainer = document.getElementById('game-container');
    const dreamClouds = document.getElementById('dream-clouds');

let isJumping = false;
let isGameOver = false;
let score = 0;
let jumpCount = 0;
let starCount = 0;
let gameSpeed = 3;
let gameInterval;
let starSpawnInterval;
let nightmareSpeed = gameSpeed;
    
    function createDreamClouds() {
        for (let i = 0; i < 10; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');
            
            const size = Math.random() * 100 + 50;
            cloud.style.width = `${size}px`;
            cloud.style.height = `${size}px`;
            
            cloud.style.left = `${Math.random() * 100}%`;
            cloud.style.top = `${Math.random() * 70}%`;
            
            cloud.style.opacity = Math.random() * 0.4 + 0.1;
            cloud.style.animation = `float ${Math.random() * 20 + 10}s linear infinite`;
            cloud.style.animationDelay = `${Math.random() * 5}s`;
            
            dreamClouds.appendChild(cloud);
        }
    }

    function startGame() {
        isGameOver = false;
        score = 0;
        jumpCount = 0;
        starCount = 0;
        gameSpeed = 3;
        
        mimi.style.bottom = '30px';
        nightmare.style.right = '-80px';
        star.style.right = '-40px';
        star.style.display = 'none';
        
        gameOverDisplay.style.display = 'none';
        restartBtn.style.display = 'none';
        
        updateScore();
        updateJumpCount();
        updateStarCount();
        
        nightmare.classList.add('nightmare-moving');
        nightmare.style.animationDuration = `${gameSpeed}s`;
        
        dreamClouds.innerHTML = '';
        createDreamClouds();
        
        clearInterval(gameInterval);
        clearInterval(starSpawnInterval);
        
        gameInterval = setInterval(updateGame, 20);
        starSpawnInterval = setInterval(trySpawnStar, 3000);
    }

    function updateGame() {
        if (isGameOver) return;
        
        score++;
        updateScore();
        
        checkCollisions();
        
        if (score % 500 === 0) {
            increaseDifficulty();
        }
    }

    function checkCollisions() {
        const mimiRect = mimi.getBoundingClientRect();
        const nightmareRect = nightmare.getBoundingClientRect();
        const starRect = star.getBoundingClientRect();
        
        if (
            mimiRect.right > nightmareRect.left + 10 &&
            mimiRect.left < nightmareRect.right - 10 &&
            mimiRect.bottom > nightmareRect.top &&
            !isJumping
        ) {
            gameOver();
        }
        
        if (
            star.style.display === 'block' &&
            mimiRect.right > starRect.left &&
            mimiRect.left < starRect.right &&
            mimiRect.bottom > starRect.top &&
            mimiRect.top < starRect.bottom
        ) {
            collectStar();
        }
    }

    function collectStar() {
        starCount++;
        updateStarCount();
        
        star.classList.remove('star-moving');
        star.classList.add('star-collected');
        
        setTimeout(() => {
            star.style.display = 'none';
            star.classList.remove('star-collected');
            star.style.right = '-40px';
        }, 500);
    }

    function trySpawnStar() {
        if (isGameOver || star.style.display === 'block') return;
        
        if (Math.random() > 0.5) {
            star.style.display = 'block';
            star.classList.add('star-moving');
            star.style.animationDuration = `${gameSpeed * 1.3}s`;
        }
    }

    function increaseDifficulty() {
        gameSpeed = Math.max(0.8, gameSpeed * 0.95);
        nightmare.style.animationDuration = `${gameSpeed}s`;
        
        if (star.style.display === 'block') {
            star.style.animationDuration = `${gameSpeed * 1.3}s`;
        }
    }

    function gameOver() {
        isGameOver = true;
        
        nightmare.classList.remove('nightmare-moving');
        star.classList.remove('star-moving');
        
        gameOverDisplay.style.display = 'block';
        restartBtn.style.display = 'block';
        
        clearInterval(gameInterval);
        clearInterval(starSpawnInterval);
    }

    function jump() {
        if (isJumping || isGameOver) return;
        
        isJumping = true;
        jumpCount++;
        updateJumpCount();
        
        mimi.classList.add('jumping');
        
        setTimeout(() => {
            mimi.classList.remove('jumping');
            isJumping = false;
        }, 600);
    }

    function updateScore() {
        scoreDisplay.textContent = `Tempo no sonho: ${Math.floor(score / 50)}`;
    }

    function updateJumpCount() {
        jumpCountDisplay.textContent = `Pulos: ${jumpCount}`;
    }

    function updateStarCount() {
        starCountDisplay.textContent = `Estrelas: ${starCount}`;
    }

    document.addEventListener('keydown', (e) => {
        if ((e.code === 'Space' || e.key === 'ArrowUp') && !isJumping && !isGameOver) {
            jump();
        }
    });

    gameContainer.addEventListener('touchstart', (e) => {
        if (!isJumping && !isGameOver) {
            jump();
            e.preventDefault();
        }
    });

    restartBtn.addEventListener('click', startGame);

    startGame();
});