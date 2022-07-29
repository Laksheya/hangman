const WIDTH = "400";
const HEIGHT = "400";
const COUNTRIES = [
"INDIA",
"UNITED STATES OF AMERICA",
"RUSSIA",
"UNITED ARAB EMIRATES",
"UNITED KINGDOM",
"CHINA",
"JAPAN",
"VATICAN CITY",
"GERMANY",
"AUSTRALIA",
"PORTUGAL",
"SOUTH AFRICA",
"SPAIN"
];
const QUESTIONS = [
"It got succeed mars mission on very first attempt", 
"World's most powerful country",
"World's biggest transcontinental country",
"It has world's tallest building",
"It ruled India",
"COVID-19 started from this nation",
"USA detonated nuclear bomb on it's two cities during WW2",
"Smallest country by land",
"Adolf Hitler belongs to this country",
"It's national animal is Kangaroo",
"Cristiano Ronaldo belongs to this country",
"The only country having three capital cities",
"It's national game is bullfighting"
];

let currentCountry = -1;

let canvas = document.getElementById('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let ctx = canvas.getContext('2d');
ctx.lineWidth = 5;
ctx.strokeStyle = '#2a2a2a';

let lives = 10;
let isEnded = false;

let letters = document.getElementById('letters').querySelectorAll('td');
let spc = document.getElementById('space-box');
let cvr = document.getElementById('cover');

let clicked = [];

function createSpacesAndQTag() {
    let index = Math.floor(Math.random() * COUNTRIES.length);
    currentCountry = index; 
    document.getElementById('que').innerText = QUESTIONS[index];
    let country = COUNTRIES[index].split(' ');
    let html = "";
    for (let i = 0; i < country.length; i++) {
        html += "<tr>";
        for (let j = 0; j < country[i].length; j++) {
            html += `<td></td>`;
        }
        html += "</tr>";
    }
    spc.innerHTML = html;
}

function hasAlreadyClicked(el) {
    for (let i = 0; i < clicked.length; i++) {
        if (el.innerText == clicked[i]) {
            return true;
        }
    }
    return false;
}

function hoverEffect() {
    letters.forEach(el => {
        el.addEventListener('mouseover', () => {
            if (!hasAlreadyClicked(el) && !isEnded) {
                el.style.backgroundColor = '#ddd';
                el.style.fontSize = '20px';
                el.style.width = '46px';
                el.style.height = '46px';
                el.style.margin = '-3px 7px -3px -3px';
                el.style.color = '#2e2e2e';
            }
        })
        el.addEventListener('mouseleave', () => {
            if (!hasAlreadyClicked(el) && !isEnded) {
                el.style.backgroundColor = '#c45ef0';
                el.style.fontSize = '16px';
                el.style.width = '40px';
                el.style.height = '40px';
                el.style.margin = '0px 10px 0px 0px';
                el.style.color = '#ffffffea';
            }
        })
    })
}

function isLetterPresent(letter) {
    let country = COUNTRIES[currentCountry];
    for (let i = 0; i < country.length; i++) {
        if (letter == country.charAt(i)) {
            return true;
        }
    }
    return false;
}

function makeVisible(letter) {
    let country = COUNTRIES[currentCountry];
    let q = spc.querySelectorAll('td');
    let i = 0;
    country.split('').forEach(el => {
        if (el != ' ') {
            if (el == letter) {
                q[i].innerText = el;
            }
            i++;
        }
    })
}

function draw() {
    switch (lives) {
        case 9:
            ctx.beginPath();
            ctx.moveTo(50, 330);
            ctx.lineTo(300, 330);
            ctx.stroke();
            break;
        case 8:
            ctx.beginPath();
            ctx.moveTo(80, 330);
            ctx.lineTo(80, 80);
            ctx.stroke();
            break;
        case 7:
            ctx.beginPath();
            ctx.moveTo(80, 83);
            ctx.lineTo(200, 83);
            ctx.stroke();
            break;
        case 6:
            ctx.beginPath();
            ctx.moveTo(198, 81);
            ctx.lineTo(198, 125);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.arc(198, 145, 20, 3 / 2 * Math.PI, 3 / 2 * Math.PI + 2 * Math.PI);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(198, 165);
            ctx.lineTo(198, 220);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(198, 220);
            ctx.lineTo(175, 260);
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(198, 220);
            ctx.lineTo(220, 260);
            ctx.stroke();
            break;
        case 1:
            ctx.beginPath();
            ctx.moveTo(198, 180);
            ctx.lineTo(170, 200);
            ctx.stroke();
            break;
        case 0:
            ctx.beginPath();
            ctx.moveTo(198, 180);
            ctx.lineTo(228, 200);
            ctx.stroke();
            break;
        default:
            break;
    }
}

function displayLives() {
    let lifeBox = document.getElementById('lives');
    let html = `<p>Your Lives</p><h2>${lives}</h2>`;
    lifeBox.innerHTML = html;
}

function gameplay() {
    letters.forEach(el => {
        el.addEventListener('click', () => {
            if (!hasAlreadyClicked(el) && !isEnded) {
                if (isLetterPresent(el.innerText)) {
                    makeVisible(el.innerText);
                } else {
                    lives--;
                    draw();
                    displayLives();
                }
                checkEnd();
                clicked.push(el.innerText);
            }
        })
    });
}

function areAllFilled() {
    let q = spc.querySelectorAll('td');
    for (let i = 0; i < q.length; i++) {
        if (q[i].innerText == '') {
            return false;
        }
    }
    return true;
}

function declare() {
    let p = document.getElementById('quote');
    if (lives == 0) {
        p.innerHTML = `You lose!<br>Its ${COUNTRIES[currentCountry]}`;
        p.style.color = '#ea2020';
        cvr.style.backgroundColor = '#f4a3a3';
    } else {
        p.innerHTML = `You got it right!<br>Its ${COUNTRIES[currentCountry]}`;
        p.style.color = '#4b811e';
        cvr.style.backgroundColor = '#9dcaa3';
    }
    cvr.style.visibility = 'visible';
}

function checkEnd() {
    if (lives == 0 || areAllFilled()) {
        isEnded = true;
    }
    if (isEnded) {
        declare();
    }
}


function newGame() {
    cvr.style.visibility = 'hidden';
    clicked = [];
    lives = 10;
    isEnded = false;
    letters.forEach(el => {
        el.style.backgroundColor = '#c45ef0';
        el.style.color = '#ffffffea';
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayLives();
    startGame();
}

function startGame() {
    hoverEffect();
    createSpacesAndQTag();
    gameplay();
}

startGame();