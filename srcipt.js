const sonic = document.querySelector('.sonic');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event){
    if (event.keyCode === 32){
        if (!isJumping){        
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            
            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else {
                    position -= 20;
                    sonic.style.bottom = position + 'px';
                }
            }, 20);
        }else {
            //subindo
            position += 20;
            sonic.style.bottom = position + 'px';
        }
    }, 20);
}

function createRobotnic() {
    const robotnic = document.createElement('div');
    let robotnicPosition = 1000;
    let randomTime = Math.random() * 6000;

    robotnic.classList.add('robotnic');
    robotnic.style.left = 1000 + 'px';
    background.appendChild(robotnic);

    let leftInterval = setInterval(() => {
        if (robotnicPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(robotnic);
        }else if (robotnicPosition > 0 && robotnicPosition < 60 && position < 60){
            //Game Over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
        }else {
        robotnicPosition -=10;
        robotnic.style.left = robotnicPosition + 'px';
        }        robotnic
    }, 20);
    setTimeout(createRobotnic, randomTime);
}
       
createRobotnic();
document.addEventListener('keyup', handleKeyUp);