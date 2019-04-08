var preSelected = ["Random", "Trending"];
var history = [];
var selectedGiphs = [];



$(document).ready(function(){
//make preSelected buttons
    for(var i = 0; i < preSelected.length; i++){
        $(".selectedButtonsContainer")
            .append(`<button id=${preSelected[i]} onclick="location.href='#${preSelected[i]}';">${preSelected[i]}</button>`);
    }

    //load the trending and random giphs in their own divs.
    //trending
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/trending?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&tag=&rating=PG-13",
        method: "GET"
    }).then(function(response){
        for (var i = 0; i < response.data.length; i++){
            var tempDiv = $("<div>")
            tempDiv.attr("id", `${i}TrendingDiv`)
            tempDiv.attr("class", "polaroid")
            var tempBtnDiv = $("<div>")
            tempBtnDiv.attr("class", "btnDiv")
            var tempImg = $("<img>")
            
            tempImg.attr("src", response.data[i].images.original.url)
            .attr("data-still", response.data[i].images.original_still.url)
            .attr("data-animate", response.data[i].images.original.url)
            .attr("data-state", "animate")
            .attr("class", "giphy-embed")
            var downBtn = $("<div class='btnBtn'>Download</div>")
            downBtn.attr("urlData", `${response.data[i].images.original.url}`)
            var titleStr = response.data[i].title.split(" ").join("-")
            downBtn.attr("titleData", `${titleStr}`)
            tempDiv.append(tempImg)
            
            var strSplt = response.data[i].title.split(" ")
            var inx = strSplt.indexOf("GIF")
            if (inx !== -1){
                tempDiv.append(`<p style="margin: 0px;">${strSplt.slice(0, inx).join(" ")}</p>`)
                    .append(`<p style="margin: 0px;">${strSplt.slice(inx + 2).join(" ")}`)
            }
            // tempDiv.append(`<p>${response.data[i].title}</p>`)
            tempDiv.append(downBtn)
            tempDiv.attr("style", "background-color: white; margin: 2px;")
        $(".trendingGiphyContainer").append(tempDiv)

        }
    })

    $(document).on("click", ".btnBtn", function(){
        let urlData = $(this)[0].previousElementSibling.currentSrc
        let titleData = $(this).attr("titleData")
        downloadResource(urlData, titleData);

    })

    //make random giphy window
    var counter = 0;
    for (var i = 0; i < 25; i++){
    counter++;
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&tag=&rating=PG-13",
        method: "GET"
    }).then(function(response){   
        var tempDiv = $("<div>")
        tempDiv.attr("id", `${i}RandomDiv`)
        tempDiv.attr("class", "polaroid")
        var tempBtnDiv = $("<div>")
        tempBtnDiv.attr("class", "btnDiv")
        var tempImg = $("<img>")
        console.log()
        tempImg.attr("src", response.data.images.original.url)
        .attr("data-still", response.data.images.original_still.url)
        .attr("data-animate", response.data.images.original.url)
        .attr("data-state", "animate")
        .attr("class", "giphy-embed")
        var downBtn = $("<div class='btnBtn' type='button'>Download</div>")
        downBtn.attr("urlData", `${response.data.images.original.url}`)
        var titleStr = response.data.title.split(" ").join("-")
        downBtn.attr("titleData", `${titleStr}`)
        tempDiv.append(tempImg)
        var strSplt = response.data.title.split(" ")
            var inx = strSplt.indexOf("GIF")
            if (inx !== -1){
                tempDiv.append(`<p style="margin: 0px;">${strSplt.slice(0, inx).join(" ")}</p>`)
                    .append(`<p style="margin: 0px;">${strSplt.slice(inx + 2).join(" ")}`)
            }
        tempDiv.append(downBtn)
        tempDiv.attr("style", "background-color: white; margin: 2px;")

        $(".randomGiphyContainer").append(tempDiv)
        
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
            submission += submissionArray[i];
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
        } 
        console.log(`#${submission}ID`)

    }

    })
    // switch to still image
    $(document).on("click", "img", function(){
        console.log(this);
        uniqueID = $(this).attr("id");
        console.log(uniqueID);
        

        var dataState = $(this).attr("data-state");
        var dataAnimate = $(this).attr("data-animate");
        var dataStill = $(this).attr("data-still");
        
        if(dataState === "animate"){
            $(this).attr("src", dataStill);
            $(this).attr("data-state", "still");
        }
 
        else{
            $(this).attr("src", dataAnimate);
            $(this).attr("data-state", "animate");
        }      
    })
        
                
    //makeGiphyDiv Function
    function makeGiphyDiv(argument, BannerName){
        $.ajax({
            url: `http://api.giphy.com/v1/gifs/search?api_key=C9oe21FaZr5JHjfQfF0o175Kjscx8dA2&q=${argument}&limit=25&offset=0&rating=PG-13&lang=en`,
        method: "GET"
        }).then(function(response){
    
            $(".selectedButtonsContainer").prepend(`<button id=${argument} onclick="location.href='#${argument}ID';">${BannerName}</button>`);
            $(".giphyContainer").prepend(`<div id=${argument}ID class="${argument}Container container"><header><h2>${BannerName}</h2></header></div>`);
            for (var i = 0; i < response.data.length; i++){
                    var tempDiv = $("<div>")
                    tempDiv.attr("id", `${i}TrendingDiv`)
                    tempDiv.attr("class", "polaroid")
                    var tempBtnDiv = $("<div>")
                    tempBtnDiv.attr("class", "btnDiv")
                    var tempImg = $("<img>")
                    
                    tempImg.attr("src", response.data[i].images.original.url)
                    .attr("data-still", response.data[i].images.original_still.url)
                    .attr("data-animate", response.data[i].images.original.url)
                    .attr("data-state", "animate")
                    .attr("class", "giphy-embed")
                    var downBtn = $("<div class='btnBtn'>Download</div>")
                    downBtn.attr("urlData", `${response.data[i].images.original.url}`)
                    var titleStr = response.data[i].title.split(" ").join("-")
                    downBtn.attr("titleData", `${titleStr}`)
                    tempDiv.append(tempImg)
                    var strSplt = response.data[i].title.split(" ")
            var inx = strSplt.indexOf("GIF")
            if (inx !== -1){
                tempDiv.append(`<p style="margin: 0px;">${strSplt.slice(0, inx).join(" ")}</p>`)
                    .append(`<p style="margin: 0px;">${strSplt.slice(inx + 2).join(" ")}`)
            }
                    tempDiv.append(downBtn)
                    tempDiv.attr("style", "background-color: white; margin: 2px;")

                $(`.${argument}Container`).append(tempDiv)
            }
            document.querySelector(`#${argument}ID`).scrollIntoView()
        })
       


    }

function forceDownload(blob, filename) {
  var a = document.createElement('a');
  a.download = filename;
  a.href = blob;
  document.body.appendChild(a);
  a.click();
  a.remove();
}



function downloadResource(url, filename) {
  if (!filename) filename = url.split('\\').pop().split('/').pop();
  fetch(url, {
      headers: new Headers({
        'Origin': location.origin
      }),
      mode: 'cors'
    })
    .then(response => response.blob())
    .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch(e => console.error(e));
}

})

