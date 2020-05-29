const table = document.getElementById("mosaic");

let _keyMap = {};

/**
 * Bind the onkeydown event to our handler function that allows for the onKey() function.
 */
document.onkeydown = e => _handleKeyDown(e);

/**
 * Handles onkeydown events with the keyMap that the user can define with their onKey() declarations.
 * @param {Event} e 
 */
function _handleKeyDown(e) {
    // if the key has a function mapped to it
    if (e.key in _keyMap) {
        // call the function that is mapped to the key
        _keyMap[e.key]();
    }
}

/**
 * Utility function to pause execution for a given amount of milliseconds.
 * @param {Number} ms 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * A class that allows for color interaction.
 */
class Color {
    /**
     * Get the RGB components of an input.
     * 
     * @param {any} color 
     * @returns {array} colorComponents
     */
    static getComponents(color) {
        // Set hidden pixel to be our color to test
        let colorTest = document.getElementById("colorTest");
        colorTest.style.backgroundColor = color;

        // Get the computed color
        let computedColor = window.getComputedStyle(colorTest).getPropertyValue("background-color");
        computedColor = computedColor.replace("rgb(", "").replace(")", "");

        // Split into array and convert to integers
        let colorComponents = computedColor.split(", ").map((x) => parseInt(x, 10)); 

        return colorComponents;
    }

    /**
     * Check if all the passed colors are the same.
     * 
     * @param  {...any} colors 
     */
    static isSame(...colors) {
        // flatten array
        if (colors.length)
            colors = colors.flat();

        // if there are more than two colors, compare them
        if (colors.length >= 2) {
            // normalize colors so they are all in "R, G, B" format
            for (let i = 0; i < colors.length; i++) {
                let color = colors[i];

                // if in hex or color name format, turn into rgb format
                if (!color.includes(",") || color.includes("rgb")) {
                    color = Color.getComponents(color);

                    // convert the colorComponents array of each color into R, G, B format
                    color = color.join(",");
                }
                    
                // update colors array
                colors[i] = color;
            }

            // check if all the colors are equal
            return colors.every(color => color == colors[0]);
        }
    }

    /**
    * Generates a random color.
    */
    static random() {
        const letters = "0123456789ABCDEF";

        let color = "#";
        for (let i = 0; i < 6; i++) 
            color += letters[Math.floor(Math.random() * 16)];
                
        return color;
    };

    /**
     * Invert the color.
     */
   static invert(color) {
        // Set hidden pixel to be our color to test
        var colorTest = document.getElementById("colorTest");
        colorTest.style.backgroundColor = color;

        // Get the computed color
        var color = window.getComputedStyle(colorTest).getPropertyValue("background-color");
        color = color.replace("rgb(", "").replace(")", "");

        // Split into array and convert to integers
        let colorValues = color.split(", ").map(function(x) { 
            return parseInt(x, 10);
        });

        // Invert red, green, and blue color values
        colorValues[0] = 255 - colorValues[0];
        colorValues[1] = 255 - colorValues[1];
        colorValues[2] = 255 - colorValues[2];

        // Return the new color in rgb() format
        return "rgb(" + colorValues.join(", ") + ")";
    };
}

/**
 * A class that 
 */
class Tile {
    constructor(cellRef) {
        // set the cell propery of the object to the reference to HTML TableCell
        this.cell = cellRef;

        // defaults
        this._borderColor = "black";
        this._borderStyle = "solid";
        this._borderWidth = 1;
        this._color = "#eeeeee";
        this._gradient = "";
        this._text = "";
    }

    static setSize(size) {
        // change the size of table cells
        const sheet = new CSSStyleSheet();
        sheet.replaceSync("td { padding: " + size + "px }");

        // apply the stylesheet to the document
        if (document.adoptedStyleSheets)
            document.adoptedStyleSheets = document.adoptedStyleSheets.concat(sheet);
        else
            document.adoptedStyleSheets = [sheet];
    }

    static setRadius(radius) {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync("td { border-radius: " + radius + "%; }");

        // apply the stylesheet to the document
        if (document.adoptedStyleSheets)
            document.adoptedStyleSheets = document.adoptedStyleSheets.concat(sheet);
        else
            document.adoptedStyleSheets = [sheet];
    }

    get cellRef() {
        return this.cell;
    }

    get borderColor() {
        return this._borderColor;
    }
    
    set borderColor(color) {
        this._borderColor = color;

        this.cell.style.borderColor = color;
    }

    setBorderColor(color) {
        // without the underscore means its calling the setter
        this.borderColor = color;

        return this;
    }

    get borderStyle() {
        return this._borderStyle;
    }

    set borderStyle(borderStyle) {
        this._borderStyle = borderStyle;

        this.cell.style.borderStyle = borderStyle;
    }

    setBorderStyle(borderStyle) {
        // without the underscore means its calling the setter
        this.borderStyle = borderStyle;

        return this;
    }

    get borderWidth() {
        return this._borderWidth;
    }

    set borderWidth(width) {
        // if the width is a number, add px
        if (!isNaN(width))
            this._borderWidth = width + "px";
        // if is already in px form or is word aka not a number
        else
            this._borderWidth = width;

        this.cell.style.borderWidth = this._borderWidth;
    }

    setBorderWidth(width) {
        // without the underscore means its calling the setter
        this.borderWidth = width;

        return this;
    }

    get color() {
        // return Color.getComponents(this._color);
        return this._color;
    }

    set color(color) {
        // set color of Tile object
        this._color = color;

        // get rid of any gradient it has
        this.cell.style.backgroundImage = "";

        // set background color
        this.cell.style.backgroundColor = color;
    }

    setColor(color) {
        // without the underscore means its calling the setter
        this.color = color;

        return this;
    }

    get gradient() {
        return this._gradient;
    }

    set gradient(colors) {
        // get rid of any color it has
        this.color = "";
        
        this._gradient = colors;

        // set the pixel gradient
        this.cell.style.backgroundImage = '-webkit-linear-gradient(' + colors.join(", ") + ')';
    }

    set backgroundImage(url) {
        this._backgroundImage = url;

        this.cell.style.background = "url(" + url + ")";
        this.cell.style.backgroundSize = "cover";
    }

    get backgroundImage() {
        return this._backgroundImage;
    }

    set transform(transform) {
        this.cell.style.transform = transform;
    }

    setGradient(...colors) {
        this.gradient = colors;

        return this;
    }
}

/**
 * A class that wraps audio-related Web APIs.
 */
class Player {
    static setVoice(voice) {
        this.voice = voice;
    }

    static play(url) {
        const audio = new Audio(url);

        audio.play();
    }

    static speak(text) {
        const utterThis = new SpeechSynthesisUtterance(text);

        if (this.voice)
            utterThis.voice = this.voice;

        window.speechSynthesis.speak(utterThis);
    }

    static getVoices() {
        return window.speechSynthesis.getVoices().map(voice => voice);
    }
}

/**
 * The Mosaic class.
 */
class Mosaic {
    constructor(width, height) {
        // set the height and width
        this._height = height;
        this._width  = width;

        // clear any leftover table HTML
        table.innerHTML = "";

        // create grid without tiles
        this._tiles = [];

        // create table with height and width parameters
        for (let y = 0; y < this._height; y++) {
            let tableRow = table.insertRow(y);
            let arrayRow = [];

            for (let x = 0; x < this._width; x++)  {
                arrayRow.push({
                    "cellRef": tableRow.insertCell(x),
                    "texture": undefined
                });
            }

            this._tiles.push(arrayRow);
        }
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    /**
     * Get the raw DOM element from the table in case the user wants to do something 
     * outside of the normal Mosaic API.
     */
    getTile(x, y) {
        // bounds checking
        if (x >= 0 && x < this._width && y >= 0 && y < this._height)
            return this._tiles[this._height - 1 - y][x];
    }

    /**
     * Clear the Mosaic's tile color values.
     */
    clear() {
        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                this.getTile(x, y).cellRef.style.backgroundImage = "";
                this.getTile(x, y).cellRef.style.transform = "";
                this.getTile(x, y).cellRef.style.backgroundColor = "#eeeeee";
            }
        }
    }
}

const _moz = new Mosaic(8, 8);

/**
 * A class that allows for reusable tile textures.
 */
class Texture {
    constructor(...args) {
        if (!args.length)  return;

        this._type = args[0];

        if (this._type == "color") {
            this._color = args[1];
        }
        else if (this._type == "gradient") {
            this._gradientType = args[1];
            this._colors       = args[2];
        }
        else if (this._type == "image") {
            this._imgSrc = args[1];
        }
    }

    get type() {
        return this._type;
    }

    get color() {
        return this._color;
    }

    get colors() {
        return this._colors;
    }

    get gradientType() {
        return this._gradientType;
    }

    get imgSrc() {
        return this._imgSrc;
    }
}

/**
 * Create a tile texture.
 * @param  {...String} args 
 */
function createTexture(...args) {
    if (!args.length) return;
    if (args.length < 2) return;

    const type = args[0];

    if (type == "color") {
        const color = args[1];

        return new Texture(type, color);
    }
    else if (type == "gradient") {
        const gradientType = args[1];
        const colors       = args.slice(2);

        return new Texture(type, gradientType, colors);
    }
    else if (type == "image") {
        const imgSrc = args[1];

        return new Texture(type, imgSrc);
    }
}

/**
 * Get the texture of a tile.
 * @returns {Texture} texture
 */
function getTexture(x, y) {
    return _moz.getTile(x, y).texture;
}

/**
 * Set the texture of a tile.
 * @param {Number} x 
 * @param {Number} y 
 * @param {Texture} texture 
 */
function setTexture(x, y, texture) {
    const tile = _moz.getTile(x, y);

    tile.texture = texture;

    if (texture.type == "color") {
        tile.cellRef.style.backgroundColor = tile.texture.color;
    }
    else if (texture.type == "gradient") {
        if (texture.gradientType == "linear") {
            tile.cellRef.style.backgroundImage = "linear-gradient(" + tile.texture.colors.join(",") + ")";
        }
        else if (texture.gradientType == "radial") {
            tile.cellRef.style.backgroundImage = "radial-gradient(" + tile.texture.colors.join(",") + ")";
        }
    }
    else if (texture.type == "image") {
        tile.cellRef.style.backgroundImage = "url('" + tile.texture.imgSrc + "')";
        tile.cellRef.style.backgroundSize = "cover";
    }
}

/**
 * Set the textures of a rectangle.
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @param {Texture} texture 
 */
function fillRect(x1, y1, x2, y2, texture) {
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            setTexture(x, y, texture);
        }
    }
}

/**
 * Add a click listener to the Mosaic tile.
 * @param {Number} x 
 * @param {Number} y 
 * @param {Function} func 
 */
function onClick(x, y, func) {
    _moz.setTileOnClick(x, y, func);
}

/**
 * Add a mouse over listener to the Mosaic tile.
 * @param {Number} x 
 * @param {Number} y 
 * @param {Function} func 
 */
function onMouseOver(x, y, func) {
    _moz.setTileOnMouseOver(x, y, func);
}

/**
 * A wrapper that allows seperate declarations of key listener functions.
 * @param {String} key
 * @param {Function} func
 */
function onKey(key, func) {
    let keyEvent;
	
    // if is a letter key
    if (key.length === 1) {
        // key letters are lowercase in events
        keyEvent = key.toLowerCase();
    }
    // if is some other key
    else {
        // other keys are in proper captalization in events
        keyEvent = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
    }
	
    // if the func is defined and is a function
    if (func && typeof func == "function") {
        // map the key to the function
        _keyMap[keyEvent] = func;
    }
}

/**
 * Get the width of the Mosaic.
 * @returns {Number} width
 */
function getWidth() {
    return _moz.width;
}

/**
 * Get the height of the Mosaic.
 * @returns {Number} height
 */
function getHeight() {
    return _moz.height;
}

/**
 * Clear the Mosaic.
 */
function clear() {
    _moz.clear();
}