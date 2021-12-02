const button = document.querySelector('button');
const names = document.getElementsByClassName('names');
let bail = document.getElementById('bail');
let leia = document.getElementById('leia');
let raymus = document.getElementById('raymus');
const rainbow = document.getElementById('rainbow');

// handle api stuff

let buttonPushed = false;

const buttonHandler = () => {
    if (buttonPushed) {
        while (names[0]) {
            names[0].parentNode.removeChild(names[0]);
        }
        buttonPushed = false;
    } else {
        axios.get('https://swapi.dev/api/planets/?search=alderaan')
        .then((req, res) => {
            let residents = req.data.results[0].residents;
            for (let i = 0; i < residents.length; i++) {
                axios.get(residents[i])
                .then((req, res) => {
                    let name = req.data.name;
                    let element = document.createElement('h2');
                    element.textContent = name;
                    element.classList.add("names");
                    if (name === 'Bail Prestor Organa') {
                        element.id = 'bail';
                        document.body.appendChild(element);
                        bail = document.getElementById('bail');
                        bail.addEventListener('mouseover', playBail);
                        bail.addEventListener('mouseout', stopAudio);
                    } else if (name === 'Leia Organa') {
                        element.id = 'leia';
                        document.body.appendChild(element);
                        leia = document.getElementById('leia');
                        leia.addEventListener('mouseover', playLeia);
                        leia.addEventListener('mouseout', stopAudio);
                    } else if (name === 'Raymus Antilles') {
                        element.id = 'raymus';
                        document.body.appendChild(element);
                        raymus = document.getElementById('raymus');
                        raymus.addEventListener('mouseover', playRaymus);
                        raymus.addEventListener('mouseout', stopAudio);
                    }
                })
            }
        })
        buttonPushed = true;
    }
}

button.addEventListener('click', buttonHandler);

// hover play music

var bailAudio = new Audio('bail_prestor_organa.mp3');
var leiaAudio = new Audio('leia_organa.mp3');
var raymusAudio = new Audio('raymus_antilles.mp3');

const playBail = () => {
    bailAudio.play();
}

const playLeia = () => {
    leiaAudio.play();
}

const playRaymus = () => {
    raymusAudio.play();
}

const stopAudio = () => {
    bailAudio.pause();
    bailAudio.currentTime = 0;
    leiaAudio.pause();
    leiaAudio.currentTime = 0; 
    raymusAudio.pause();
    raymusAudio.currentTime = 0;  
}

// random color background changer

// stolen from https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}
// end of stolen code

let colorArr = [];

for (let i = 0; i < 100; i++){
    colorArr.push(random_rgba());
}

let j = 0;

let colorInterval = setInterval(() => {
    if (j === 99) {
        j = 0;
    }
    document.body.style.backgroundColor = colorArr[j];
    j++;
}, 1000)

// stolen again below ! https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
function getNeonColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (85 + 10 * Math.random()) + '%)'
}
// end

const head = document.querySelector('h1')

let neonColorArr = [];

for (let k = 0; k < 100; k++){
    neonColorArr.push(getNeonColor());
}

let l = 0;

let neonInterval = setInterval(() => {
    if (l === 99) {
        l = 0;
    }
    head.style.color = neonColorArr[l];
    l++;
}, 1000)

let rainbowOn = true;

const turnOffRainbow = (e) => {
    clearInterval(neonInterval);
    clearInterval(colorInterval);
}

rainbow.addEventListener('click', turnOffRainbow)