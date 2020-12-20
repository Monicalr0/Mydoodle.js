"use strict"

const bg = new BlockGenerator();
// bg.makeBlock();
// const bannerWeather = document.getElementById('banner');
function examples() {
    let randomNSloc = document.getElementById("randomNS")
    let randomNS = bg.makeBlock("random", "Example for Random, This will randomly generate a color upon refresh, onclick.", "normal", 0, randomNSloc)

    bg.changeSize(500, 250, randomNS)
    // For any other css style change, can direct access by developer.
    // bg.addOnclick("random", randomNS)
    document.getElementById(randomNS).style.float = "left";

    let weatherNSloc = document.getElementById("weatherNS")
    let weatherNS = bg.makeBlock("weather", null, "normal", 0, weatherNSloc)
    weatherNSloc.style.width = document.getElementById(weatherNS).style.width;
    // bg.changeSize(500,250,weatherNSloc)

    let moodNSloc = document.getElementById("moodNS")
    let moodNS = bg.makeBlock("mood-default", "Example for Random, This will randomly generate a color upon refresh, onclick.", "normal", 0, moodNSloc)
    bg.changeSize(500, 250, moodNS)

    let selectLoc = document.getElementById("selection")
    let select = bg.makeBlock("random", "Example for Selection, here the default is random but choice are gave to user" , "normal", 1, selectLoc)
    bg.changeSize(500, 250, select)
}
examples()