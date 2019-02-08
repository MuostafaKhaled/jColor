/*
****
****
****
Copyright (c) 2019 Mostafa Khaled

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

****
****
****
*/

(function () {
    // declare module --- 
    var module_ = function (name) {
        var windows = typeof window !== 'undefined' ? window : global,
            check = Object.prototype.hasOwnProperty(windows, name),
            last = windows[name];
        //_jColor = windows[name] = new Function();
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = _jColor;
        }

        // declare jColor consturctor  

        const _jColor = function (color) {
            if (color instanceof _jColor || typeof color == 'object') {
                return color
            }
            this.color = this.checkRGB(color); // check if the color is valid
            this.rgb = this.checkRGB(color).match(/(\d{1,3}),(\d{1,3}),(\d{1,3})/); // get red , green ,blue values from the color and if the color not in rgb format it will automatically converted to rgb color format
            this.r = this.rgb[1] > 255 ? 255 : +this.rgb[1] // color red value
            this.g = this.rgb[2] > 255 ? 255 : +this.rgb[2] // color green value
            this.b = this.rgb[3] > 255 ? 255 : +this.rgb[3] // color blue value
            this.hsl = {}; // hsl object 
            this.hsv = {}; // hsv object
            this.hwb = {}; // hwb object
            this.cmyk = {}; // cmyk object
            this.rgb = {
                r: this.r,
                g: this.g,
                b: this.b
            } // rgb object
            this.luminance = (3 * this.r + 4 * this.g + this.b) >> 3; // luminance value
            this.update(); // update color status after doing some method like get darker or lighter
            this.type = this.isDark ? 'dark' : 'light' // type of the color light or dark
            delete this.color; // delete this.color value 
            delete this.r; // delete red value beacause we defined it later in a specific object rgb
            delete this.g; // like the red value
            delete this.b; // like the other rgb values
        };

        // check color value if it valid or not if the first it will convert it to rgb format if it was in another format and return black color if it was not a valid color in any format
        _jColor.prototype.checkRGB = function (color) {
            let value;
            if (/rgb/.test(color)) { // check if color is in rgb format
                value = color
            } else if (/#/.test(color)) { // check if color is in hex format
                value = this.hexToRGB(color)
            } else if (/hsl/.test(color)) { // check if color is in hsl format
                value = this.hslToRGB(color)
            } else if (/hsv/.test(color) || /hsb/.test(color)) { // check if color is in hsv (hsb) format 
                value = this.hsvToRGB(color)
            } else if (/hwb/.test(color)) { // check if color is in hwb format 
                value = this.hwbToRGB(color)
            } else if (/cmyk/.test(color)) { // check if color is in cmyk format
                value = this.cmykToRGB(color)
            } else { // else if the color is in color names data

                if (color.toLowerCase() in this.colorNames) {
                    value = this.hexToRGB('#' + this.colorNames[color.toLowerCase()]);
                } else {
                    value = 'rgb(0,0,0)'
                }
            }
            return value.replace(/ /g, '').replace(/NaN/gi, 0); // return color in rgb format
        }

        // convert HEX format to RGB
        _jColor.prototype.hexToRGB = function (color) {
            let regExp, c, r, g, b, e; // declare local variables
            regExp = /[^0-9A-Fa-f]/g; // check if the color in hex format
            c = color.replace(regExp, ''); // replace any char that is not important
            if (c.length == 3) { // check if hex is 3 Letters and convert it to 6 Letters Mode
                e = c;
                c = '';
                for (let letter of e) {
                    c += letter.repeat(2);
                }
            }
            r = toRGB(c.substr(0, 2));
            g = toRGB(c.substr(2, 4));
            b = toRGB(c.substr(4, 6));
            return `rgb(${r},${g},${b})` // return rgb converted color
        }
        // convert HSL format to RGB
        _jColor.prototype.hslToRGB = function (color) {
            let regExp, h, s, l, c, x, m, r, g, b; // declare local variables
            regExp = color.replace(/NaN/gi, 0).match(/\d{1,3}/g); // replace any ( NaN ) value with 0 and regex the string
            h = +regExp[0]; // select hue value from the string
            s = +regExp[1] / 100; // select the saturation value from the string
            l = +regExp[2] / 100; // select the lightness value from the string
            // the next vars are some calculations to convert hsl to rgb 
            c = (1 - Math.abs(2 * l - 1)) * s;
            x = c * (1 - Math.abs((h / 60) % 2 - 1));
            m = l - (c / 2);
            // get r , g , b values
            if (h >= 0 && h <= 60) {
                r = c;
                g = x;
                b = 0;
            } else if (h >= 60 && h < 120) {
                r = x;
                g = c;
                b = 0;
            } else if (h >= 120 && h < 180) {
                r = 0;
                g = c;
                b = x;
            } else if (h >= 180 && h < 240) {
                r = 0;
                g = x;
                b = c;
            } else if (h >= 240 && h < 300) {
                r = x;
                g = 0;
                b = c;
            } else if (h >= 300 && h <= 360) {
                r = c;
                g = 0;
                b = x;
            } else {
                r = g = b = 0;
            }
            // return rgb converted color
            return `rgb(${Math.round((r+m)*255)},${Math.round((g+m)*255)},${Math.round((b+m)*255)})`
        }
        // convert HSV format to RGB
        _jColor.prototype.hsvToRGB = function (color) {
            let regExp, h, s, v, c, x, m, r, g, b; // declare local variables
            regExp = color.match(/\d{1,3}/g); // regex the string and match the hsv values
            h = +regExp[0]; // get hue value from regex
            s = +regExp[1] / 100; // get saturation value from regex
            v = +regExp[2] / 100; // get value (value) from regex
            // the following variables are for calculations to convert hsv to rgb format
            c = v * s;
            x = c * (1 - Math.abs((h / 60) % 2 - 1));
            m = v - c;
            // get red , green , blue values from calculations
            if (h >= 0 && h < 60) {
                r = c;
                g = x;
                b = 0;
            } else if (h >= 60 && h < 120) {
                r = x;
                g = c;
                b = 0;
            } else if (h >= 120 && h < 180) {
                r = 0;
                g = c;
                b = x;
            } else if (h >= 180 && h < 240) {
                r = 0;
                g = x;
                b = c;
            } else if (h >= 240 && h < 300) {
                r = x;
                g = 0;
                b = c;
            } else if (h >= 300 && h <= 360) {
                r = c;
                g = 0;
                b = x;
            } else {
                r = g = b = 0;
            }
            // return converted string as rgb format
            return `rgb(${Math.round((r+m)*255)},${Math.round((g+m)*255)},${Math.round((b+m)*255)})`
        }


        // convert HWB format to RGB


        _jColor.prototype.hwbToRGB = function (color) {
            let regExp, mix, h, w, b, s, v; // declare local variables
            regExp = color.match(/\d{1,3}/g); // regex the color string
            h = +regExp[0]; // get hue value from regex
            w = +regExp[1] / 100; // get white value from regex
            b = +regExp[2] / 100; // get black value from regex 
            mix = b + w; // mix the white and black values
            if (mix > 1) {
                w = (w / mix).toFixed(2);
                b = (b / mix).toFixed(2);
            }
            s = (1 - (w / (1 - b)));
            v = 1 - b;
            // the result of this function is in hsv format and we convert it by hsv to rgb function 
            return this.hsvToRGB(`hsv(${h},${Math.round(s*100)},${Math.round(v*100)})`)
        }
        // convert CMYK format to RGB
        _jColor.prototype.cmykToRGB = function (color) {
            let regExp, c, m, y, k, r, g, b; // declare local variables
            regExp = color.match(/\d{1,3}/g); // regex the color string
            c = +regExp[0] / 100; // get cyan value from regex
            m = +regExp[1] / 100; // get magneta value from regex
            y = +regExp[2] / 100; // get yellow value from regex
            k = +regExp[3] / 100; // get black value from regex
            r = 255 * (1 - c) * (1 - k);
            g = 255 * (1 - m) * (1 - k);
            b = 255 * (1 - y) * (1 - k);
            return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`
        }
        // invert color 

        _jColor.prototype.invert = function () {
            this.rgb.r = 255 - this.rgb.r;
            this.rgb.g = 255 - this.rgb.g;
            this.rgb.b = 255 - this.rgb.b;
            return this
        }

        // make color hue equals what you need
        // works as the last one
        _jColor.prototype.hue = function (value) {
            if (value == "undefined") {
                return this
            }
            let h = 0 <= value ? 360 < value ? 0 : value : 0;
            let color = new _jColor(`hsl(${h},${this.hsl.s}%,${this.hsl.l})%`);
            this.rgb.r = color.rgb.r;
            this.rgb.g = color.rgb.g;
            this.rgb.b = color.rgb.b;
            this.update();
            return this
        }

        // make color saturation equals what you need
        // works as the last one
        _jColor.prototype.saturation = function (value) {
            if (value == "undefined") {
                return this
            }
            let s = 0 <= value ? 100 < value ? 100 : value : 0;
            let color = new _jColor(`hsl(${this.hsl.h},${s}%,${this.hsl.l})%`);
            this.rgb.r = color.rgb.r;
            this.rgb.g = color.rgb.g;
            this.rgb.b = color.rgb.b;
            this.update();
            return this
        }
        // make color lightness equals what you need
        // works as the last one
        _jColor.prototype.lightness = function (value) {
            if (value == "undefined") {
                return this
            }
            let l = 0 <= value ? 100 < value ? 100 : value : 0;
            let color = new _jColor(`hsl(${this.hsl.h},${this.hsl.s}%,${l})%`);
            this.rgb.r = color.rgb.r;
            this.rgb.g = color.rgb.g;
            this.rgb.b = color.rgb.b;
            this.update();
            return this
        }

        // make color value ( HSV ) equals what you need
        // works as the last one
        _jColor.prototype.value = function (val) {
            if (val == "undefined") {
                return this
            }
            let v = 0 <= val ? 100 < val ? 100 : val : 0;
            let color = new _jColor(`hsv(${this.hsl.h},${this.hsl.s}%,${v})%`);
            this.rgb.r = color.rgb.r;
            this.rgb.g = color.rgb.g;
            this.rgb.b = color.rgb.b;
            this.update();
            return this
        }




        // change color hue by amount

        _jColor.prototype.changeHue = function (degree = 10) {

            // declare a variable h that equals current color hue value and adds degree value to it and check if the result is bigger than 360 then it will subtract 360 from it else it will be current hue value plus degree value

            let h = (this.hsl.h + degree) > 360 ? this.hsl.h + degree - 360 : this.hsl.h + degree;

            // declare a variable color that equals a new color instanceof jColor and has the new values
            let color = new _jColor(`hsl(${h},${this.hsl.s}%,${this.hsl.l})%`);

            // make current color rgb values equals the new ones then update the color status and return the new color
            this.rgb.r = color.rgb.r;
            this.rgb.g = color.rgb.g;
            this.rgb.b = color.rgb.b;
            this.update();
            return this
        }


        // change color saturation by amount
        // works as the last one
        _jColor.prototype.saturate = function (amount = 10) {
            let s = this.hsl.s + amount > 100 ? 100 : this.hsl.s + amount;
            let color = new _jColor(`hsl(${this.hsl.h},${s}%,${this.hsl.l})%`);
            this.rgb.r = color.rgb.r;
            this.rgb.g = color.rgb.g;
            this.rgb.b = color.rgb.b;
            this.update();
            return this
        }

        // change color saturation by amount
        // works as the last one
        _jColor.prototype.desaturate = function (amount = 10) {
            let s = this.hsl.s - amount < 0 ? 0 : this.hsl.s - amount;
            let color = new _jColor(`hsl(${this.hsl.h},${s}%,${this.hsl.l})%`);
            this.rgb.r = color.rgb.r;
            this.rgb.g = color.rgb.g;
            this.rgb.b = color.rgb.b;
            this.update();
            return this
        }

        //greyScale color
        _jColor.prototype.greyScale = function () {
            return this.saturation(0).lightness(50)
        }


        // change color lightness by amount 
        // works as the last one
        _jColor.prototype.light = function (amount = 10) {
            let l = this.hsl.l + amount > 100 ? 100 : this.hsl.l + amount;
            let color = new _jColor(`hsl(${this.hsl.h},${this.hsl.s}%,${l})%`);
            this.rgb.r = color.rgb.r;
            this.rgb.g = color.rgb.g;
            this.rgb.b = color.rgb.b;
            this.update();
            return this
        }

        // change color value by amount 
        // works as the last one
        _jColor.prototype.changeValue = function (amount = 10) {
            let v = this.hsl.v + amount > 100 ? 100 : this.hsl.v + amount;
            let color = new _jColor(`hsv(${this.hsl.h},${this.hsl.s}%,${v})%`);
            this.rgb.r = color.rgb.r;
            this.rgb.g = color.rgb.g;
            this.rgb.b = color.rgb.b;
            this.update();
            return this
        }

        // update color status 

        _jColor.prototype.update = function () {
            this.toHSL; // call toHSL method (getter)
            this.toHSV; // call toHSV method (getter)
            this.toHWB; // call toHWB method (getter)
            this.toCMYK; // call toCMYK method (getter)
            this.luminance = (3 * this.rgb.r + 4 * this.rgb.g + this.rgb.b) >> 3; // update luminance
            this.type = this.isDark ? "dark" : "light"

        }


        // colors dataset 

        _jColor.prototype.colorNames = JSON.parse(`{"aliceblue":"f0f8ff","antiquewhite":"faebd7","aqua":"00ffff","aquamarine":"7fffd4","azure":"f0ffff","beige":"f5f5dc","bisque":"ffe4c4","black":"000000","blanchedalmond":"ffebcd","blue":"0000ff","blueviolet":"8a2be2","brown":"a52a2a","burlywood":"deb887","cadetblue":"5f9ea0","chartreuse":"7fff00","chocolate":"d2691e","coral":"ff7f50","cornflowerblue":"6495ed","cornsilk":"fff8dc","crimson":"dc143c","cyan":"00ffff","darkblue":"00008b","darkcyan":"008b8b","darkgoldenrod":"b8860b","darkgray":"a9a9a9","darkgrey":"a9a9a9","darkgreen":"006400","darkkhaki":"bdb76b","darkmagenta":"8b008b","darkolivegreen":"556b2f","darkorange":"ff8c00","darkorchid":"9932cc","darkred":"8b0000","darksalmon":"e9967a","darkseagreen":"8fbc8f","darkslateblue":"483d8b","darkslategray":"2f4f4f","darkslategrey":"2f4f4f","darkturquoise":"00ced1","darkviolet":"9400d3","deeppink":"ff1493","deepskyblue":"00bfff","dimgray":"696969","dimgrey":"696969","dodgerblue":"1e90ff","firebrick":"b22222","floralwhite":"fffaf0","forestgreen":"228b22","fuchsia":"ff00ff","gainsboro":"dcdcdc","ghostwhite":"f8f8ff","gold":"ffd700","goldenrod":"daa520","gray":"808080","grey":"808080","green":"008000","greenyellow":"adff2f","honeydew":"f0fff0","hotpink":"ff69b4","indianred":"cd5c5c","indigo":"4b0082","ivory":"fffff0","khaki":"f0e68c","lavender":"e6e6fa","lavenderblush":"fff0f5","lawngreen":"7cfc00","lemonchiffon":"fffacd","lightblue":"add8e6","lightcoral":"f08080","lightcyan":"e0ffff","lightgoldenrodyellow":"fafad2","lightgray":"d3d3d3","lightgrey":"d3d3d3","lightgreen":"90ee90","lightpink":"ffb6c1","lightsalmon":"ffa07a","lightseagreen":"20b2aa","lightskyblue":"87cefa","lightslategray":"778899","lightslategrey":"778899","lightsteelblue":"b0c4de","lightyellow":"ffffe0","lime":"00ff00","limegreen":"32cd32","linen":"faf0e6","magenta":"ff00ff","maroon":"800000","mediumaquamarine":"66cdaa","mediumblue":"0000cd","mediumorchid":"ba55d3","mediumpurple":"9370db","mediumseagreen":"3cb371","mediumslateblue":"7b68ee","mediumspringgreen":"00fa9a","mediumturquoise":"48d1cc","mediumvioletred":"c71585","midnightblue":"191970","mintcream":"f5fffa","mistyrose":"ffe4e1","moccasin":"ffe4b5","navajowhite":"ffdead","navy":"000080","oldlace":"fdf5e6","olive":"808000","olivedrab":"6b8e23","orange":"ffa500","orangered":"ff4500","orchid":"da70d6","palegoldenrod":"eee8aa","palegreen":"98fb98","paleturquoise":"afeeee","palevioletred":"db7093","papayawhip":"ffefd5","peachpuff":"ffdab9","peru":"cd853f","pink":"ffc0cb","plum":"dda0dd","powderblue":"b0e0e6","purple":"800080","rebeccapurple":"663399","red":"ff0000","rosybrown":"bc8f8f","royalblue":"4169e1","saddlebrown":"8b4513","salmon":"fa8072","sandybrown":"f4a460","seagreen":"2e8b57","seashell":"fff5ee","sienna":"a0522d","silver":"c0c0c0","skyblue":"87ceeb","slateblue":"6a5acd","slategray":"708090","slategrey":"708090","snow":"fffafa","springgreen":"00ff7f","steelblue":"4682b4","tan":"d2b48c","teal":"008080","thistle":"d8bfd8","tomato":"ff6347","turquoise":"40e0d0","violet":"ee82ee","wheat":"f5deb3","white":"ffffff","whitesmoke":"f5f5f5","yellow":"ffff00","yellowgreen":"9acd32"}`);


        // flat colors dataset
        _jColor.prototype.flatColors = JSON.parse(`{"pomegranate":"#f9ebea","alizarin":"#fadbd8","amethyst":"#9b59b6","wisteria":"#8e44ad","belize hole":"#7fb3d5","peter river":"#aed6f1","turquoise":"#1abc9c","green sea":"#73c6b6","nephritis":"#1e8449","emerald":"#2ecc71","sunflower":"#f7dc6f","orange":"#f39c12","carrot":"#e67e22","pumpkin":"#d35400","clouds":"#ecf0f1","silver":"#bdc3c7","concrete":"#95a5a6","asbestos":"#7f8c8d","wet asphalt":"#34495e","midnight blue":"#212f3d"}`);


        // make color darker 

        _jColor.prototype.getDarker = function (percent = 10) {
            let r, g, b, p; // declare local variables
            r = this.rgb.r;
            g = this.rgb.g;
            b = this.rgb.b;
            p = percent; // the color will get darker by this percentage value
            this.rgb.r = ~~(r - (r * p / 100));
            this.rgb.g = ~~(g - (g * p / 100));
            this.rgb.b = ~~(b - (b * p / 100));
            // update the color values and then return the new color value
            this.update();
            return this
        }

        // make color lighter
        // works as the last one
        _jColor.prototype.getLighter = function (percent = 10) {
            let r, g, b, p, n;
            r = this.rgb.r;
            g = this.rgb.g;
            b = this.rgb.b;
            p = percent;
            n = 100;
            r == 0 ? r = 2 * p : r
            g == 0 ? g = 2 * p : g
            b == 0 ? b = 2 * p : b
            Math.round(r + ((255 - r) / n) * p) < 255 ? r = Math.round(r + ((255 - r) / n) * p) : r = 255;
            Math.round(g + ((255 - g) / n) * p) < 255 ? g = Math.round(g + ((255 - g) / n) * p) : g = 255;
            Math.round(b + ((255 - b) / n) * p) < 255 ? b = Math.round(b + ((255 - b) / n) * p) : b = 255;
            this.rgb.r = r;
            this.rgb.g = g;
            this.rgb.b = b;
            this.update();
            return this
        }

        // jColor color schemes 

        // create an analogus scheme 

        _jColor.prototype.analogous = function () {
            let [h, s, v] = [this.hsv.h, this.hsv.s, this.hsv.v],
            analogousArray = [];
            for (let i = -2; i < 3; i++) {
                let new_hue = i ? 18 > h ? 0 > i ? h - 9 * i : 360 + (h - 9 * i) : 342 < h ? 0 < i ? h - 9 * i : 360 - (h - 9 * i) : h - 9 * i : h,
                    new_sat = i ? 95 < s ? 195 - s : s + 5 : s,
                    new_val = i ? 16 > v ? 20 : 92 < v ? 0 == i ? v : 0 == i % 2 ? 98 : 86 : 0 == i % 2 ? v + 5 : v + 9 : v;
                analogousArray.push(new _jColor(`hsv(${new_hue},${new_sat},${new_val})`).toHEX);
            }
            return analogousArray;
        }

        // create an monochromatic scheme 

        _jColor.prototype.monochromatic = function () {
            let [h, s, v] = [this.hsv.h, this.hsv.s, this.hsv.v],
            monochromaticArray = [];
            for (let i = -2; i < 3; i++) {
                let values = [70 < v ? v - 50 : v + 30, 50 < v ? v : 10 < v ? v + 10 : 20, v , 50 < v ? v : 10 < v ? v + 10 : 20, 40 < v ? v - 20 : v + 60],
                    new_hue = h,
                    new_sat = i ? 40 <= s ? s - 10 * 3 ** Math.abs(i % 2) : s + 30 * Math.abs(i % 2) : s,
                    new_val = values[i + 2];
                monochromaticArray.push(new _jColor(`hsv(${new_hue},${new_sat},${new_val})`).toHEX);
            }
            return monochromaticArray;
        }


        // create an triad scheme 

        _jColor.prototype.triad = function () {
            let [h, s, v] = [this.hsv.h, this.hsv.s, this.hsv.v],
            triadArray = [];
            for (let i = 0; i < 3; i++) {
                let new_hue = [h+120,h,h-120],
                    new_sat = [s+10,s,s+5],
                    new_val = [v+5,v,v+5];
                triadArray.push(new _jColor(`hsv(${360<new_hue[i]?new_hue[i]-360:0>new_hue[i]?new_hue[i]+360:new_hue[i]},${new_sat[i]>100?100:new_sat[i]},${new_val[i]<0?0:new_val[i]>100?100:new_val[i]})`).toHEX);
            }
            return triadArray;
        }
        // create an shades scheme 

        _jColor.prototype.shades = function () {
            let [h, s, v] = [this.hsv.h, this.hsv.s, this.hsv.v],
            values = [45>v?v+45:v-25,71>v?v+30:v-50,v,15>v?20:96>v?v+5:v-75,30>v?20:v-10];
            shadesArray = [];
            for (let i = 0; i < 5; i++) {
                shadesArray.push(new _jColor(`hsv(${h},${s},${values[i]})`).toHEX);
            }
            return shadesArray;
        }

        // jColor another properties 

        Object.defineProperties(_jColor.prototype, {
            toRGB: {
                get: function () { // convert color to rgb format
                    return `rgb(${this.rgb.r},${this.rgb.g},${this.rgb.b})`;
                }
            },
            toHEX: { // convert color to hex format
                get: function () {
                    return `#${toHEX(this.rgb.r)}${toHEX(this.rgb.g)}${toHEX(this.rgb.b)}`;
                }
            },
            toHSL: { //convert color to hsl format
                get: function () {
                    let max, min, phi, h, s, l, r, g, b; // declare local variables
                    //divide values by 255 to make it easier to use it in the calculations
                    r = this.rgb.r / 255;
                    g = this.rgb.g / 255;
                    b = this.rgb.b / 255;
                    max = Math.max(r, g, b); // get the biggest value
                    min = Math.min(r, g, b); // get the smallest values
                    phi = max - min; // get delta ( the result of subtract min from max )
                    // the following calculations is used to convert the values 
                    if (phi === 0) {
                        h = 0
                    } else if (max === r) {
                        h = 60 * (((g - b) / phi) % 6)
                    } else if (max === g) {
                        h = 60 * (((b - r) / phi) + 2)
                    } else if (max === b) {
                        h = 60 * (((r - g) / phi) + 4)
                    }

                    //check if hue value is smaller than zero and if done add it to 360 and if not still the same value

                    h < 0 ? h = 360 + h : h
                    l = (max + min) / 2
                    s = (phi == 0) ? 0 : phi / (1 - (Math.abs(2 * l - 1)))

                    h = Math.round(h)
                    l = Math.round(l * 100)
                    s = Math.round(s * 100)
                    // update the current hsl values 
                    this.hsl.h = h;
                    this.hsl.s = s;
                    this.hsl.l = l;
                    return `hsl(${h}°,${s}%,${l}%)`
                }
            },
            toHSV: { // convert color to hsv format
                // works as the last one
                get: function () {
                    let r, g, b, max, min, phi, h, s, v;
                    r = this.rgb.r / 255;
                    g = this.rgb.g / 255;
                    b = this.rgb.b / 255;
                    max = Math.max(r, g, b);
                    min = Math.min(r, g, b);
                    phi = max - min;
                    if (phi === 0) {
                        h = 0
                    } else if (max === r) {
                        h = 60 * (((g - b) / phi) % 6)
                    } else if (max === g) {
                        h = 60 * (((b - r) / phi) + 2)
                    } else if (max === b) {
                        h = 60 * (((r - g) / phi) + 4)
                    }
                    h < 0 ? h = 360 + h : h
                    v = max
                    s = (phi == 0) ? 0 : phi / max

                    h = Math.round(h)
                    v = Math.round(v * 100)
                    s = Math.round(s * 100)
                    this.hsv.h = h;
                    this.hsv.s = s;
                    this.hsv.v = v;
                    return `hsv(${h}°,${s}%,${v}%)`
                }
            }, // convert color to hwb format
            toHWB: {
                get: function () {
                    let regExp, c, h, s, v, w, b; //declare local variables
                    c = this.toHSV.replace(/NaN/gi, 0); // check if the value doesn't have a NaN value and if so replace it with zero
                    regExp = c.match(/\d{1,3}/g); // regex the color string to extract numbers from it
                    h = +regExp[0]; // get hue value from regex 
                    s = +regExp[1] / 100 || 0; // get saturation value from regex
                    v = +regExp[2] / 100 || 0; // get value ( value ) from regex
                    w = (1 - s) * v; // calculate white value
                    b = 1 - v; // calculate black value
                    this.hwb.h = h; // return hue value
                    this.hwb.w = Math.round(w * 100); // return white value 
                    this.hwb.b = Math.round(b * 100); // return black value
                    //return converted hwb color format as string
                    return `hwb(${h}°,${Math.round(w*100)}%,${Math.round(b*100)}%)`
                }
            },
            toCMYK: {
                get: function () {
                    let r, g, b, c, m, y, k; //declare local variables
                    r = this.rgb.r / 255; // divide red value by 255 to make it easier in calculations
                    g = this.rgb.g / 255; // divide green value by 255 to make it easier in calculations
                    b = this.rgb.b / 255; // divide blue value by 255 to make it easier in calculations
                    k = 1 - Math.max(r, b, g); // get black value
                    c = (1 - r - k) / (1 - k) || 0; // get cyan value
                    m = (1 - g - k) / (1 - k) || 0; // get magneta value
                    y = (1 - b - k) / (1 - k) || 0; // get yellow value
                    // update the current object cmyk values
                    this.cmyk.c = Math.round(c * 100);
                    this.cmyk.m = Math.round(m * 100);
                    this.cmyk.y = Math.round(y * 100);
                    this.cmyk.k = Math.round(k * 100);
                    // return converted values as string 
                    return (`cmyk(${Math.round(c*100)}%,${Math.round(m*100)}%,${Math.round(y*100)}%,${Math.round(k*100)}%)`)
                }
            },
            isDark: {
                get: function () {
                    let r, g, b;
                    r = this.rgb.r;
                    g = this.rgb.g;
                    b = this.rgb.b;
                    return ((r * .299 + g * .587 + b * .114) < 128)
                }
            }, // check if the the color is dark or light
            isLight: {
                get: function () {
                    let r, g, b;
                    r = this.rgb.r;
                    g = this.rgb.g;
                    b = this.rgb.b;
                    return ((r * .299 + g * .587 + b * .114) > 128)
                }
            }
        });
        // convert rgb value to hex value
        function toHEX(color) {
            let hex, result, colorDegree, firstHex, secondHex; // declare local variables
            // convert all hex array letter to uppercase letters 
            hex = ['a', 'b', 'c', 'd', 'e', 'f'].map(letter => letter.toUpperCase());
            colorDegree = +color; // convert color from string to number
            result = new String(); // declare result as new empty string
            firstHex = ~~(colorDegree / 16); // get first hex letter by floating the result of dividing color degree by 16
            secondHex = colorDegree % 16; // get second hex letter by moduling colordegree by 16
            //check if the first hex place is number or letter
            if (firstHex <= 9) { // if firstHex less than or equal 9 then make first letter in result variable is equal to firstHex
                result += firstHex;
                if (secondHex <= 9) { // if secondHex less than or equal 9 then make second letter in result variable is equal to second Hex
                    result += secondHex;
                } else { // else if secondHex is greater than 9 then take the secondHex-10 th element from hex array  
                    result += hex[secondHex - 10]
                }
            } else { //else if firstHex is greater than 9 then take the firstHex - 10 th element from hex array
                result += hex[firstHex - 10]
                if (secondHex <= 9) { // if secondHex less than or equal 9 then make second letter in result variable is equal to second Hex
                    result += secondHex
                } else { // else if secondHex is greater than 9 then take the secondHex-10 th element from hex array 
                    result += hex[secondHex - 10]
                }
            }
            if (result.length == 2) { // check if result string length equlas to 2 if true return the result if not return '00'
                return result
            }
            return '00'
        }

        // convert hex value to rgb value
        function toRGB(value) {
            let color, result, hex; // declare local variables
            color = value.substr(0, 2).toLowerCase(); // color equals to first two letters in hex string
            result = 0; // result equals 0
            hex = {
                a: 10,
                b: 11,
                c: 12,
                d: 13,
                e: 14,
                f: 15
            }; // hex object casting letters as numbers
            for (let i = 0; i < color.length; i++) { // for loop in the string
                if (i == 0) {
                    if (color[i] in hex) {
                        result += +hex[color[i]] * 16
                    } else {
                        result += +color[i] * 16
                    }
                } else {
                    if (color[i] in hex) {
                        result += +hex[color[i]]
                    } else {
                        result += +color[i]
                    }
                }

            }
            return result;
        }

        const jColor = 'jColor';
        windows['jColor_'] = _jColor;
        Object.assign(windows['jColor_'], _jColor)
        windows[jColor] = color => color instanceof _jColor ? color : new _jColor(color);

        windows[jColor].mix = function (color1, color2, number, percent) {
            let firstColor, secondColor, r1, r2, g1, g2, b1, b2;
            firstColor = new _jColor(color1);
            secondColor = new _jColor(color2);
            r1 = firstColor.rgb.r;
            r2 = secondColor.rgb.r;
            g1 = firstColor.rgb.g;
            g2 = secondColor.rgb.g;
            b1 = firstColor.rgb.b;
            b2 = secondColor.rgb.b;
            let r = (r1 > r2) ? r1 - (~~((r1 - r2) / number * percent)) : r2 - (~~((r2 - r1) / number * (number - percent)));
            let g = (g1 > g2) ? g1 - (~~((g1 - g2) / number * percent)) : g2 - (~~((g2 - g1) / number * (number - percent)));
            let b = (b1 > b2) ? b1 - (~~((b1 - b2) / number * percent)) : b2 - (~~((b2 - b1) / number * (number - percent)));
            b = b > 255 ? 255 : b < 0 ? 0 : b;
            r = r > 255 ? 255 : r < 0 ? 0 : r;
            g = g > 255 ? 255 : g < 0 ? 0 : g;
            return `rgb(${r},${g},${b})`;
        }

        // make gradient 

        window[jColor].makeGradient = function (dir, color, val, color2, val2) {
            let c1 = new _jColor(color);
            let c2 = new _jColor(color2);
            val > 100 ? val = 100 : val;
            val2 > 100 ? val2 = 100 : val;
            val < 0 ? val = 0 : val;
            val2 < 0 ? val2 = 0 : val2;
            return `linear-gradient(${dir},${c1.toHEX} ${val}%,${c2.toHEX} ${val2}%)`
        }
        // make random color 

        windows[jColor].random = function (type) {
            if (/dark/i.test(type)) {
                let color = new _jColor(`rgb(${~~(Math.random()*255)},${~~(Math.random()*255)},${~~(Math.random()*255)})`);
                if (color.isDark) {
                    return color
                }
                return this.random('Dark')
            } else if (/light/i.test(type)) {
                let color = new _jColor(`rgb(${~~(Math.random()*255)},${~~(Math.random()*255)},${~~(Math.random()*255)})`);
                if (color.isLight) {
                    return color
                }
                return this.random('Light')
            }
            return new _jColor(`rgb(${~~(Math.random()*255)},${~~(Math.random()*255)},${~~(Math.random()*255)})`)
        }
        // color Names

        windows[jColor].colorNames = jColor_.prototype.colorNames;
        windows[jColor].flatColors = jColor_.prototype.flatColors;
        windows[jColor].toRGB = toRGB;
        windows[jColor].toHEX = toHEX;
        //**------------------------------------------------------------**//

        return
    }('module_');
    return
}())