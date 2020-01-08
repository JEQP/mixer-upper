//    Global Variables

var cockName = "string";


$(document).ready(function () {
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
      });
      setInterval(function(){
          $('.carousel').carousel('next')
      }, 5000);

    // sets up landing page

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

// event handler for name search

    $("#searchButton").click(function () {
        $(".textHide").hide();
        $(".infoContainer").show();
   
        cockName = $("#first_name").val();

       
        cockName = cockName.replace(/\s/g, "_");
        
        if (cockName == "") {
            M.toast({
                html: "<div class='message'>Not found!</div>",
                classes: 'rounded',
                displayLength: 1500,

            })
        }

        else {
            getCocktail();

        }

        
        $("#first_name").val("");

    });

    // event handler for ingredient search

    $("#ingButton").click(function () {
        $(".textHide").hide();
        $(".infoContainer").show();
        ingredName = $("#second_name").val();
        ingredName = ingredName.replace(/\s/g, "_");
        getIngredSuggestions();
        $("#second_name").val("");
    });

    // fills the cards with random cocktails
    for (var i = 5; i > 0; i--) {
        let cardID = "card-" + (i - 1); // if we use var the for loop will finish before the first ajax call comes back, so all the ajax calls will use card-1. "let" prevents this.
        var randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
        $.getJSON(randomURL, function (randomCock) {
            $("#" + cardID).find("img").attr("src", randomCock.drinks[0].strDrinkThumb);
            $("#" + cardID).find(".card-title").text(randomCock.drinks[0].strDrink);
            $("#" + cardID).find(".card-content").text(randomCock.drinks[0].strCategory);
            $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + randomCock.drinks[0].strDrink);
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
        if (response.drinks === null) {
  
            M.toast({
                html: "<div class='message'>Not found!</div>",
                classes: 'rounded',
                displayLength: 1500,

            })
        }

        //display the coctail detail page
        // display the image
        $(".blueLagoon").hide();

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

        window.scrollTo(0, 0);
        fillCards(response);

    });
}



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
        }
    }
    // if there are less than 5 items in the array, fill the remaining cards with random content.
    else {
        for (var i = 1; i < response.drinks.length; i++) {
            var cardID = "card-" + i;
            $("#" + cardID).find("img").attr("src", response.drinks[i].strDrinkThumb);
            $("#" + cardID).find(".card-title").text(response.drinks[i].strDrink);
            $("#" + cardID).find(".card-content").text(response.drinks[i].strCategory);
            $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + response.drinks[i].strDrink);
        }

        for (var i = 5; i > response.drinks.length; i--) {
            let cardID = "card-" + (i - 1); // if we use var the for loop will finish before the first ajax call comes back, so all the ajax calls will use card-1. "let" prevents this.
            var randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
            $.getJSON(randomURL, function (randomCock) {
                $("#" + cardID).find("img").attr("src", randomCock.drinks[0].strDrinkThumb);
                $("#" + cardID).find(".card-title").text(randomCock.drinks[0].strDrink);
                $("#" + cardID).find(".card-content").text(randomCock.drinks[0].strCategory);
                $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + randomCock.drinks[0].strDrink);
            });

        }
    }




}

function getIngredSuggestions() {

    var ingredURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredName;

    $.getJSON(ingredURL, function (ingResponse) {
        //display the coctail detail page
        // display the image
        $(".blueLagoon").hide();
        $(".cocktailThumb").attr("src", ingResponse.drinks[0].strDrinkThumb);

        $("#strDrink").text(ingResponse.drinks[0].strDrink);
        var result = ingResponse.drinks[0].strDrink;


        var resultURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + result;



        $.getJSON(resultURL, function (myResult) {
            
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

        });

        // clear the ingredients list
        // display the ingredients as a list, with the measures beside them

        window.scrollTo(0, 0);
        ingfillCards(ingResponse);

    }).fail(function(){
        M.toast({
            html: "<div class='message'>Not found!</div>",
            classes: 'rounded',
            displayLength: 1500,

        });
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
            $("#" + cardID).find("img").attr("src", ingResponse.drinks[i].strDrinkThumb);
            $("#" + cardID).find(".card-title").text(ingResponse.drinks[i].strDrink);
            $("#" + cardID).find(".card-content").text(ingResponse.drinks[i].strCategory);
            $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + ingResponse.drinks[i].strDrink);
    
        }

        for (var i = 5; i > ingResponse.drinks.length; i--) {
            let cardID = "card-" + (i - 1); // if we use var the for loop will finish before the first ajax call comes back, so all the ajax calls will use card-1. "let" prevents this.
            var randomURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
            $.getJSON(randomURL, function (randomCock) {
                $("#" + cardID).find("img").attr("src", randomCock.drinks[0].strDrinkThumb);
                $("#" + cardID).find(".card-title").text(randomCock.drinks[0].strDrink);
                $("#" + cardID).find(".card-content").text(randomCock.drinks[0].strCategory);
                $("#" + cardID).find(".card-action").attr("href", "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + randomCock.drinks[0].strDrink);
            });

        }
    }




}


$("#startButton").click(function (event) {
    event.stopPropagation();

    getCocktail();
    getIngredSuggestions()

});




// Clicking Links in Cards

$(".card-image").click(function (event) {
    event.stopPropagation();
    cockName = $(this).find(".card-title").text();
    $(".textHide").hide();
    $(".infoContainer").show();
    $(".blueLagoon").hide();
    getCocktail();
})
