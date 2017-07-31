(function app() {

    let vanioSpeed = 6;
    let beerSpeed = 1;
    let time = 30;
    let resources = 2;
    let theBigBadVanio = document.getElementById('vanio');
    theBigBadVanio.onload = onResourceLoad;
    let theBeer = document.getElementById('beer');
    theBeer.onload = onResourceLoad;
    let gameOver = document.getElementById('gameover');
    gameOver.onload = onResourceLoad;


    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.font = '24px monospace';
    ctx.textBaseline = 'top';

    window.addEventListener('keydown', keyboardHandler);
    window.addEventListener('keyup', keyboardHandler);
    let keyPressed = {};

    function keyboardHandler(event) {
        if (event.type === 'keydown') {
            keyPressed[event.code] = true;
        } else {
            delete keyPressed[event.code];
        }
    }

    let vanio = {x: 725, y: 340};
    let beer = {x: 100, y: 100, dirX: true, dirY: true};
    let score = 0;

    function main() {
        for (let key in keyPressed) {
            switch (key) {
                case "ArrowLeft":
                    vanio.x -= vanioSpeed;
                    break;
                case "ArrowRight":
                    vanio.x += vanioSpeed;
                    break;
                case "ArrowUp":
                    vanio.y -= vanioSpeed;
                    break;
                case 'ArrowDown':
                    vanio.y += vanioSpeed;
                    break;
            }

        }

        //Beer move
        beerMove();
        detectCollision();

        draw();

        requestAnimationFrame(main);

    }

    function draw() {
        ctx.clearRect(0, 0, 1450, 680);
        ctx.drawImage(theBigBadVanio, vanio.x - theBigBadVanio.width / 2, vanio.y - theBigBadVanio.height / 2, 180, 250);
        ctx.drawImage(theBeer, beer.x - theBeer.width / 2, beer.y - theBeer.height / 2);
        ctx.fillText(`Бирички ${score}`, 25, 25);
        ctx.fillText(`Скорост ${beerSpeed}`, 25, 50);
        ctx.fillText(`Време 0:${time}`, 1250, 25);
        setTimeout(() => {
            if (score < 30) {
                theBigBadVanio = document.getElementById('lose');
                beerSpeed = 0;
                vanioSpeed = 0;
            }
        }, 30000);
    }

    function beerMove() {
        if (beer.dirX) {
            beer.x += beerSpeed;
            if (beer.x >= 1405) {
                beer.dirX = false;
            }
        } else {
            beer.x -= beerSpeed;
            if (beer.x <= 45) {
                beer.dirX = true;
            }
        }
        if (beer.dirY) {
            beer.y += beerSpeed;
            if (beer.y >= 635) {
                beer.dirY = false;
            }
        } else {
            beer.y -= beerSpeed;
            if (beer.y <= 45) {
                beer.dirY = true;
            }
        }
        if (vanio.x >= 1300) {
            theBigBadVanio = document.getElementById('vanio');
        } else if (vanio.x <= 100) {
            theBigBadVanio = document.getElementById('mirrorVanio');
        }
    }

    function detectCollision() {
        let distance = Math.sqrt((vanio.x - beer.x) ** 2 + (vanio.y - beer.y) ** 2);
        if (distance < 60) {
            score++;
            let modifier = Math.ceil(score / 3);
            if (beerSpeed < modifier) {
                beerSpeed++;

            }
            beer.x = Math.random() * 1450;
            beer.y = Math.random() * 680;
        }
    }

    function onResourceLoad() {
        resources--;

        if (resources === 0) {
            main()
        }
    }


    let timer = setInterval(function () {
        time--;
        if (time === 0) {
            clearInterval(timer);
        }
    }, 1000);

    main();
})();
function restart() {
    window.location.reload();
}