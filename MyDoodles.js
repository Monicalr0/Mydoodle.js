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
            const text = document.createElement('strong');
            text.innerText = inputText;
            block.appendChild(text);
        }

        const head = $('body');
        head.append(block)
        this.blocks.push(block)
        this.updateView(theme, block.id);
        console.log("block " + block.id + " created")
    },

    changeTheme: function(theme){
        this.theme = theme;
        this.updateView(theme);
    },

    //the user can change
    updateView: function(theme, blockID = "null"){
        //if blockID are not specified, the default is to change all the blocks created by my doodles
        if(theme === "random"){
            const colors= ['aqua', 'blue', 'fuchsia', 'gray', 'green',
                'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
                'silver', 'teal',  'yellow'];
            const random = Math.floor(Math.random() * colors.length);
            if(blockID !== "null") {
                document.getElementById(blockID).style.backgroundColor = colors[random];
            }
            else{
                document.getElementsByClassName("MyDoodleBlock").style.backgroundColor = colors[random];
            }
            // console.log(colors[random]);
            // document.getElementById(blockID).
        }
        else if(theme === "weather"){
            //The image and weather data should provided by server, there are default image here
            //In actual use case the developer can set

        }
    },

    //can use this to change width, length etc.
    setStyle(style, blockID){
        document.getElementById(blockID).style = style;
    },

    addTheme: function(theme){}


}