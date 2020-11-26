"use strict"

function BlockGenerator(){
    this.blocks = [];
}

BlockGenerator.prototype = {
    "theme": "random",

    makeBlock: function(theme = "random", inputText = "Input Here", type = "normal",
                        displayChoice = 1){
        this.theme = theme;
        const block = document.createElement('div');

        if(type === "normal") {
            block.style = "text-align: center;";
            block.class = "MyDoodleBlock";
            block.id = "myDoodleBlock-" + this.blocks.length;
        }

        const head = $('body');
        head.append(block)
        this.blocks.push(block)
        this.updateView(theme, block.id, inputText);
        console.log("block " + block.id + " created")
    },

    changeTheme: function(theme){
        this.theme = theme;
        this.updateView(theme);
    },

    //the user can change
    updateView: function(theme, blockID = "null", inputText = null){
        //if blockID are not specified, the default is to change all the blocks created by my doodles
        if(theme === "random"){
            const colors= ['aqua', 'blue', 'fuchsia', 'gray', 'green',
                'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
                'silver', 'teal',  'yellow'];
            const random = Math.floor(Math.random() * colors.length);
            let block;
            if(blockID !== "null") {
                block = document.getElementById(blockID);
            }
            else{
                block = document.getElementsByClassName(blockID);
            }
            block.style.backgroundColor = colors[random];
            const text = document.createElement('strong');
            text.innerText = inputText;
            block.appendChild(text);
            // console.log(colors[random]);
            // document.getElementById(blockID).
        }
        else if(theme === "weather"){
            /*
            The image and weather data should provided by server, here we use image saved in same file
            and weather randomly chosen from array.In actual use case the developer can set image (there
            will be a function for this in the later version). Also in the actual use case the weather,
            temperature etc. will be connected to a weather provided website or server.
            */
            const weathers = ["sunny", "cloudy", "drizzle"];
            const suggestions = ["Enjoy your day!", "Nice! I hate sunshine", "Don't forget your umbrella"]
            const random = Math.floor(Math.random() * weathers.length);
            let block;
            if(blockID !== "null") {
                block = document.getElementById(blockID);
            }
            else{
                block = document.getElementsByClassName(blockID);
            }
            //for now the weather block will have fixed width and length due to image
            //later version will be changed to adjustable
            block.style = "text-align: center; width: 320px; height: 159px;"
            const weatherToday = weathers[random];
            const weatherIcon = document.createElement('img')
            weatherIcon.setAttribute('src', weatherToday+".png")
            weatherIcon.style = "float: left";
            block.appendChild(weatherIcon);

            const weather = document.createElement('h1');
            weather.style = "margin-top: 25px;"
            weather.innerText = weatherToday;
            block.appendChild(weather);

            const text = document.createElement('strong');
            text.innerText = suggestions[random];
            block.appendChild(text);

            block.style.backgroundColor = "light";

        }
    },

    //can use this to change width, length etc.
    setStyle(style, blockID){
        document.getElementById(blockID).style = style;
    },

    addTheme: function(theme){}


}