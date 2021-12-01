const button = document.querySelector('button');

const buttonHandler = () => {
    axios.get('https://swapi.dev/api/planets/?search=alderaan')
    .then((req, res) => {
        let residents = req.data.results[0].residents;
        for (let i = 0; i < residents.length; i++) {
            axios.get(residents[i])
            .then((req, res) => {
                let name = req.data.name;
                let element = document.createElement('h2');
                element.textContent = name;
                document.body.appendChild(element);
            })
        }
    })
}

button.addEventListener('click', buttonHandler);

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

setInterval(() => {
    if (j === 99) {
        j = 0;
    }
    document.body.style.backgroundColor = colorArr[j];
    j++
}, 1000)