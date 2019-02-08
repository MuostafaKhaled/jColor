const $ = function (element) {
    return document.getElementById(element);
}
Element.prototype.on = function (event, func) {
    return this.addEventListener(event, func)
}
var input = $('enter'),
    cName = $('name'),
    hex = $('hex'),
    rgb = $('rgb'),
    hwb = $('hwb'),
    hsl = $('hsl'),
    hsv = $('hsv'),
    cmyk = $('cmyk'),
    copy_ = $('copy'),
    rand = $('rand'),
    bgColor = $('bgColor'),
    bg = $('colorBackground'),
    mainPage = $('main'),
    mainPage2 = $('main2'),
    gPage = $('gradient'),
    mixerPage = $('mixer')
mainBtn = $('mainPage'),
    gBtn = $('gradientPage'),
    flatBtn = $('flatPage'),
    flatPage = $('flatColors'),
    mixerBtn = $('mixerPage');

input.on('keyup', () => {
    setValues(input.value)
});


window.addEventListener('load', () => {
    load();
    setValues(input.value);
});

copy_.on('click', () => {
    copy(hex.textContent)
})

rand.on('click', () => {
    randomColor()
})
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 32) {
        e.preventDefault();
        randomColor();
    }
})
mainBtn.on('click', () => {
    mainPage.style.display = 'flex';
    mainPage2.style.display = 'flex';
    gPage.style.display = 'none';
    mixerPage.style.display = 'none';
    flatPage.style.display = 'none';
})
gBtn.on('click', () => {
    mainPage.style.display = 'none';
    mainPage2.style.display = 'none';
    gPage.style.display = 'flex';
    mixerPage.style.display = 'none';
    flatPage.style.display = 'none';
})
mixerBtn.on('click', () => {
    mainPage.style.display = 'none';
    mainPage2.style.display = 'none';
    gPage.style.display = 'none';
    mixerPage.style.display = 'flex';
    flatPage.style.display = 'none';
})
flatBtn.on('click', () => {
    mainPage.style.display = 'none';
    mainPage2.style.display = 'none';
    gPage.style.display = 'none';
    mixerPage.style.display = 'none';
    flatPage.style.display = 'flex';
})
window.addEventListener('mousemove', (e) => {
    if (e.clientY <= 30) {
        document.querySelector('nav').classList.add('slide-nav');
    } else {
        document.querySelector('nav').classList.remove('slide-nav');
    }
})

function randomColor() {
    input.value = jColor.random().toRGB;
    setValues(input.value);
    fromRgb();
    grd();
}

function copy(text) {
    let a = document.createElement('input');
    document.body.appendChild(a);
    a.value = text;
    a.select();
    document.execCommand('copy');
    document.body.removeChild(a);
}

function changeNavColors() {
    document.body.style.setProperty('--tab', rgb.textContent);
    if (jColor(rgb.textContent).isLight) {
        document.body.style.setProperty('--tabtext', 'black');
    } else {
        document.body.style.setProperty('--tabtext', 'white');
    }
}

function fromRgb() {
    cmyk.textContent = jColor(input.value).toCMYK;
    hsl.textContent = jColor(input.value).toHSL;
    hwb.textContent = jColor(input.value).toHWB;
    hsv.textContent = jColor(input.value).toHSV;
    hex.textContent = jColor(input.value).toHEX;
    rgb.textContent = input.value;
    colorTable(rgb.textContent)
    colorTable2(rgb.textContent)
    colorTable3(rgb.textContent)
    colorTable4(rgb.textContent)
    bgColor.textContent = hex.textContent;
    document.body.style.setProperty('--backgroundColor', rgb.textContent);
    let cName_ = input.value;
    for (let a in jColor('').olorNames) {
        if ('#' + jColor('').colorNames[a] == jColor(cName_).toHEX.toLowerCase()) {
            cName.textContent = a[0].toUpperCase() + a.substr(1, a.length)
            break;
        } else {
            cName.textContent = ' Not Found '
        }
    }
    var textColor = window.getComputedStyle(bg, null).getPropertyValue('background-color');
    var r = textColor[1],
        g = textColor[2],
        b = textColor[3];
    bgColor.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    copy_.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    rand.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    changeNavColors();
}

function load(c) {
    input.value = window.getComputedStyle(bg, null).getPropertyValue('background-color');
    colorTable(input.value);
    colorTable2(rgb.textContent)
    colorTable3(rgb.textContent)
    colorTable4(rgb.textContent)
    fromRgb();
}

function setValues(val = undefined) {
    if (val) {
        c = jColor(val)
    } else {
        c = jColor(input.value)
    }

    let cName_ = jColor(c).toHEX.toLowerCase();
    for (let a in jColor.colorNames) {
        if ('#' + jColor.colorNames[a] == cName_) {
            cName.textContent = a[0].toUpperCase() + a.substr(1, a.length);
            break;
        } else {
            cName.textContent = ' No Color Name '
        }
    }


    cmyk.textContent = c.toCMYK;
    hsl.textContent = c.toHSL;
    hwb.textContent = c.toHWB;
    hsv.textContent = c.toHSV;
    hex.textContent = c.toHEX;
    rgb.textContent = c.toRGB;
    colorTable(rgb.textContent);
    colorTable2(rgb.textContent);
    colorTable3(rgb.textContent)
    colorTable4(rgb.textContent)
    bgColor.textContent = hex.textContent;
    // bg.style.backgroundColor = c;
    document.body.style.setProperty('--backgroundColor', c.toHEX)


    var textColor = window.getComputedStyle(bg, null).getPropertyValue('background-color');
    var r = textColor[1],
        g = textColor[2],
        b = textColor[3];
    bgColor.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    copy_.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    rand.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    changeNavColors();
}

/* Start Darker and Lighter */

function colorTable(color) {
    let tbody = document.querySelector('tbody'),
        c1 = jColor(color),
        c2 = jColor(color);
    tbody.innerHTML = '';
    for (let i = 0; i < 21; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.style.backgroundColor = c1.getLighter(i).toHEX
        td.classList.add('changeColor');
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c1.toHEX
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c1.toHEX
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = 5 * i + ' %'
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c2.getDarker(i).toHEX
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c2.toHEX
        tr.appendChild(td);
        var td = document.createElement('td');
        td.style.backgroundColor = c2.toHEX
        td.classList.add('changeColor');
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    colorTableClick()
}

// Hue Table
function colorTable2(color) {
    let tbody = document.querySelectorAll('tbody')[1],
        c = jColor(color),
        c1 = jColor(`hsl(0,${c.hsl.s},${c.hsl.l})`),
        isCurrent = false;
    tbody.innerHTML = '';
    for (let i = 0; i <= 360; i += 20) {
        var tr = document.createElement('tr');
        if (c.hsl.h == i) {
            tr.classList.add('current')
        }
        var td = document.createElement('td');
        td.style.backgroundColor = c1.changeHue(i > 0 ? 20 : 0).toHEX
        td.classList.add('changeColor');
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = i
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c1.toHSL
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c1.toRGB
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c1.toHEX
        tr.appendChild(td);
        tbody.appendChild(tr);
        if (c.hsl.h % 20 != 0 && c1.hsl.h + 20 > c.hsl.h && !isCurrent) {
            var tr = document.createElement('tr');
            tr.classList.add('current');
            var td = document.createElement('td');
            td.style.backgroundColor = c.toHEX
            td.classList.add('changeColor');
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.hsl.h
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.toHSL
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.toRGB
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.toHEX
            tr.appendChild(td);
            tbody.appendChild(tr);
            isCurrent = true;
        }
    }
    colorTableClick()
}

// Saturation Table
function colorTable3(color) {
    let tbody = document.querySelectorAll('tbody')[2],
        c = jColor(color),
        c1 = jColor(`hsl(${c.hsl.h},0,${c.hsl.l})`),
        c2 = c1;
        isCurrent = false;
    tbody.innerHTML = '';
    for (let i = 0; i <= 100; i += 5) {
        c2 = jColor(`hsl(${c.hsl.h},${i},${c.hsl.l})`);
        var tr = document.createElement('tr');
        if (c.hsl.s == i) {
            tr.classList.add('current')
        }
        var td = document.createElement('td');
        td.style.backgroundColor = c2.saturate(i>0?5:i).toHEX
        td.classList.add('changeColor');
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = i
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c2.toHSL
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c2.toRGB
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c2.toHEX
        tr.appendChild(td);
        tbody.appendChild(tr);
        if (c.hsl.s % 5 != 0 && c2.hsl.s + 5 > c.hsl.s && !isCurrent) {
            var tr = document.createElement('tr');
            tr.classList.add('current');
            var td = document.createElement('td');
            td.style.backgroundColor = c.toHEX
            td.classList.add('changeColor');
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.hsl.s
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.toHSL
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.toRGB
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.toHEX
            tr.appendChild(td);
            tbody.appendChild(tr);
            isCurrent = true;
        }
    }
    colorTableClick()
}


// Lightness Table
function colorTable4(color) {
    let tbody = document.querySelectorAll('tbody')[3],
        c = jColor(color),
        c1 = jColor(`hsl(${c.hsl.h},${c.hsl.s},0)`),
        c2 = c1;
        isCurrent = false;
    tbody.innerHTML = '';
    for (let i = 0; i <= 100; i += 5) {
        c2 = jColor(`hsl(${c.hsl.h},${c.hsl.s},${i})`);
        var tr = document.createElement('tr');
        if (c.hsl.l == i) {
            tr.classList.add('current')
        }
        var td = document.createElement('td');
        td.style.backgroundColor = c2.light(i>0?5:i).toHEX
        td.classList.add('changeColor');
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = i
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c2.toHSL
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c2.toRGB
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = c2.toHEX
        tr.appendChild(td);
        tbody.appendChild(tr);
        if (c.hsl.l % 5 != 0 && c2.hsl.l + 5 > c.hsl.l && !isCurrent) {
            var tr = document.createElement('tr');
            tr.classList.add('current');
            var td = document.createElement('td');
            td.style.backgroundColor = c.toHEX
            td.classList.add('changeColor');
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.hsl.s
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.toHSL
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.toRGB
            tr.appendChild(td);
            var td = document.createElement('td');
            td.textContent = c.toHEX
            tr.appendChild(td);
            tbody.appendChild(tr);
            isCurrent = true;
        }
    }
    colorTableClick()
}

function colorTableClick() {
    for (let x of document.querySelectorAll('.changeColor')) {
        x.on('click', () => {
            input.value = x.style.backgroundColor;
            fromRgb();
            grd();
            mainPage.style.display = 'flex';
            mainPage2.style.display = 'flex';
            gPage.style.display = 'none';
            mixerPage.style.display = 'none';
            flatPage.style.display = 'none';
        })
    }
}



/* Start Gradient */

let gColor1 = $('gColor'),
    gColor2 = $('gColor2'),
    gVal1 = $('gVal'),
    gVal2 = $('gVal2'),
    r_ = $('right'),
    l_ = $('left'),
    t_ = $('top'),
    b_ = $('bottom'),
    rt = $('top-right'),
    lt = $('top-left'),
    rb = $('bottom-right'),
    lb = $('bottom-left'),
    copy2 = $('copy2'),
    dir = 'to right',
    gBg = $('grdBg');


function grd() {
    var textColor = window.getComputedStyle(gBg, null).getPropertyValue('background').replace(/\s/g, '').match(/rgb\(\d{1,3},\d{1,3},\d{1,3}\)/)[0];
    var textColor2 = window.getComputedStyle(gBg, null).getPropertyValue('background').replace(/\s/g, '').match(/rgb\(\d{1,3},\d{1,3},\d{1,3}\)/g)[1];
    r_.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    l_.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    t_.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    b_.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    rt.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    lt.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    rb.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    lb.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    copy2.style.color = jColor(textColor).isLight ? '#000000' : '#FFFFFF';
    gVal1 = $('gVal'),
        gVal2 = $('gVal2'),
        gBg.style.background = jColor.makeGradient(dir, gColor1.value, gVal1.value, gColor2.value, gVal2.value);
    document.body.style.setProperty('--gridColor', jColor.makeGradient(dir, gColor1.value, gVal1.value, gColor2.value, gVal2.value))
    document.body.style.setProperty('--gridBorder', textColor)
    document.body.style.setProperty('--gridBorder2', textColor2)
}
gColor1.on('keyup', () => {
    grd()
})
gColor2.on('keyup', () => {
    grd()
})
gVal1.on('keyup', () => {
    grd()
})
gVal2.on('keyup', () => {
    grd()
})
r_.on('click', () => {
    dir = 'to right';
    grd()
})
l_.on('click', () => {
    dir = 'to left';
    grd()
})
t_.on('click', () => {
    dir = 'to top';
    grd()
})
b_.on('click', () => {
    dir = 'to bottom';
    grd()
})
rt.on('click', () => {
    dir = 'to top right';
    grd()
})
lb.on('click', () => {
    dir = 'to bottom left';
    grd()
})
lt.on('click', () => {
    dir = 'to top left';
    grd()
})
rb.on('click', () => {
    dir = 'to bottom right';
    grd()
});
copy2.on('click', () => {
    copy(gBg.style.background)
})
window.addEventListener('load', () => {
    grd()
    mix()
})


/* Mixer */

let mxColor = $('mixerColor1'),
    mxColor2 = $('mixerColor2'),
    mxTbody = $('mxTbody');

function mix() {
    mxTbody.innerHTML = '';
    for (let i = 0; i < 21; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.style.backgroundColor = jColor.mix(mxColor.value, mxColor2.value, 20, i)
        td.classList.add('changeColor');
        td.id = 'changeColor';
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = jColor(jColor.mix(mxColor.value, mxColor2.value, 20, i)).toHEX
        tr.appendChild(td);
        var td = document.createElement('td');
        td.textContent = jColor.mix(mxColor.value, mxColor2.value, 20, i)
        tr.appendChild(td);
        mxTbody.appendChild(tr);
    }
    document.body.style.setProperty('--mix1', jColor(mxColor.value).toHEX)
    document.body.style.setProperty('--mix2', jColor(mxColor2.value).toHEX)
    colorTableClick()
}
mxColor.on('keyup', () => {
    mix()
})
mxColor2.on('keyup', () => {
    mix()
})

/* Flat */

let flatColors = document.querySelectorAll('.flat-colors div');
for (let div of flatColors)[
    div.on('click', () => {
        input.value = div.style.backgroundColor;
        fromRgb();
        mainPage.style.display = 'flex';
        mainPage2.style.display = 'flex';
        gPage.style.display = 'none';
        mixerPage.style.display = 'none';
        flatPage.style.display = 'none';
        copy(hex.textContent)
    })
]