var preSelected = ["Trending", "Random"];
var history = [];

$(document).ready(function(){

//make all the buttons
for(var i = 0; i < preSelected.length; i++){
    $(".preselectedButtons").append(`<div><button type='button' class='btn btn-primary' value='${preSelected[i]}'>${preSelected[i]}</button></div>`);
    // console.log(preSelected[i]);

}

//load the trending and random giphs in their own divs.
//trending
$.ajax({
    url: "http://api.giphy.com/v1/gifs/trending?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&limit=10&rating=PG-13",
    method: "GET"
}).then(function(response){
    // console.log(response);
    // console.log(response.data[0]);
    for (var i = 0; i < response.data.length; i++){
    $(".trendingGiphyContainer").append(`<div id=${response}.data[i].title class="imgbox" ><a href = ${response.data[i].url}><iframe src="${response.data[i].embed_url}" width="240" height="180" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></a></div>`)

    }
})

//random
for (var i = 0; i < 10; i++){
$.ajax({
    url: "https://api.giphy.com/v1/gifs/random?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&tag=&rating=PG-13",
    method: "GET"
}).then(function(response){
    // console.log(response);
    // console.log(response.data[0]);
    // console.log(response.data.url);
    // console.log(response.data.embed_url);

    
    $(".randomGiphyContainer").append(`<div class="imgbox" ><a href = ${response.data.url}><iframe src="${response.data.embed_url}" width="240" height="180" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></a></div>`)

    
})
}

$(document).on("click", "#add-Giphy", function(){    
    var submission = $("#giphy-input").val();
    console.log(submission);
    $.ajax({
        url: `http://api.giphy.com/v1/gifs/search?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&q=${submission}&limit=10&offset=0&rating=PG-13&lang=en`,
       method: "GET"
    
    }).then(function(response){
       console.log(response); 
        $(".selectedButtonsContainer").prepend(`<button id=${submission}>${submission}</button>`);
        $(".giphyContainer").prepend(`<div class="${submission}Container container"><header><h2>${submission}</h2></header></div>`);
        for (var i = 0; i < response.data.length; i++){
            $(`.${submission}Container`).append(`<div class="imgbox" ><a href = ${response.data[i].url}><iframe src="${response.data[i].embed_url}" width="240" height="180" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></a></div>`)
        }

    })
    

})

// $(document).on("click", "button", function(){
//     var topic = this.text();
//     $.ajax({
//         url: 
//     })





// })



})