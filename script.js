const input      = document.getElementById("wordSearch");
const searchBtn  = document.getElementById("search");

const apiReq  = "https://api.dictionaryapi.dev/api/v2/entries/en/";


const word     = document.getElementById("word");
const desc     = document.getElementById("desc");
const example  = document.getElementById("example");
const output   = document.querySelector(".result");
const err      = document.querySelector(".err");
const audio    = document.querySelector("audio");
const klick    = document.querySelector("i");



const displayUI = () => {
    fetch(apiReq+input.value)
        .then(response => response.json())
        .then(data => display(data[0]))
        .catch(() => {
            error();
        })

    const display = result => {
        console.log(result);
        output.classList.remove("error");
        err.style.display = "none";
        word.style.display = "block"; 
        desc.style.display = "block";
        example.style.display = "block";
        klick.style.display  = "block";

        word.innerHTML = result.word;
        desc.innerHTML = result.meanings[0].definitions[0].definition;
        audio.src = result.phonetics[0].audio;
        
        const synonyms = result.meanings[0].synonyms;
        
        if(!(synonyms.length === 0)) {
            example.innerHTML = synonyms.toString();       
        }else {
            example.innerHTML = "";
        }
    }

    const error = () => {
        output.classList.add("error");
        err.style.display = "block";
        word.style.display = "none";
        desc.style.display = "none";
        example.style.display = "none";
        klick.style.display = "none";
    }
}

  

searchBtn.addEventListener("click", displayUI);
klick.addEventListener("click" , () => {
    audio.play();
})