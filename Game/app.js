const s = e => document.querySelectorAll(e),
    $ = e => s(e).length > 1 ? s(e) : document.querySelector(e);
const cont = $('.container'),
    diff = $('.difficulty');


function shuffle(array) {
    let arr = array
    let n = arr.length * 100;
    let r = ~~(Math.random() * arr.length);
    let element = 0;
    for (let i = 0; i < n; i++) {
        r = ~~(Math.random() * arr.length);
        element = arr.splice(r, 1)[0];
        arr.push(element);
    }
    return arr
}
$('#beginner').style.background = jColor.flatColors["sunflower"];
$('#easy').style.background = jColor.flatColors["orange"];
$('#medium').style.background = jColor.flatColors["carrot"];
$('#hard').style.background = jColor.flatColors["pumpkin"];
$('#insane').style.background = `rgb(113, 47, 3)`;

let boardGrid = [],
    validGrid = [],
    randomGrid = [],
    solvingGrid = [],
    moves = 0,
    time = 0,
    interv = 0,
    timeOut = 0,
    preSelected = {
        isSelected: false,
        item: 0
    };

window.onload = function () {
    diff.style.display = "grid";
    cont.style.display = "none"
}

function start() {
    diff.style.display = "none";
    cont.style.display = "grid";
    $('pre').style.transform = 'scale(1)';
}
function end(){
    $('.congrats p').textContent = `You have finished the challenge in ( ${time} ) second and with ( ${moves} ) moves`
    $('.container').style.display = 'none';
    $('.congrats').style.transform = 'scale(1)';
}
$('pre').addEventListener('click',function(){
    this.style.transform = 'scale(0)';
    cont.style.display = 'none';
    diff.style.display = 'grid';
    cont.innerHTML = '';
    boardGrid = [];
    solvingGrid = [];
    validGrid = [];
    randomGrid = [];
    moves = 0;
    time = 0;
    preSelected = { isSelected : false , item : 0 };
    clearTimeout(timeOut);
    clearInterval(interv);
})
$('.congrats span').addEventListener('click',function(){
    this.parentElement.style.transform = 'scale(0)';
    $('pre').style.transform = 'scale(0)';
    diff.style.display = 'grid';
    cont.innerHTML = '';
    boardGrid = [];
    solvingGrid = [];
    validGrid = [];
    randomGrid = [];
    moves = 0;
    time = 0;
    preSelected = { isSelected : false , item : 0 };
    clearInterval(interv);
})
function replace() {
    for (let block of $('.block:not(.static)')) {
        block.addEventListener('click', function () {
            if (!preSelected.isSelected) {
                preSelected.item = this;
                this.classList.add('selected');
                preSelected.isSelected = true;
            } else {
                if (preSelected.item == this) {
                    preSelected.item = undefined;
                    this.classList.remove('selected');
                    preSelected.isSelected = false;
                } else {
                    let prevColor = preSelected.item.getAttribute('data-color'),
                        thisColor = this.getAttribute('data-color');
                    this.style.background = prevColor;
                    preSelected.item.classList.remove('selected');
                    preSelected.item.style.background = thisColor;
                    this.setAttribute('data-color', prevColor);
                    preSelected.item.setAttribute('data-color', thisColor);
                    preSelected.isSelected = false;
                    preSelected.item = undefined;
                    moves++;
                }
            }
            check();
        })
    }

}

function check() {
    let checkGrid = [];
    for (let element of $('.block:not(.static)')) {
        checkGrid.push(element.getAttribute('data-color'));
    }
    if(checkGrid.toString()===solvingGrid.toString()){end()}
}

function create(difficult) {
    let rCol = [],
        lCol = [];
    if (boardGrid || randomGrid) {
        boardGrid = [];
        randomGrid = [];
    };
    cont.style.gridTemplateColumns = `repeat(${difficult},1fr)`;
    cont.style.gridTemplateRows = `repeat(${difficult},1fr)`;
    cont.classList.add('beginner');
    let topRight = jColor.random(),
        topLeft = topRight.isLight ? jColor.random("dark") : jColor.random("light"),
        bottomLeft = topLeft.isLight ? jColor.random("dark") : jColor.random("light"),
        bottomRight = bottomLeft.isLight ? jColor.random("dark") : jColor.random("light");
    for (let i = 0; i < difficult; i++) {
        let mixed = jColor.mix(topRight, bottomRight, difficult, i);
        rCol.push(jColor(mixed).toHEX);
    }
    for (let i = 0; i < difficult; i++) {
        let mixed = jColor.mix(topLeft, bottomLeft, difficult, i);
        lCol.push(jColor(mixed).toHEX);
    }
    for (let i = 0; i < difficult; i++) {
        for (let j = 0; j < difficult; j++) {
            boardGrid.push(jColor.mix(lCol[i], rCol[i], difficult, j));
        }
    }
    for (let square of boardGrid) {
        let block = document.createElement('div');
        block.classList.add('block');
        block.style.background = square;
        block.setAttribute('data-color', square);
        cont.appendChild(block);
    }
    timeOut = setTimeout(function () {
        randomGrid = shuffle(validGrid);
        for (let i = 0; i < randomGrid.length; i++) {
            $('.block:not(.static)')[i].style.background = randomGrid[i];
            $('.block:not(.static)')[i].setAttribute('data-color', randomGrid[i])
        }
        replace();
        interv = setInterval(function(){time++},1000);
    }, difficult * 550)
}
$('#beginner').addEventListener('click', beginner)
$('#easy').addEventListener('click', easy)
$('#medium').addEventListener('click', medium)
$('#hard').addEventListener('click', hard)
$('#insane').addEventListener('click', insane)
function beginner() {
    start();
    let n = 7;
    create(n);
    for (let i = 0; i < n; i++) {
        $('.block')[i].classList.add('static');
    }
    for (let i = n; i < n * (n - 1) + 1; i += n) {
        $('.block')[i].classList.add('static');
    }
    for (let i = n * n - n; i < n * n; i++) {
        $('.block')[i].classList.add('static');
    }
    for (let i = n - 1; i < n * n; i += n) {
        $('.block')[i].classList.add('static');
    }
    for (let block of $('.block:not(.static)')) {
        validGrid.push(block.getAttribute('data-color'));
        solvingGrid.push(block.getAttribute('data-color'));
    }
}

function easy() {
    start();
    let n = 9;
    create(n);
    for (let i = 0; i < n; i++) {
        $('.block')[i].classList.add('static');
    }
    for (let i = n; i < n * (n - 1) + 1; i += n) {
        $('.block')[i].classList.add('static');
    }
    for (let i = n * n - n; i < n * n; i++) {
        $('.block')[i].classList.add('static');
    }
    for (let i = n - 1; i < n * n; i += n) {
        $('.block')[i].classList.add('static');
    }
    for (let block of $('.block:not(.static)')) {
        validGrid.push(block.getAttribute('data-color'));
        solvingGrid.push(block.getAttribute('data-color'));
    }
}
function medium() {
    start();
    let n = 10;
    create(n);
    for (let i = 0; i < n; i++) {
        $('.block')[i].classList.add('static');
    }
    for (let i = n * n - n; i < n * n; i++) {
        $('.block')[i].classList.add('static');
    }
    for (let block of $('.block:not(.static)')) {
        validGrid.push(block.getAttribute('data-color'));
        solvingGrid.push(block.getAttribute('data-color'));
    }
}
function hard() {
    start();
    let n = 12;
    create(n);
    $('.block')[0].classList.add('static');
    for (let i = n; i < n * (n - 1) + 1; i += n) {
        $('.block')[i].classList.add('static');
    }
    for (let i = n - 1; i < n * n; i += n) {
        $('.block')[i].classList.add('static');
    }
    for (let block of $('.block:not(.static)')) {
        validGrid.push(block.getAttribute('data-color'));
        solvingGrid.push(block.getAttribute('data-color'));
    }
}
function insane() {
    start();
    let n = 14;
    create(n);
        $('.block')[0].classList.add('static');
        $('.block')[n-1].classList.add('static');
        $('.block')[n*(n-1)].classList.add('static');
        $('.block')[n*n-1].classList.add('static');
    for (let block of $('.block:not(.static)')) {
        validGrid.push(block.getAttribute('data-color'));
        solvingGrid.push(block.getAttribute('data-color'));
    }
}