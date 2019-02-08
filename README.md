# jColor.js
jColor.js is a fast , small and non-dependencies js library for converting between all colors spaces and has many methods to edit and manipulate colors and creating colors schemes.  


# Warning 
### a little bit difference might be happen when calling some method because of many calculations like 1% difference between two values no more

# Including in browser :

  you can download it from here [jColor.js](https://www.google.com)
  ```html
    <script type="text/javascript" src = "jcolor.js"></script>
  ```

# Using the library : 

  Call jColor() function or new jColor_() constructor to begin using the libray and it returns an object that includes the properties of    the color was passed in the function and to return the color value you can use one of this methods :
  
  `.toRGB` : returns the rgb color model.
  
  `.toHEX` : returns the hex color model.
  
  `.toHSL` : returns the hsl color model.
  
  `.toHSV` : returns the hsv `( hsb )` color model.
  
  `.toHWB` : returns the hwb color model.
  
  `.toCMYK`: returns the cmyk color model.
  
# Color types you can include : 
  
  ## RGB (examples):
```js
    jColor('rgb(255,0,0)');
    jColor('rgb( 255 , 0 , 0)');
    new jColor_('rgb 3,15,205');
```
  ## HEX (examples):
```js
        jColor('#ff5');
        jColor('#f05805');
        new jColor_('#0f0f50');
```
  ## HSL (examples):
```js
        jColor('hsl(50° ,20% ,80%)');
        jColor('hsl 50° ,20 ,80');
        new jColor_('hsl 150 ,80 ,56');
```
  ## HSV `[HSB]` (examples):
```js
        jColor('hsl(350° ,25% ,50%)');
        jColor('hsl 220° ,65 ,35');
        new jColor_('hsl 148 ,75 ,12');
```
  ## HWB (examples):
```js
        jColor('hsl(48° ,35% ,13%)');
        jColor('hsl 86° ,86 ,86');
        new jColor_('hsl 178 ,12 ,35');
```
  ## CMYK (examples):
```js
        jColor('cmyk(50% ,40% ,20% ,80%)');
        jColor('cmyk 40 ,50 ,20 ,80');
        new jColor_('cmyk(38% ,100% ,42% ,15%)');
```
  ## Name (examples):
```js
        jColor('red');
        jColor('green');
        new jColor_('orange');
```
----------------------------------------------------------------------------------

# Methods : 


## Random ( ' Dark ' or ' Light ' )

    returns a random color if you set the parameter to light or dark if not returns a random color dark or light
```js
    let random = jColor.random(); // can return any color
    let random2 = jColor.random('dark'); // returns a dark color
    let random3 = jColor.random('light') // returns a light color
```
## Mix

    returns a mixed color of two passed colors

```js
    let firstColor = jColor('red'),
        secondColor = jColor('yellow');

    // jColor.mix( firstColor , secondColor , number of slices , the number(th) of slice )

    jColor.mix(firstColor,secondColor,18,8) // "#FF7200"
```
## Make linear gradient 

    returns a gradient function contains two colors and percent of every one of them and the direction

```js
    let firstColor = jColor('green'),
        secondColor = jColor('blue'); 
    
    // jColor.makeGradient( direction , firstColor  , firstColor percent , secondColor , secondColor percent )
    jColor.makeGradient('ToRight',firstColor,50,secondColor,50)

    //"linear-gradient(ToRight,#008000 50%,#0000FF 50%)"

```
   
   
## Hue 
    makes current color hue equals to passsed value 

```js
    let firstColor = jColor('red'); // hsv(0°,100%,100%)
    firstColor.hue(150).toHSV;   // hsv (150°,100%,100%)
```

## Saturation
    makes current color saturation equals to passsed value 

```js
    let firstColor = jColor('red'); // hsv(0°,100%,100%)
    firstColor.saturation(50).toHSV;   // hsv (0,50%,100%)
```

## Lightness
    makes current color lightness equals to passsed value 

```js
    let firstColor = jColor('red'); // hsl(0°,100%,100%)
    firstColor.lightness(39).toHSL;   // hsl (0,100%,39%)
```

## Value
    makes current color value ( HSV ) equals to passsed value 

```js
    let firstColor = jColor('red'); // hsv(0°,100%,100%)
    firstColor.value(82).toHSV;   // hsv (0,100%,82%)
```

## changeHue

    changes current color hue by amount ( default = 10 ) 

```js

    let firstColor = jColor('#475682'); // hsv(225°,45%,51%)
    firstColor.changeHue().toHSV;   // hsv (235°,45%,51%)

    let secondColor = jColor('#475682'); // hsv(225°,45%,51%)
    secondColor.changeHue(80).toHSV;   // hsv (305°,45%,51%)

```

## saturate

    changes current color saturation by amount ( default = 10 ) 

```js
    let firstColor = jColor('#475682'); // hsv(225°,45%,51%)
    firstColor.saturate(5);   // hsv (225°,50%,51%)

    let secondColor = jColor('#475682'); // hsv(225°,45%,51%)
    secondColor.saturate();   // hsv (225°,55%,51%)
```

## desaturate

    changes current color saturation by negative amount ( default = 10 ) 

```js
    let firstColor = jColor('#475682'); // hsv(225°,45%,51%)
    firstColor.desaturate(5).toHSV;   // hsv (225°,50%,46%)

    let secondColor = jColor('#475682'); // hsv(225°,45%,51%)
    secondColor.desaturate().toHSV;   // hsv (225°,55%,51%)
```

## light

    changes current color lightness by amount ( default = 10 ) 

```js
    let firstColor = jColor('#475682'); // hsl(225°,45%,39%)
    firstColor.light(40).toHSL;   // hsl (225­°,45%,79%)

    let secondColor = jColor('#475682'); // hsl(225°,45%,39%)
    secondColor.changeHue().toHSL;   // hsl (225°,45%,49%)
```

## changeValue

    changes current color lightness by amount ( default = 10 ) 

```js
    let firstColor = jColor('#475682'); // hsv(225°,45%,51%)
    firstColor.changeValue(40).toHSV;   // hsv (225­°,45%,91%)

    let secondColor = jColor('#475682'); // hsv(225°,45%,51%)
    secondColor.changeValue().toHSV;   // hsv (225°,45%,61%)
```

## greyscale

    makes current color gray

```js
    let firstColor = jColor('#475682'); // #475682
    firstColor.greyScale().toHEX;   // #808080
```

## getDarker 

    makes current color more darker by percent ( default = 10 ) 100 returns black 

```js
    let firstColor = jColor('#475682'); // #475682
    firstColor.getDarker(55).toHEX;   // #1F263A

    let secondColor = jColor('#475682'); // #475682
    secondColor.getDarker().toHEX; // #3F4D75

    let thirdColor = jColor('#475682'); // #475682
    thirdColor.getDarker(100).toHEX; // #000000
```

## getLighter 

    makes current color more darker by percent ( default = 10 ) 100 returns white

```js
    let firstColor = jColor('#475682'); // #475682
    firstColor.getLighter(55).toHEX;   // #ACB3C7

    let secondColor = jColor('#475682'); // #475682
    secondColor.getLighter().toHEX; // #59678F

    let thirdColor = jColor('#475682'); // #475682
    thirdColor.getLighter(100).toHEX; // #FFFFFF
```
## invert 

    returns the complementary color ( inverse )

```js
    let firstColor = jColor('red'); // #FF0000
    firstColor.invert().toHEX;   // #00FFFF

    let secondColor = jColor('#FFF'); // #FFFFFF
    secondColor.invert().toHEX; // #000000

    let thirdColor = jColor('#475682'); // #199133
    thirdColor.invert().toHEX; // #E66ECC
```
## isDark 
```js
    let firstColor = jColor('#fff'); // #475682
    firstColor.isDark;   // false

    let secondColor = jColor('#000'); // #475682
    secondColor.isDark;   // true
```

## isLight 
```js
    let firstColor = jColor('#fff'); // #475682
    firstColor.isLight;   // true

    let secondColor = jColor('#000'); // #475682
    secondColor.isLight;   // false
```


---------------------------------------------------------

# Color Schemes 

Are you having a problem with choosing compatible colors with each other ? 
the color schemes helps you to get compatible colors to use it in your project


## Analogous

    analogous color schemes are created by using colors that are next to each other on the color wheel.
    returns an array with 5 colors the base color used in this alogrithm is the current color

```js
    let baseColor = jColor('red');
    let redAnalogousPalette = baseColor.analogous(); // ["#FA540C", "#DB2A0B", "#FF0000", "#DB0B2A", "#FA0C54"]
```

## Monochromatic

    Monochromatic schemes use different tones from the same angle on the color wheel (the same hue);
    returns an array with 5 colors the base color used in this alogrithm is the current color

```js
    let baseColor = jColor('yellow');
    let yellowMonochromaticPalette = baseColor.monochromatic(); // ["#80800D", "#FFFF4D", "#FFFF00", "#FFFF4D", "#CCCC14"]
```

## Triad

    Triadic schemes are made up of hues equally spaced around color wheel (120 degrees).
    returns an array with 3 colors the base color used in this alogrithm is the current color

```js
    let baseColor = jColor('#fe483a');
    let baseColorTriadPalette = baseColor.triad(); // ["#21FF30", "#FF483B", "#3C2EFF"]
```
    
## Shade

    Shade schemes are made up of diffierent values for the same color ( the same hue and the same saturation )
    returns an array with 5 colors the base color used in this alogrithm is the current color

```js
    let baseColor = jColor('#fe483a');
    let baseColorShadePalette = baseColor.shades(); // ["#BF362C", "#80241D", "#FF483B", "#40120F", "#E64135"]
```



---------------------------------------------------

# Colors database

```js
    jColor.colorNames // returns colors object
    jColor.flatColors // returns faltColors object
```
