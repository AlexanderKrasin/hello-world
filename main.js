let appElem = document.querySelector('.app');
let appTitleElem = document.querySelector('.app-title');

const ANIMATION_SPEED_COEFF = 0.005;
const COLOR_MIN_VAL = 100;
const COLOR_MAX_VAL = 200;

let r = COLOR_MIN_VAL;
let g = COLOR_MIN_VAL;
let b = COLOR_MIN_VAL;
let signR = 1;
let signG = 1;
let signB = 1;
let prevTime = 0;


let makeColor = (r, g, b) => {
    let resR = Math.round(r);
    let resG = Math.round(g);
    let resB = Math.round(b);

    return `rgb(${resR}, ${resG}, ${resB})`;
};

let makeComplementaryColor = (r, g, b) => {
    let resR = (255 - Math.round(r));
    let resG = (255 - Math.round(g));
    let resB = (255 - Math.round(b));

    return `rgb(${resR}, ${resG}, ${resB})`;
};


let update = (timestamp) => {
    let diffTime = Math.round(timestamp - prevTime);
    prevTime = timestamp;

    if (Number.isNaN(diffTime)) {
        return;
    }

    let m = (diffTime * ANIMATION_SPEED_COEFF);

    r += (1 * m * signR);
    g += (2 * m * signG);
    b += (3 * m * signB);

    if ((r < COLOR_MIN_VAL) || (r > COLOR_MAX_VAL)) {
        signR *= (-1);
    }

    if ((g < COLOR_MIN_VAL) || (g > COLOR_MAX_VAL)) {
        signG *= (-1);
    }

    if ((b < COLOR_MIN_VAL) || (b > COLOR_MAX_VAL)) {
        signB *= (-1);
    }
};

let render = () => {
    appElem.style.backgroundColor = makeComplementaryColor(r, g, b);
    appTitleElem.style.color = makeColor(r, g, b);
};


let mainLoop = (timestamp) => {
    update(timestamp);
    render();

    window.requestAnimationFrame(mainLoop);
};

let init = () => {
    mainLoop();
};


init();
