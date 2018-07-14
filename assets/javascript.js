$(document).ready(function() {
    // Array that holds all of our pre determined api calls
    var giphy = [
      "dat boi", "monkey", "pigman", "large bird", "doggo"
    ];
  
   
    function addButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  // function that empties the previous search results from out giphy div
    $(document).on("click", ".giphy-button", function() {
      $("#giphy").empty();
      $(".giphy-button").removeClass("active");
      $(this).addClass("active");
    
      var search = $(this).attr("data-type");
      // variable to return first 10 items of our keyword search from Giphy
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=xmI5kkMUNhE5NEJmd4p7ZC6vNSPFwDih&limit=10";
  
      // API call to "get" results from giphy
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var giphyDiv = $("<div class=\"giphy-item\">");
  
            // variable to hold our ratings from our search results
            var rating = results[i].rating;
            // variable that adds our rating results to html doc
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            // declaring variable that adds our image results to our html doc
            var giphyImage = $("<img>");
            giphyImage.attr("src", still);
            giphyImage.attr("data-still", still);
            giphyImage.attr("data-animate", animated);
            giphyImage.attr("data-state", "still");
            giphyImage.addClass("giphy-image");
            // appending the image results variable our created div 
            giphyDiv.append(p);
            giphyDiv.append(giphyImage);
  
            $("#giphy").append(giphyDiv);
          }
        });
    });
  
    $(document).on("click", ".giphy-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-giphy").on("click", function(event) {
      event.preventDefault();
      var newGiphy = $("input").eq(0).val();
  
      if (newGiphy.length > 2) {
        giphy.push(newGiphy);
      }
  // function runs to add buttons to our html document from our search form
      addButtons(giphy, "giphy-button", "#giphy-buttons");
  
    });
  
    addButtons(giphy, "giphy-button", "#giphy-buttons");
  });
  