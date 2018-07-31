var preSelected = ["Trending", "Random"];
var history = [];
var selectedGiphs = [];

$(document).ready(function(){


//make all the buttons
for(var i = 0; i < preSelected.length; i++){
    $(".selectedButtonsContainer").append(`<button id=${preSelected[i]}>${preSelected[i]}</button>`);
    

}

//load the trending and random giphs in their own divs.
//trending
$.ajax({
    url: "http://api.giphy.com/v1/gifs/trending?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&limit=12&rating=PG-13",
    method: "GET"
}).then(function(response){
    console.log(response);
    // console.log(response.data[0]);
    for (var i = 0; i < response.data.length; i++){
    $(".trendingGiphyContainer").append(`<img src="${response.data[i].images.original.url}" width="240" height="180" margin= "2px" border="2px" class="giphy-embed" data-still="${response.data[i].images.original_still.url}" data-animate="${response.data[i].images.original.url}" data-state="animate"></img>`)

    }
})

//make random giphy window
for (var i = 0; i < 12; i++){
$.ajax({
    url: "https://api.giphy.com/v1/gifs/random?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&tag=&rating=PG-13",
    method: "GET"
}).then(function(response){
    // console.log(response);
    // console.log(response.data[0]);
    // console.log(response.data.url);
    // console.log(response.data.embed_url);

    
    $(".randomGiphyContainer").append(`<img src="${response.data.images.original.url}" width="240" height="180" margin= "2px" border="2px" class="giphy-embed" data-still="${response.data.images.original_still.url}" data-animate="${response.data.images.original.url}" data-state="animate"></img>`)
    
})
}

//how to make a search query
$(document).on("click", "#add-Giphy", function(){  
    if($("#giphy-input").val().trim() !== ""){  
    var tempsubmission = $("#giphy-input").val().trim();
    var submission = "";
    submissionArray = tempsubmission.split("");
    for(var i=0; i < submissionArray.length; i++){
        if (submissionArray[i] === " "){
            submissionArray[i] = "-";
        }
        submission = submission + submissionArray[i];
    }
    var dne = true;
    var versionofExistence = 0;
    for(var i = 0; i < selectedGiphs.length; i++){
        if(submission === selectedGiphs[i]){
            dne = false;
            versionofExistence++;
        }
    }
    //makes sure you haven't searched and made a button for it yet.
    if (dne === true){
        selectedGiphs.push(submission);
        makeGiphyDiv(submission, tempsubmission);
    //doesn't let you make duplicate buttons, but still puts that query on top.
    } else{
        $.ajax({
            url: `http://api.giphy.com/v1/gifs/search?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&q=${submission}&limit=10&offset=0&rating=PG-13&lang=en`,
           method: "GET"
        
        }).then(function(response){
            $(".giphyContainer").prepend(`<div class="${tempsubmission}${versionofExistence.toString()} container"><header><h2>${submission}</h2></header></div>`);
            for (var i = 0; i < response.data.length; i++){
                $(`.${submission}${versionofExistence.toString()}`).append(`<img src="${response.data[i].images.original.url}" width="240" height="180" margin= "2px" border="2px" class="giphy-embed" data-still="${response.data[i].images.original_still.url}" data-animate="${response.data[i].images.original.url}" data-state:"animate"></img>`)
            }
    
        })
        
    }
}
})

// switch to still image
 $(document).on("click", "img", function(){
     console.log(this);
     var dataState = $(this).attr("data-state");
     console.log(dataState);
     var dataAnimate = $(this).attr("data-animate");
     var dataStill = $(this).attr("data-still");
     
     if(dataState === "animate"){
        $(this).attr("src", dataStill);
        $(this).attr("data-state", "still")
     }
     else{
         this.attr("src", dataAnimate);
         this.attr("data-state", "animate");
     }
    
 })
    
    
    
//makeGiphyDiv Function
function makeGiphyDiv(argument, BannerName){
    $.ajax({
        url: `http://api.giphy.com/v1/gifs/search?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&q=${argument}&limit=10&offset=0&rating=PG-13&lang=en`,
       method: "GET"
    
    }).then(function(response){
 
        $(".selectedButtonsContainer").prepend(`<button id=${argument}>${BannerName}</button>`);
        $(".giphyContainer").prepend(`<div class="${argument}Container container"><header><h2>${BannerName}</h2></header></div>`);
        for (var i = 0; i < response.data.length; i++){
            $(`.${argument}Container`).append(`<img src="${response.data[i].images.original.url}" width="240" height="180" margin= "2px" border="2px" class="giphy-embed" data-still="${response.data[i].images.original_still.url}" data-animate="${response.data[i].images.original.url}" data-state="animate"></img>`)
        }

    })


}


})

