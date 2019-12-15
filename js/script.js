//    Global Variables
var cockName = "string";

// Searching for margarita returns an array of five drinks with margarita in the title.
// searching for "tequila sunrise" didn't work. Searching for "tequila" returned an array of five drinks.
// searching for "manhattan" returns an array of one drink
// To search for two word names the space must be underscore. IE, "tequila_sunrise" returns an array of one drink

// FEATURE 1 -- Search for Cocktail By Name

// Get input from form

// convert input to have underscores


$(document).ready(function () {

    // on clicking the relevant button
    // gets input from form with id text1
    // replaces spaces in name with underscore

    $("#searchButton").click(function () {

        cockName = $("#first_name").val();
        console.log("cockname: " + cockName);
        cockName = cockName.replace(/\s/g, "_");
        console.log("No space: " + cockName);
        getCocktail();
    });
});

$("#first_name").on('keyup', function (event) {

    if (event.keyCode === 13) {
        $("#searchButton").click();

    }
});

// make call

// get cocktail by name

function getCocktail() {

    var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cockName;
    console.log("URL: " + cocktailURL);

    $.getJSON(cocktailURL, function (response) {
        console.log(response);
        // check if more than one cocktail returned
        if (response.drinks.length == 1) {
            //display the coctail detail page
            // display the image
            $("#dick-pic").attr("src", response.drinks[0].strDrinkThumb);
            // display the instructions
            $("#strInstructions").html(response.drinks[0].strInstructions);
            // display the ingredients as a list, with the measures beside them
            if (response.drinks[0].strIngredient1 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient1 + " " + response.drinks[0].strMeasure1);
            }
            if (response.drinks[0].strIngredient2 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient2 + " " + response.drinks[0].strMeasure2);
            }
            if (response.drinks[0].strIngredient3 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient3 + " " + response.drinks[0].strMeasure3);
            }
            if (response.drinks[0].strIngredient4 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient4 + " " + response.drinks[0].strMeasure4);
            }
            if (response.drinks[0].strIngredient5 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient5 + " " + response.drinks[0].strMeasure5);
            }
            if (response.drinks[0].strIngredient6 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient6 + " " + response.drinks[0].strMeasure6);
            }
            if (response.drinks[0].strIngredient7 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient7 + " " + response.drinks[0].strMeasure7);
            }
            if (response.drinks[0].strIngredient8 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient8 + " " + response.drinks[0].strMeasure8);
            }
            if (response.drinks[0].strIngredient9 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient9 + " " + response.drinks[0].strMeasure9);
            }
            if (response.drinks[0].strIngredient10 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient10 + " " + response.drinks[0].strMeasure10);
            }
            if (response.drinks[0].strIngredient11 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient11 + " " + response.drinks[0].strMeasure11);
            }
            if (response.drinks[0].strIngredient12 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient12 + " " + response.drinks[0].strMeasure12);
            }
            if (response.drinks[0].strIngredient13 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient13 + " " + response.drinks[0].strMeasure13);
            }
            if (response.drinks[0].strIngredient14 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient14 + " " + response.drinks[0].strMeasure14);
            }
            if (response.drinks[0].strIngredient15 !== null) {
                $("#strIngredients").append("<li>" + response.drinks[0].strIngredient15 + " " + response.drinks[0].strMeasure15);
            }


        }
        else if (response.drinks.length > 1) {
            // display the cocktail option page
            // link through a loop for the number of cocktails we wish to display. This may require an adaption of the HTML document

            for (var i = 0; i < response.drinks.length; i++) {
                //create card or container or whatever. Append attributes to this container.
                $("#Relevant_ID").append("<h3>" + response.drinks[i].strDrink + "</h3>");
                $("#Relevant_ID").append("<img src='" + response.drinks[i].strDrinkThumb)
            }


        }
        else {
            // display the no cocktails found page
        }



        var output = document.createElement("p");
        $(output).html(response.drinks[0].strDrink);
        $("body").append(output);

        console.log("name: " + response.drinks[0].strDrink); //name of cocktail
        console.log("Instructions: " + response.drinks[0].strInstructions); // instructions
        console.log("img: " + response.drinks[0].strDrinkThumb); // image
        console.log("ing: " + response.drinks[0].strIngredient1); // ingredients are listed seperately. We'll need code to go through and eliminate null entries
        console.log("measure: " + response.drinks[0].strMeasure1); // this is the measure for the ingredients. 1 matches with 1


    });
}
// get cocktails by ingredient
// this gives an array of cocktails with name, image and cocktail ID. They can be displayed, and linked through to the actual cocktail. 

function getIngredSuggestions() {
    var ingredURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";

    $.getJSON(ingredURL, function (response) {
        console.log(response);
        // var output = document.createElement("img");
        // for (var i = 0; i < response.drinks.length; i++) {
        //     $(output).html(response.drinks[i].strDrinkThumb);
        //     $("body").append(output);
        // }
    });
}



// var listOfIngredients = [];
// if(response.drinks[0].strIngredient1 != null){
//     listOfIngredients.push(response.drinks[0].strIngredient1);
// }
// if(response.drinks[0].strIngredient2 != null){
//     listOfIngredients.push(response.drinks[0].strIngredient2);
// }
// if(response.drinks[0].strIngredient3 != null){
//     listOfIngredients.push(response.drinks[0].strIngredient3);
// }
// if(response.drinks[0].strIngredient4 != null){
//     listOfIngredients.push(response.drinks[0].strIngredient4);
// }
// if(response.drinks[0].strIngredient5 != null){
//     listOfIngredients.push(response.drinks[0].strIngredient5);
// }
// if(response.drinks[0].strIngredient6 != null){
//     listOfIngredients.push(response.drinks[0].strIngredient6);
// }
// console.log(listOfIngredients);



// // for (var x in response.drinks[0]){
// //     if (x.indexOf("strIngredient")){
// //         console.log("The key is: "+x);
// //     }

// // }
// console.log("reposne drinks: "+response.drinks.length);
// console.log("reposne first drink : "+response.drinks[0].length);
// // for(var x=0;x<response.drinks.length;x++){
//     for(var x=0;x<1;x++){
//    // console.log("x is "+response.drinks[x].strIngredient1);
//    // var someArray = JSON.parse(response.drinks[x]);
//     console.log(Object.keys(response.drinks[x]));

//     var someArray = Object.keys(response.drinks[x]);

//     for(var key = 0; key<someArray.length;key++){
//         console.log("The key is: "+someArray[key] + " index  is "+key);

//         if(someArray[key] ==='strIngredient1')     console.log(response.drinks[0].someArray[key])
//         // if (someArray[key].indexOf("strIngredient") >-1){
//         //     console.log("The key is: "+someArray[key] + " index  is "+key);
//         //     var reponseKey = response.drinks[0].someArray[key];
//         //     console.log(reponseKey);
//         // }
//     }
//    // console.log("inside line ")
//     // if (x.indexOf("strIngredient")){
//     //             console.log("The key is: "+x);
//     //             //x = response.drinks[0].strIngredient6
//     //         }
// }


// for (var i=1; i<16; i++){
//     var ingString="response.drinks[0].strIngredient"+i;
// //   console.log("this shuld work : "+ response.drinks[0].strMeasure+i);
//     if (ingString===null){
//         return;
//     }
//     else{
//         console.log("ing: "+ingString);
//     }
// }






// console.log("name: " + response.drinks[0].strDrink); //name of cocktail
// console.log("Instructions: " + response.drinks[0].strInstructions); // instructions
// console.log("img: " + response.drinks[0].strDrinkThumb); // image
// console.log("ing: " + response.drinks[0].strIngredient1); // ingredients are listed seperately. We'll need code to go through and eliminate null entries
// console.log("measure: " + response.drinks[0].strMeasure1); // this is the measure for the ingredients. 1 matches with 1


// Searching for ingredient returns an array of drinks, just the name, image and id. We can use the id to search for the particular drink.
// console.log("name: "+response.drinks[0].strDrink); // Name of Drink
// console.log("img: "+response.drinks[0].strDrinkThumb); // img of drink
// console.log("id: "+response.drinks[0].idDrink); // id of drink


$("#startButton").click(function (event) {
    event.stopPropagation();

    getCocktail();
    getIngredSuggestions()

});


// creating ingredients list
// 

// create ingredient measure line
// I'm PRETTY SURE the longest ingredient name is twenty characters

// var ingString="response.drink[0].strIngredient"+i;