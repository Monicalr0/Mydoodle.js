"use strict";

(function(global, document, $) {
    function BlockGenerator(){
    this.blocks = [];
    this.themes = ["random", "weather", "mood-default"]
    this.colors = ['aqua', 'PaleTurquoise', 'Thistle', 'PaleGreen',
        'LightCyan', 'Wheat', 'Linen', 'PeachPuff', 'Lavender', 'pink', 'teal',  'salmon'];
    this.defaultInput = "this is the default input that can be changed"
}

    BlockGenerator.prototype = {

        makeBlock: function(theme = "random", inputText = "Input Here", type = "normal",
                            displayChoice = 0, parentNode = "body"){
            // create the block to put content
            const block = document.createElement('div');


            //default type of display is "normal", which means an automatically generated block
            if(type === "normal") {
                // set block style
                block.style = "text-align: center;";
                block.class = "MyDoodleBlock";
                block.id = "myDoodleBlock-" + this.blocks.length;
            }
            if(parentNode === "body")
            {
                parentNode = $('body');
            }
            parentNode.append(block)
            this.blocks.push(block)
            this.updateView(theme, block.id, inputText);

            //default display choice is 0, which will only update the block upon refresh or based on current data like weather.
            //other display choice is 1, where there will be selection offered to user
            if(displayChoice === 1)
            {

                // let selectionForm = document.createElement("form")
                let selection = document.createElement("select")
                selection.id = "themeSelect"
                const themes = this.themes;
                for (let choice of themes){
                    let choose = document.createElement("option")
                    choose.value = choice
                    choose.innerText = choice
                    selection.appendChild(choose)
                }

                parentNode.appendChild(selection)

                let radio = document.createElement("form")
                radio.id = "choiceGiven"
                parentNode.append(radio)

                this.updateRadio(theme, radio.id, block.id)


                let select = document.getElementById("themeSelect")
                select.onchange = function (){
                    const width = block.style.width;
                    const height = block.style.height;
                    // block.style = "text-align: center;";
                    block.innerHTML = ``
                    BlockGenerator.prototype.updateView(selection.value, block.id,"default Input")
                    BlockGenerator.prototype.changeSize(width, height, block.id)

                    radio.innerHTML = ``
                    BlockGenerator.prototype.updateRadio(selection.value, radio.id, block.id)

                }

                //append a line in between and then the selection part.
                // block.append(document.createElement("br"))


            }

            console.log("block " + block.id + " created");
            return block.id;
        },

        //This function is for developer to change the default input for selection when needed
        // changeDefaultInput

        changeTheme: function(theme, blockID, inputText = null){
            // get the block to modify on
            let block = document.getElementById(blockID)
            //make sure the size is the same as before change
            const width = block.style.width;
            const height = block.style.height;
            //clear the content
            block.innerHTML = ``
            //load the new content
            BlockGenerator.prototype.updateView(theme, block.id,"default Input")
            //change back the corresponding size.
            BlockGenerator.prototype.changeSize(width, height, block.id)
        },

        updateRadio(theme, radioID, blockID){
            let radio = document.getElementById(radioID)
            radio.style.width = "500px"
            let choices = this.loadChoice(theme)
            let index = 0;
            for (let choose of choices){
                let r = document.createElement("input")
                r.type = "radio"

                if(theme === "weather")
                {
                    r.value = index;
                    index++;
                }
                else {
                    r.value = choose
                }

                r.innerText = choose
                r.onclick = function (){
                    BlockGenerator.prototype.updateView(theme, blockID,"", r.value)
                }
                radio.appendChild(r)
                let label = document.createElement("label")
                label.innerText = choose
                radio.appendChild(label)

            }


        },


        //the user can change
        updateView: function(theme, blockID = "null", inputText = null, value=null){
            //if blockID are not specified, the default is to change all the blocks created by my doodles
            let block;
            if(blockID !== null) {
                block = document.getElementById(blockID);
            }
            else{
                block = document.getElementsByClassName(blockID);
            }

            if(theme === "random"){
                const colors= ['aqua', 'PaleTurquoise', 'Thistle', 'PaleGreen',
                    'LightCyan', 'Wheat', 'Linen', 'PeachPuff', 'Lavender', 'pink', 'teal',  'salmon'];
                const random = Math.floor(Math.random() * colors.length);
                if(value === null){
                    block.style.backgroundColor = colors[random];
                }
                else{
                    block.style.backgroundColor = value;
                }
                // Horizontal and vertical center the block
                block.style.display = "flex"
                block.style.justifyContent = "center"
                block.style.alignItems = "center";
                block.style.flexDirection = "column"

                const text = document.createElement('strong');
                text.innerText = inputText;
                block.appendChild(text);
            }
            else if(theme === "weather"){
                /*
                The image and weather data should provided by server, here we use image saved in same file
                and weather randomly chosen from array.In actual use case the developer can set image
                . Also in the actual use case the weather, temperature etc. will be connected to a weather provided website or server.
                */
                block.innerHTML =  ``;

                const weathers = ["sunny", "cloudy", "drizzle"];
                const suggestions = ["Enjoy your day!", "Nice! I hate sunshine", "Don't forget your umbrella"]
                const random = Math.floor(Math.random() * weathers.length);
                //for now the weather block will have fixed width and length due to image
                //later version will be changed to adjustable
                block.style.display = "flex"
                block.style.margin = "0px"
                block.style.justifyContent = "center"
                block.style.alignItems = "center";
                block.style.flexDirection = "row"
                block.style.backgroundColor= "white"
                let weatherIcon
                let weather
                if(value === null) {
                    const weatherToday = weathers[random];
                    weatherIcon = document.createElement('img')
                    weatherIcon.setAttribute('src', weatherToday + ".png")


                    weather = document.createElement('strong');
                    weather.style = "margin-top: 25px;"
                    weather.innerText = weatherToday + "\n" + suggestions[random];
                }
                else{
                    console.log(value)
                    const weatherToday = weathers[value];
                    weatherIcon = document.createElement('img')
                    weatherIcon.setAttribute('src', weatherToday + ".png")


                    weather = document.createElement('strong');
                    weather.style = "margin-top: 25px;"
                    weather.innerText = weatherToday + "\n" + suggestions[value];
                }
                block.appendChild(weatherIcon);
                block.appendChild(weather);

            }
            else if(theme === "mood-default"){
                block.style.backgroundColor = "lavender";

                block.style.display = "flex"
                block.style.justifyContent = "center"
                block.style.alignItems = "center";
                block.style.flexDirection = "column"

                const calender = document.createElement("h1")
                const date = new Date();
                const month = date.getUTCMonth() + 1; //months from 1-12
                const day = date.getDate();
                const year = date.getFullYear();
                calender.innerText = year + "/" + month + "/" + day;
                block.appendChild(calender)

                const text = document.createElement("strong")
                text.id = block.id + "message"
                text.innerText = "How are you going today ?"
                block.appendChild(text)

                block.appendChild(document.createElement("br"))

                const form = document.createElement("form")
                form.id = "moodForm"

                const moodH = document.createElement("button")
                moodH.type = "button"
                moodH.value = "send"
                moodH.innerText = "Happy:)"
                moodH.style.borderRadius = "8px"
                moodH.style.fontSize = "12px"
                moodH.onclick = function (){
                    document.body.style.backgroundColor = "FloralWhite"
                    document.getElementById(text.id).innerText = "Glad to hear this! Enjoy your day and remember to relax"
                }
                form.appendChild(moodH)

                const moodN = document.createElement("button")
                moodN.type = "button"
                moodN.value = "send"
                moodN.innerText = "Fine"
                moodN.style.borderRadius = "8px"
                moodN.style.fontSize = "12px"
                moodN.onclick = function (){
                    document.body.style.backgroundColor = "HoneyDew"
                    document.getElementById(text.id).innerText = "Remember to relax >w<"
                }
                form.appendChild(moodN)

                const moodS = document.createElement("button")
                moodS.type = "button"
                moodS.value = "send"
                moodS.innerText = "Sad:("
                moodS.style.borderRadius = "8px"
                moodS.style.fontSize = "12px"
                moodS.onclick = function (){
                    document.body.style.backgroundColor = "Azure"
                    document.getElementById(text.id).innerText = "You'll be fine and hope you'll get better soon"
                }
                form.appendChild(moodS)


                block.appendChild(form)

            }
        },

        //can use this to change size of the block
        changeSize(width, height, blockID){
            // adjust width and height
            document.getElementById(blockID).style.width = width+"px";
            document.getElementById(blockID).style.height = height+"px";
            // // adjust the child node "text" to make sure it is vertically center.
            // document.getElementById(blockID).children[0].style.paddingTop = height/3 + "px"
        },

        //center the  block in the current div
        horizontalCenter(blockID){
            document.getElementById(blockID).style.margin = "0 auto";
        },

        // addTheme

        loadChoice(theme){
            if(theme === "random")
            {
                return ['aqua', 'PaleTurquoise', 'Thistle', 'PaleGreen',
                    'LightCyan', 'Wheat', 'Linen', 'PeachPuff', 'Lavender', 'pink', 'teal',  'salmon'];
            }
            if(theme === "weather"){
                return ["sunny", "cloudy", "drizzle"];
            }
        }

    }

    global.BlockGenerator = global.BlockGenerator || BlockGenerator
})(window, window.document, $);