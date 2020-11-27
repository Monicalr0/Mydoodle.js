"use strict"

const bg = new BlockGenerator();
// bg.makeBlock();
const bannerWeather = document.getElementById('banner');
bg.makeBlock("weather", null, "normal", 1, bannerWeather)
bg.makeBlock("random", "Example for Random, This will randomly generate a color upon refresh.", "normal", 1, )

