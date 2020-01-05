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
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });


    // on clicking the relevant button
    // gets input from form with id text1
    // replaces spaces in name with underscore
    $(".blueLagoon").click(function () {
        $(".textHide").hide();
        $(".infoContainer").show();
        blueCocktail();

    })

    function blueCocktail() {
        event.preventDefault();
        $(".blueLagoon").hide();
        var bluecocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Blue%20lagoon";

        $.getJSON(bluecocktailURL, function (blueData) {

            //display the coctail detail page
            // display the image
            $(".cocktailThumb").attr("src", blueData.drinks[0].strDrinkThumb);
            // display the instructions
            $("#strInstructions").html(blueData.drinks[0].strInstructions);

            $("#strDrink").text(blueData.drinks[0].strDrink);
            // clear the ingredients list
            $("#strIngredients").html("");
            // display the ingredients as a list, with the measures beside them
            $("#strIngredients").append("<li>" + blueData.drinks[0].strIngredient1 + " " + blueData.drinks[0].strMeasure1);
            $("#strIngredients").append("<li>" + blueData.drinks[0].strIngredient2 + " " + blueData.drinks[0].strMeasure2);
            $("#strIngredients").append("<li>" + blueData.drinks[0].strIngredient3);
            $("#strIngredients").append("<li>" + blueData.drinks[0].strIngredient4);
            return;



        });
    }

    $("#searchButton").click(function () {
        $(".textHide").hide();
        $(".infoContainer").show();
        $(".blueLagoon").hide();
        cockName = $("#first_name").val();
        console.log("cockname: " + cockName);
        cockName = cockName.replace(/\s/g, "_");
        console.log("No space: " + cockName);

        getCocktail();
        $("#first_name").val("");

    });

    $("#ingButton").click(function () {
        $(".textHide").hide();
        $(".infoContainer").show();
        $(".blueLagoon").hide();
        ingredName = $("#second_name").val();

        ingredName = ingredName.replace(/\s/g, "_");
        if (ingredName == "") {
            M.toast({
                html: "<div class='message'>Not found!</div>",
                classes: 'rounded',
                displayLength: 1500,

            })
        }

        getIngredSuggestions();
        $("#second_name").val("");
    });

    for (var i = 5; i > 0; i--) {
        let cardID = "card-" + (i - 1); // if we use var the for loop will finish before the first ajax call comes back, so all the ajax calls will use card-1. "let" prevents this.
        console.log("random cardID: " + cardID);
        var randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
        $.getJSON(randomURL, function (randomCock) {
            console.log("random: " + randomCock);
            console.log("card: " + cardID);
            $("#" + cardID).find("img").attr("src", randomCock.drinks[0].strDrinkThumb);
            $("#" + cardID).find(".card-title").text(randomCock.drinks[0].strDrink);
            $("#" + cardID).find(".card-content").text(randomCock.drinks[0].strCategory);
            $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + randomCock.drinks[0].strDrink);
            console.log("url: " + $("#" + cardID).find(".card-action").attr("href"));
        });
    }
});

$("#first_name").on('keyup', function (event) {

    if (event.keyCode === 13) {
        $("#searchButton").click();

    }
});

$("#second_name").on('keyup', function (event) {

    if (event.keyCode === 13) {
        $("#ingButton").click();

    }
});

// make call

// get cocktail by name

function getCocktail() {

    var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cockName;

    $.getJSON(cocktailURL, function (response) {
        if (response.drinks === null || cockName == "") {
  
            M.toast({
                html: "<div class='message'>Not found!</div>",
                classes: 'rounded',
                displayLength: 1500,

            })
        }

        //display the coctail detail page
        // display the image

        $(".cocktailThumb").attr("src", response.drinks[0].strDrinkThumb);
        // display the instructions
        $("#strInstructions").html(response.drinks[0].strInstructions);

        $("#strDrink").text(response.drinks[0].strDrink);
        // clear the ingredients list
        $("#strIngredients").html("");
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



        console.log("name: " + response.drinks[0].strDrink); //name of cocktail
        console.log("Instructions: " + response.drinks[0].strInstructions); // instructions
        console.log("img: " + response.drinks[0].strDrinkThumb); // image
        console.log("ing: " + response.drinks[0].strIngredient1); // ingredients are listed seperately. We'll need code to go through and eliminate null entries
        console.log("measure: " + response.drinks[0].strMeasure1); // this is the measure for the ingredients. 1 matches with 1
        window.scrollTo(0, 0);
        fillCards(response);

    });
}
// get cocktails by ingredient
// this gives an array of cocktails with name, image and cocktail ID. They can be displayed, and linked through to the actual cocktail. 





// function getIngredSuggestions(ingredName) {
//     var ingredURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredName;

//     $.getJSON(ingredURL, function (response) {
//         console.log("ton ingredients " + response);
//         ingFillCards(response);

//     });
// }


// This function is to fill the cards on the page with relevant data
function fillCards(response) {
    // Check how many items are in the array returned
    // do a loop to fill four cards with items 1-4 of the array (item zero is the main card)
    if (response.drinks.length > 4) {
        for (var i = 1; i < 5; i++) {
            var cardID = "card-" + i;
            $("#" + cardID).find("img").attr("src", response.drinks[i].strDrinkThumb);
            $("#" + cardID).find(".card-title").text(response.drinks[i].strDrink);
            $("#" + cardID).find("p").text(response.drinks[i].strCategory);
            $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + response.drinks[i].strDrink);
            console.log("url: " + $("#" + cardID).find(".card-action").attr("href"));
        }
    }
    // if there are less than 5 items in the array, fill the remaining cards with random content.
    else {
        for (var i = 1; i < response.drinks.length; i++) {
            var cardID = "card-" + i;
            console.log("card: " + cardID);
            $("#" + cardID).find("img").attr("src", response.drinks[i].strDrinkThumb);
            $("#" + cardID).find(".card-title").text(response.drinks[i].strDrink);
            $("#" + cardID).find(".card-content").text(response.drinks[i].strCategory);
            $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + response.drinks[i].strDrink);
            console.log("url: " + $("#" + cardID).find(".card-action").attr("href"));
        }

        for (var i = 5; i > response.drinks.length; i--) {
            let cardID = "card-" + (i - 1); // if we use var the for loop will finish before the first ajax call comes back, so all the ajax calls will use card-1. "let" prevents this.
            console.log("random cardID: " + cardID);
            var randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
            $.getJSON(randomURL, function (randomCock) {
                console.log("random: " + randomCock);
                console.log("card: " + cardID);
                $("#" + cardID).find("img").attr("src", randomCock.drinks[0].strDrinkThumb);
                $("#" + cardID).find(".card-title").text(randomCock.drinks[0].strDrink);
                $("#" + cardID).find(".card-content").text(randomCock.drinks[0].strCategory);
                $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + randomCock.drinks[0].strDrink);
                console.log("url: " + $("#" + cardID).find(".card-action").attr("href"));
            });

        }
    }




}

function getIngredSuggestions() {

    var ingredURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredName;

    $.getJSON(ingredURL, function (ingResponse) {
        

        //display the coctail detail page
        // display the image

        $(".cocktailThumb").attr("src", ingResponse.drinks[0].strDrinkThumb);

        $("#strDrink").text(ingResponse.drinks[0].strDrink);
        var result = ingResponse.drinks[0].strDrink;


        var resultURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + result;



        $.getJSON(resultURL, function (myResult) {
            // if (myResult.drinks[0]== "") {
            //     console.log("tonnette wants to know what is ing response.drinks " + myResult.drinks[0].strInstructions);
            //     $(".blueLagoon").show();
            //     // alert("drink not found");
            //     M.toast({
            //         html: "<div class='message'>Not found!</div>",
            //         classes: 'rounded',
            //         displayLength: 1500,
    
            //     })
            // }
            
            
            $(".cocktailThumb").attr("src", myResult.drinks[0].strDrinkThumb);
            // display the instructions
            $("#strInstructions").html(myResult.drinks[0].strInstructions);

            $("#strDrink").text(myResult.drinks[0].strDrink);
            // clear the ingredients list
            $("#strIngredients").html("");
            // display the ingredients as a list, with the measures beside them
            if (myResult.drinks[0].strIngredient1 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient1 + " " + myResult.drinks[0].strMeasure1);

            }
            if (myResult.drinks[0].strIngredient2 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient2 + " " + myResult.drinks[0].strMeasure2);

            }
            if (myResult.drinks[0].strIngredient3 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient3 + " " + myResult.drinks[0].strMeasure3);

            }
            if (myResult.drinks[0].strIngredient4 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient4 + " " + myResult.drinks[0].strMeasure4);

            }
            if (myResult.drinks[0].strIngredient5 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient5 + " " + myResult.drinks[0].strMeasure5);

            }
            if (myResult.drinks[0].strIngredient6 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient6 + " " + myResult.drinks[0].strMeasure6);

            }
            if (myResult.drinks[0].strIngredient7 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient7 + " " + myResult.drinks[0].strMeasure7);

            }
            if (myResult.drinks[0].strIngredient8 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient8 + " " + myResult.drinks[0].strMeasure8);

            }
            if (myResult.drinks[0].strIngredient9 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient9 + " " + myResult.drinks[0].strMeasure9);

            }
            if (myResult.drinks[0].strIngredient10 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient10 + " " + myResult.drinks[0].strMeasure10);

            }
            if (myResult.drinks[0].strIngredient11 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient11 + " " + myResult.drinks[0].strMeasure11);

            }
            if (myResult.drinks[0].strIngredient12 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient12 + " " + myResult.drinks[0].strMeasure12);

            }
            if (myResult.drinks[0].strIngredient13 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient12 + " " + myResult.drinks[0].strMeasure13);

            }
            if (myResult.drinks[0].strIngredient14 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient14 + " " + myResult.drinks[0].strMeasure14);

            }
            if (myResult.drinks[0].strIngredient15 !== null) {
                $("#strIngredients").append("<li>" + myResult.drinks[0].strIngredient15 + " " + myResult.drinks[0].strMeasure15);

            }

        })

        // clear the ingredients list
        // display the ingredients as a list, with the measures beside them

        window.scrollTo(0, 0);
        ingfillCards(ingResponse);

    });
}
function ingfillCards(ingResponse) {

    // Check how many items are in the array returned
    // do a loop to fill four cards with items 1-4 of the array (item zero is the main card)
    if (ingResponse.drinks.length > 4) {
        for (var i = 1; i < 5; i++) {
            var cardID = "card-" + i;
            $("#" + cardID).find("img").attr("src", ingResponse.drinks[i].strDrinkThumb);
            $("#" + cardID).find(".card-title").text(ingResponse.drinks[i].strDrink);

        }
    }
    // if there are less than 5 items in the array, fill the remaining cards with random content.
    else {
        for (var i = 1; i < ingResponse.drinks.length; i++) {
            var cardID = "card-" + i;
            console.log("card: " + cardID);
            $("#" + cardID).find("img").attr("src", ingResponse.drinks[i].strDrinkThumb);
            $("#" + cardID).find(".card-title").text(ingResponse.drinks[i].strDrink);
            $("#" + cardID).find(".card-content").text(ingResponse.drinks[i].strCategory);
            $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + ingResponse.drinks[i].strDrink);
            console.log("url: " + $("#" + cardID).find(".card-action").attr("href"));
        }

        for (var i = 5; i > ingResponse.drinks.length; i--) {
            let cardID = "card-" + (i - 1); // if we use var the for loop will finish before the first ajax call comes back, so all the ajax calls will use card-1. "let" prevents this.
            console.log("random cardID: " + cardID);
            var randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
            $.getJSON(randomURL, function (randomCock) {
                console.log("random: " + randomCock);
                console.log("card: " + cardID);
                $("#" + cardID).find("img").attr("src", randomCock.drinks[0].strDrinkThumb);
                $("#" + cardID).find(".card-title").text(randomCock.drinks[0].strDrink);
                $("#" + cardID).find(".card-content").text(randomCock.drinks[0].strCategory);
                $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + randomCock.drinks[0].strDrink);
                console.log("url: " + $("#" + cardID).find(".card-action").attr("href"));
            });

        }
    }




}


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




// Clicking Links in Cards

$(".card-image").click(function (event) {
    event.stopPropagation();
    cockName = $(this).find(".card-title").text();
    console.log("click title: " + $(this).find(".card-title").text());
    $(".textHide").hide();
    $(".infoContainer").show();

    getCocktail();
})


// $(".card-action").click(function (event) {
//     event.stopPropagation();


//     console.log("url: " + $(this).parent().find(".card-action").attr("href"));
//     cockName =  $(this).parent().find(".card-action").attr("href");
//     console.log("link clicked: " + cockName);

// })
// Do delegation to get ID
// change cockName to the name on the card (do we want to store cocktail IDs at this point?)
// call getCocktail()


// creating ingredients list
// 

// create ingredient measure line
// I'm PRETTY SURE the longest ingredient name is twenty characters

// var ingString="response.drink[0].strIngredient"+i;