var w, h, ratio, i, s, el, g, div, dragQ, game, my = {};
function anifracpickMain(rel) {
    my.version = '0.852';
    rel = typeof rel !== 'undefined' ? rel : '../';
    w = 380; h = 320;
    my.circle = { x: 260, y: 122, rad: 90 };
    my.typs = ['pizza', 'circle', 'square'];
    my.typ = my.typs[0];
    numClr = 'orange';
    denClr = 'blue';
    var id = "anifrac";
    s = "";
    s += '<style>input[type="radio"]:checked+label {font-weight: bold;}</style>';
    s += '<div style="position:relative; width:' + w + 'px; height:' + h + 'px; margin:auto; display:block; ">';
    s += '<img id="pizza" src="' + rel + 'Images/pizza.jpg" style="z-index:1; position: absolute; left:' + (my.circle.x - my.circle.rad) + 'px; top:' + (my.circle.y - my.circle.rad) + 'px; width:' + (my.circle.rad * 2) + 'px;" />';
    s += '<canvas id="canvas' + id + '" width="' + w + '" height="' + h + '" style="z-index:20; position: absolute; top: 0px; left: 0px;"></canvas>';
    s += '<div style="position:absolute; right:0px; top:-5px; z-index:22;">';
    s += getRadioHTML('', 'typ', my.typs, 'chgTyp');
    s += '</div>';
    s += '<div id="clickLbl" style="font: italic 18px Arial; color:black; position:absolute; top:10px; border: none; text-align:right; background-color: #ffffaa; z-index: 22;">Click the ' + my.typ + ' &rarr;</div>';
    s += '<div style="position:absolute;  left:0px; top:30px;">';
    s += '<canvas id="canUserFrac" style="z-index:20; position: absolute; top: 20px; left: 0px; "></canvas>';
    s += '</div>';
    s += '<div style="position:absolute; left:' + 190 + 'px; top:' + 215 + 'px; z-index:22;">';
    var denLt = 45;
    s += '<div style="position: absolute; left:' + (denLt - 55) + 'px; top:18px; text-align: left; font: 16px arial; color: #6600cc; ">Slices:</div>';
    s += '<input type="text" id="den" style="position: absolute; left:' + denLt + 'px; top:13px; width: 40px; text-align: center; border-radius: 10px; font-size: 22px; color: #0000ff; background-color: #eeffee; " value="8" onKeyUp="update()" />';
    s += '<button id="upBtn" style="position: absolute; left:' + (denLt + 44) + 'px; top:0px; font-size: 14px; color: #000aae; z-index:21; " class="togglebtn"  onclick="denUp()" >&#x25B2;</button>';
    s += '<button id="dnBtn" style="position: absolute; left:' + (denLt + 44) + 'px; top:25px; font-size: 14px; color: #000aae; z-index:21; " class="togglebtn"  onclick="denDn()" >&#x25BC;</button>';
    s += '</div>';
    s += '<div id="fracWords" style="font: italic 18px Arial; color: saddlebrown; position:absolute; left:0px; bottom:20px; width:' + w + 'px; border: none; text-align:center; background-color: lightyellow; padding:2px;">ttt</div>';
    s += '<div id="copyrt" style="position: absolute; left: 5px; bottom: 0px; font: 9px Arial; color: #6600cc; ">&copy; 2018 MathsIsFun.com  v' + my.version + '</div>';
    s += '</div>';
    document.write(s);
    el = document.getElementById('canvas' + id);
    ratio = 2;
    el.width = w * ratio;
    el.height = h * ratio;
    el.style.width = w + "px";
    el.style.height = h + "px";
    g = el.getContext("2d");
    g.setTransform(ratio, 0, 0, ratio, 0, 0);
    sectors = [true]; my.fracUser = new Frac('canUserFrac');
    my.fracUser.drawMe(3, 5);
    angle = 0.;
    angles = [[0, 0, 1, "1,0", 1], [30, 1, 6, "+3+1", 1], [45, 1, 4, "+2+2", 1], [60, 1, 3, "+1+3", 1], [90, 1, 2, "0,1", 2], [120, 2, 3, "-1+3", 2], [135, 3, 4, "-2+2", 2], [150, 5, 6, "-3+1", 2], [180, 1, 1, "-1,0", 3], [210, 7, 6, "-3-1", 3], [225, 5, 4, "-2-2", 3], [240, 4, 3, "-1-3", 3], [270, 3, 2, "0,-1", 4], [300, 5, 3, "+1-3", 4], [315, 7, 4, "+2-2", 4], [330, 11, 6, "+3-1", 4], [360, 2, 1, "", 4]];
    el.addEventListener('touchmove', function (e) { var touch = e.targetTouches[0]; e.clientX = touch.clientX; e.clientY = touch.clientY; e.touchQ = true; onmousemove(e); e.preventDefault(); });
    el.addEventListener('mousemove', mouseMove); el.addEventListener('mousedown', mouseDown);
    my.denom = getDen();
    document.getElementById("typ0").checked = true; chgTyp(0);
    document.getElementById('clickLbl').style.visibility = 'visible';
}
function chgTyp(n) {
    my.typ = my.typs[n];
    document.getElementById('clickLbl').style.visibility = 'hidden';
    update();
}
function mouseMove(e) {
    var rect = el.getBoundingClientRect(); var x = (e.clientX - rect.left) - my.circle.x; var y = (e.clientY - rect.top) - my.circle.y; var inQ = false; switch (my.typ) { case 'pizza': case 'circle': if (x * x + y * y < my.circle.rad * my.circle.rad) inQ = true; break; case 'square': if (x < -my.circle.rad) break; if (x > my.circle.rad) break; if (y < -my.circle.rad) break; if (y > my.circle.rad) break; inQ = true; break; default: }
    if (inQ) { document.body.style.cursor = "pointer"; } else { document.body.style.cursor = "default"; }
}
function mouseDown(e) {
    var rect = el.getBoundingClientRect(); var x = (e.clientX - rect.left) - my.circle.x; var y = (e.clientY - rect.top) - my.circle.y; switch (my.typ) {
        case 'pizza': case 'circle': if (x * x + y * y < my.circle.rad * my.circle.rad) {
            angle = Math.atan2(-y, x); if (angle < 0) angle += 2 * Math.PI; numer = Math.round(my.denom * angle / (2 * Math.PI) - 0.5); if (sectors[numer]) { sectors[numer] = !sectors[numer]; } else { sectors[numer] = true; }
            update();
        }
            break; case 'square': if (x < -my.circle.rad) break; if (x > my.circle.rad) break; if (y < -my.circle.rad) break; if (y > my.circle.rad) break; var along = x + my.circle.rad; var wd = my.circle.rad * 2 / my.denom; numer = Math.round(along / wd - 0.5); console.log("rect", x, y, along, wd, numer); if (sectors[numer]) { sectors[numer] = !sectors[numer]; } else { sectors[numer] = true; }
            update(); break; default:
    }
    document.getElementById('clickLbl').style.visibility = 'hidden';
}
function update() {
    el = g.canvas;
    g.clearRect(0, 0, el.width, el.height);
    switch (my.typ) {
        case 'pizza': document.getElementById('pizza').style.visibility = 'visible';
            numer = g.drawChosenSectors(sectors, my.denom, "rgba(255, 255, 255, 0.0)", "rgba(255, 255, 255, 0.85)");
            break;
        case 'circle': document.getElementById('pizza').style.visibility = 'hidden';
            numer = g.drawChosenSectors(sectors, my.denom, "#8888ff", "white");
            break;
        case 'square': document.getElementById('pizza').style.visibility = 'hidden';
            numer = g.drawChosenRectSlices(sectors, my.denom, "orange", "white");
            break;
        default:
    }
    wordObj = new Words();
    var wordStr = wordObj.num2words(numer, false, my.denom);
    document.getElementById("fracWords").innerHTML = '"' + wordStr + '"';
    my.fracUser.drawMe(numer, my.denom);
}
function getDen() {
    var n = document.getElementById("den").value; n = n.replace(/,/gm, ""); return parseInt(n);
}
function denDn() {
    var n = getDen();
    if (n > 2) { n--; document.getElementById("den").value = n; my.denom = n; update(); }
}
function denUp() {
    var n = getDen();
    if (n < 36) { n++; document.getElementById("den").value = n; my.denom = n; update(); }
}
CanvasRenderingContext2D.prototype.drawChosenSectors = function (sectors, denom, onClr, offClr) {
    g = this; var n = 0; if (denom > 100) { var f = 100 / denom; numer *= f; denom *= f; console.log("drawSectors=" + numer, denom); }
    var dAngle = 2 * Math.PI / denom; var angleNum = 0; for (var k = 0; k < denom; k++) {
        g.beginPath(); g.lineWidth = 1; g.strokeStyle = "black"; g.moveTo(my.circle.x, my.circle.y); g.arc(my.circle.x, my.circle.y, my.circle.rad, -angleNum, -angleNum - dAngle, true); g.lineTo(my.circle.x, my.circle.y); g.stroke(); if (sectors[k]) { g.fillStyle = onClr; g.fill(); n++; } else { g.fillStyle = offClr; g.fill(); }
        angleNum += dAngle;
    }
    return n;
};
CanvasRenderingContext2D.prototype.drawChosenRectSlices = function (sectors, denom, onClr, offClr) {
    g = this; var n = 0; if (denom > 100) { var f = 100 / denom; numer *= f; denom *= f; console.log("drawSectors=" + numer, denom); }
    var wd = my.circle.rad * 2; var ht = my.circle.rad * 2; var lt = my.circle.x - wd / 2; var tp = my.circle.y - ht / 2; var dWd = wd / denom; var currWd = 0; for (var k = 0; k < denom; k++) {
        g.beginPath(); g.lineWidth = 1; g.strokeStyle = "black"; g.rect(lt + currWd, tp, dWd, ht)
        g.stroke(); if (sectors[k]) { g.fillStyle = onClr; g.fill(); n++; } else { g.fillStyle = offClr; g.fill(); }
        currWd += dWd;
    }
    return n;
};

function getRadioHTML(prompt, id, lbls, func) {
    var s = '';
    s += '<div style="display:inline-block; padding:3px; margin:3px; background-color:rgba(255,255,255,0.5);">';
    s += prompt;
    for (var i = 0; i < lbls.length; i++) {
        var idi = id + i;
        var lbl = lbls[i];
        s += '<input id="' + idi + '" type="radio" name="' + id + '" value="' + lbl + '" onclick="' + func + '(' + i + ');">';
        s += '<label for="' + idi + '">' + lbl + ' </label>';
    }
    s += '</div>';
    return s;
}
function Words() {
    var Lang = "en";
    switch (Lang) {
        case "en": LangDescrNumberComma = ",";
            LangDescrDenomUnit = "One";
            LangDescrDenomHalves = "Halves";
            LangDescr10Join = " ";
            Langand = "and";
            Langpoint = "point";
            LangDescrDenomHyphen = "-";
            LangDescrDenomOrdQ = "y";
            LangDescrDenom_th = "th";
            LangDescrDenom_s = "s";
            langnumexact = new Array('Zero');
            langthousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion', 'Sextillion', 'Septillion'];
            langnum = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Twenty One', 'Twenty Two', 'Twenty Three', 'Twenty Four', 'Twenty Five', 'Twenty Six', 'Twenty Seven', 'Twenty Eight', 'Twenty Nine'];
            langnum10 = ['Zero', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            langnum100 = ['Zero', 'One Hundred', 'Two Hundred', 'Three Hundred', 'Four Hundred', 'Five Hundred', 'Six Hundred', 'Seven Hundred', 'Eight Hundred', 'Nine Hundred'];
            langnumer = ['Zero'];
            langfirstfractions = [null, 'Whole', 'Half', 'Third', 'Quarter'];
            langunitord = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
            langtenord = ['', 'Tenth', 'Twentieth', 'Thirtieth', 'Fortieth', 'Fiftieth', 'Sixtieth', 'Seventieth', 'Eightieth', 'Ninetieth'];
            break;
        default:
    }
}
Words.prototype.num2words = function (num, reducedfraction, showdenom, decAsFractionQ) { return this.str2words(num.toString(), reducedfraction, showdenom, decAsFractionQ); }; Words.prototype.str2words = function (num, reducedfraction, showdenom, decAsFractionQ) {
    var s = ""; var negative_flag = ""; if (num.charAt(0) == "-") { negative_flag = 'Negative '; num = num.substring(1); }
    var origNumber = num; var parts = num.split('.'); var integer = parts[0]; var decpart = parts[1]; var decimalQ = (showdenom != 0 || parts.length > 1); if (langnumexact[integer] != undefined) { s = langnumexact[integer]; } else {
        if (showdenom != 0 && langnumer[integer] != undefined) { s = langnumer[integer]; } else {
            for (var i = 0; integer.length > 0; i++ , integer = integer.substr(0, -Math.min(3, integer.length))) { var threedig = integer.substr(-Math.min(3, integer.length)); if (parseInt(threedig) != 0) { if (i == 0) { s = this.handleThreeDigit(threedig); } else { if (langthousands[i] != undefined) { if (s.length == 0) { s = this.handleThreeDigit(threedig) + ' ' + langthousands[i]; } else { s = this.handleThreeDigit(threedig) + ' ' + langthousands[i] + LangDescrNumberComma + ' ' + s; } } else { s = "A Big Number!"; } } } }
            s = negative_flag + s;
        }
    }
    if (decimalQ) {
        if (showdenom != 0) { if (origNumber == "1") s = LangDescrDenomUnit; s += ' ' + this.describeDenom(showdenom, false, origNumber != "1"); } else {
            var decimal = ""; if (reducedfraction == "n") { decimal = this.handleDecimal(decpart, false, decAsFractionQ); } else { decimal = this.handleDecimal(decpart, true, decAsFractionQ); }
            if (decimal.length > 0) { if (decAsFractionQ) { if (s == langnumexact[0]) { s = decimal; } else { s += ' ' + Langand + ' ' + decimal; } } else { s += ' ' + Langpoint + ' ' + decimal; } } else { }
        }
    }
    return (s);
}; Words.prototype.placeStr = function (power10) {
    var numStr = ""; if (power10 >= 0) { numStr = "1" + "0".repeat(power10); } else {
        if (power10 < -9) { return ""; }
        numStr = "0." + "0".repeat(-1 - power10) + "1";
    }
    console.log("placeStr numStr=" + numStr); var s = this.str2words(numStr); if (s.substr(0, 4) == "One ") { s = s.substr(4); if (s.substr(0, 4) == "One-") { s = s.substr(4); } }
    if (s == "One") s = "Unit"; s += "s"; return (s);
}; Words.prototype.handleThreeDigit = function (number) {
    var s = ""; if (number.length >= 3) {
        if (number.charAt(0) != "0") { var hundreds = number.substr(0, 1); s += langnum100[hundreds]; }
        number = number.substr(1);
    }
    var twodig = this.handleTwoDigit(number); if (s.length > 0 && twodig.length > 0) s += ' '; s += twodig; return (s);
}; Words.prototype.handleTwoDigit = function (number) {
    number = parseInt(number).toString(); if (parseInt(number) < 30) { return (langnum[number]); }
    var s = ""; var units = parseInt(number.toString().substr(-1)); var tens = parseInt(number.toString().substr(0, 1)); if (units == 0) { s = langnum10[tens]; } else { s = langnum10[tens] + " " + langnum[units]; }
    return (s);
}; Words.prototype.handleDecimal = function (numStr, reduceQ, asFractionQ) {
    console.log("handleDecimal=" + numStr, reduceQ); var s = ""; if (numStr == "") return (s); var denominator = "1" + "0".repeat(numStr.length); if (reduceQ) { }
    if (asFractionQ) {
        var num = parseInt(numStr); if (langnumer[numStr] != undefined) { s = langnumer[numStr]; } else { s = this.num2words(num); }
        console.log("q1=" + denominator); s += " " + this.describeDenom(parseInt(denominator), false, num != 1);
    } else { for (var i = 0; i < numStr.length; i++) { s += this.str2words(numStr.charAt(i)) + " "; } }
    return (s);
}; Words.prototype.describeDenom = function (denom, callself, pluralq) {
    if (denom == 0) return "undefined"; if (denom == 2 && pluralq) return LangDescrDenomHalves; var s = "umptienths"; denom = Math.abs(denom); var hyphen = LangDescrDenomHyphen; if (!callself && langfirstfractions[denom] != undefined) { s = langfirstfractions[denom]; } else { if (LangDescrDenomOrdQ == "y") { if (denom < 100) { if (denom < 20) { s = langunitord[denom]; } else { var tens = parseInt(denom / 10); var units = denom - tens * 10; if (units == 0) { s = langtenord[tens]; } else { s = this.num2words(tens * 10, false, 0) + hyphen + langunitord[units]; } } } else { tens = parseInt(denom.toString().slice(-2)); var rest = parseInt(denom.toString().substr(0, denom.toString().length - 2) + "00"); if (tens == 0) { s = (this.num2words(rest, false, 0)).trim() + LangDescrDenom_th; } else { s = this.num2words(rest, false, 0) + " " + this.describeDenom(tens, false); } } } else { s = this.num2words(denom) + LangDescrDenom_th; } }
    if (pluralq && !callself) s += LangDescrDenom_s; s = s.replace(/,/g, ""); s = s.replace(/ /g, hyphen); s = s.replace(hyphen + hyphen, hyphen); return (s);
}; function gcf(n1, n2) {
    var x = 1; if (n1 > n2) { n1 = n1 + n2; n2 = n1 - n2; n1 = n1 - n2; }
    if (n2 == (Math.round(n2 / n1)) * n1) { x = n1; } else {
        for (var i = Math.round(n1 / 2); i > 1; i = i - 1) {
            if (n1 == (Math.round(n1 / i)) * i)
                if (n2 == (Math.round(n2 / i)) * i) { x = i; i = -1; }
        }
    }
    return x;
}
function Frac(canName) { this.wd = 180; this.ht = 120; this.lt = 105; this.tp = 60; var el = document.getElementById(canName); var ratio = 2; el.width = this.wd * ratio; el.height = this.ht * ratio; el.style.width = this.wd + "px"; el.style.height = this.ht + "px"; this.g = el.getContext("2d"); this.g.setTransform(ratio, 0, 0, ratio, 0, 0); this.labelsQ = true; this.labels = ['Slices we', 'have:', 'Total', 'slices:']; }
Frac.prototype.drawMe = function (numer, denom) {
    var plusQ = true; var xp = this.lt; var yp = this.tp; var sz = 50; var g = this.g; g.clearRect(0, 0, g.canvas.width, g.canvas.height); g.font = (sz * 1.5) + "px Arial"; g.textAlign = "center"; g.fillStyle = '#def'; g.beginPath(); g.rect(xp - 35, 0, 70, this.ht)
    g.fill(); if (plusQ) { } else { g.fillText("-", xp - 18, yp + 4); }
    g.font = "bold " + sz + "px Arial"; var up = sz * 0.2; var dn = sz * 0.95; g.fillStyle = numClr; g.fillText(numer, xp, yp - up); g.fillStyle = denClr; g.fillText(denom, xp, yp + dn); if (this.labelsQ) { g.font = "bold " + (sz / 4) + "px Arial"; g.textAlign = "right"; g.fillStyle = numClr; g.fillText(this.labels[0], xp - 40, yp - up - sz / 3 - 7); g.fillText(this.labels[1], xp - 40, yp - up - sz / 3 + 7); g.fillStyle = denClr; g.fillText(this.labels[2], xp - 40, yp + dn - sz / 3 - 7); g.fillText(this.labels[3], xp - 40, yp + dn - sz / 3 + 7); }
    g.strokeStyle = 'black'; g.beginPath(); g.lineWidth = sz / 14; g.moveTo(xp - sz * 0.6, yp); g.lineTo(xp + sz * 0.6, yp); g.stroke();
}