function modeToggle(){
     document.body.classList.toggle("dark");
}

document.getElementById('modeSwitch').addEventListener('click', modeToggle);

const quotesArray=['\"The ignorance of one voter in a democracy impairs the security of all.\"-John F.Kennedy','\"Democracy cannot succeed unless those who express their choice are prepared to choose wisely. The real safeguard of democracy, therefore, is education.\"-Franklin D.Roosevelt',
'\"The best argument against democracy is a five-minute conversation with the average voter.\"-Winston Churchill','\"Democracy is the road to socialism\"-Karl Marx','\"As I would not be a slave, so I would not be a master. This expresses my idea of democracy\"-Abraham Lincoln',
'\"Democracy is worth dying for, because it`s the most deeply honorable form of government ever devised by man.\"-Ronald Regan','\"Corruption is a cancer: a cancer that eats away at a citizen`s faith in democracy, diminishes the instinct for innovation and creativity; already-tight national budgets, crowding out important national investments. It wastes the talent of entire generations. It scares away investments and jobs.\"-Joe Biden',
'\"Erasing national borders does not make people safer or more prosperous. It undermines democracy and trades away prosperity\"-Donald Trump']

function quoteGenerator(){
    let randomQuote=Math.round(Math.random()*quotesArray.length);
  return document.getElementById('displayQuote').innerHTML=quotesArray[randomQuote]
}

window.addEventListener('load', quoteGenerator);

function serverRequest(){
  fetch('https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=ZIOGUOFPYAk9mHhATNHn8JNqUSxrp5T3')
  .then(serverResponse =>serverResponse.json())
  .then(serverData=>{
      document.getElementById('serverData').innerHTML=`
      ${Object.keys(serverData.results).map(key =>{
        //  console.log(serverData.results[key].media[0].caption,serverData.results[key].media[0]['media-metadata'][0].url,serverData.results[key].media[0].copyright)
          return`<div class="card text-dark mb-3 p-2">
                    <h1 class="card-title"><i>${serverData.results[key].title}</i></h1> 
                      <div class='text-center'>
                        <img src="${serverData.results[key].media[0]['media-metadata'][0].url}">
                      </div>
                      <div class="text-center">${serverData.results[key].media[0].caption}</div>
                        <p class='text-center'><i>copright</i>: ${serverData.results[key].media[0].copyright}</p>
                      <br>
                      <h2 class="lead text-center">[Abstract]</h2>
                        <p>${serverData.results[key].abstract}</p>
                      <div class="text-center">
                        <button type="button" class="btn btn-info" style='width:250px'><a href="${serverData.results[key].url}">read more &raquo;</a></button>
                     </div>
                       <p>Source: ${serverData.results[key].source}</p>
                       <p>Author: ${serverData.results[key].byline}</p>
                       <p>Published date: ${serverData.results[key].published_date}</p
                       <p>Updated date: ${serverData.results[key].updated}</p>
                  </div>`
       }).join('')}`;
  })
  .catch((error)=>{
      document.getElementById('serverData').innerHTML=error.message;
  })
}

document.getElementById('fetchButton').addEventListener('click',serverRequest);