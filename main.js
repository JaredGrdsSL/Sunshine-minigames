/* CLICKER */

let flowerCount = 0;
let flowerCash = 0;
let autoCount = 0;
let auto1price = 10;
let autoDoublePrice = 30;
let autoDoubleNeed = 5; // Amount of autoCount's that are required

let tick = 0; // Every frame the tick increases by 1

let FLPS = 0; // Flowers per second
let FLPSDivider = 1;

let convertRandom = Math.round(((Math.random() + 0.3) * 10) / 2); // The convertion integer used

requestAnimationFrame(Update);

function Update() {
    requestAnimationFrame(Update);
    tick++;

    document.getElementById('sunflowerCount').textContent = "SUNFLOWER COUNT: " + Math.floor(flowerCount);

    flowerCount += FLPS;
    FLPS = autoCount / FLPSDivider;

    if (tick % 360 == 1) {
        convertRandom = Math.round(((Math.random() + 0.3) * 10) / 2);
    }

    document.getElementById('conversionRate').textContent = "Conversion Rate: " + convertRandom + " sunflowers = 1 cash";
}

String.prototype.format = function() { // Nice piece of string formatting code written by Vlad Bezden as a reply on a stack thread
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

function flowerClicked() {
    flowerCount++;
    document.getElementById('sunflowerCount').textContent = "SUNFLOWER COUNT: " + flowerCount;

    if (flowerCount > 10) {
    }
}

function sellOne() {
    if (flowerCount >= convertRandom) {
        flowerCount -= convertRandom;
        flowerCash += 1;
    }
    document.getElementById('sunflowerCount').textContent = "SUNFLOWER COUNT: " + flowerCount;
    document.getElementById('sunflowerCash').textContent = "CASH: " + flowerCash;
}

function sellTen() {
    if (flowerCount >= convertRandom * 10) {
        flowerCount -= convertRandom * 10;
        flowerCash += 10;
    }
    document.getElementById('sunflowerCount').textContent = "SUNFLOWER COUNT: " + flowerCount;
    document.getElementById('sunflowerCash').textContent = "CASH: " + flowerCash;
}

function sellAll() {
    if (flowerCount >= convertRandom) {
        flowerCash += Math.floor(flowerCount / convertRandom);
        flowerCount = flowerCount % convertRandom;
    }
    document.getElementById('sunflowerCount').textContent = "SUNFLOWER COUNT: " + flowerCount;
    document.getElementById('sunflowerCash').textContent = "CASH: " + flowerCash;
}

function auto1() {
    if (flowerCash >= auto1price) {
        flowerCash -= auto1price;
        autoCount++;
        auto1price = (autoCount * 15);
        FLPSDivider = 60;
        document.getElementById('autoClicker1').innerHTML =  "Auto Clicker +1 <br> [{0} cash]".format(auto1price);
        document.getElementById('autoCount').textContent = "Auto Clicker Count: " + autoCount;
        document.getElementById('sunflowerCash').textContent = "CASH: " + flowerCash;
    }
}

function doubleAuto(){
    if (flowerCash >= autoDoublePrice && autoCount >= autoDoubleNeed) {
        flowerCash -= autoDoublePrice;
        autoCount *= 2;

        autoDoublePrice = (autoCount * 5);
        autoDoubleNeed = (autoCount);
    }
    document.getElementById('autoClickDouble').innerHTML = "Auto Clicker x2<br>[{0} auto clickers + {1} cash]".format(autoDoubleNeed, autoDoublePrice)
    document.getElementById('autoCount').textContent = "Auto Clicker Count: " + autoCount;
    document.getElementById('sunflowerCash').textContent = "CASH: " + flowerCash;
}