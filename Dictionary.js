let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let btn = document.querySelector("#searchBtn");
let inp = document.querySelector("#search");
let body = document.querySelector("body");
btn.addEventListener("click", async()=>{
    reset();
    let word = inp.value;
    inp.value = "";
    let data = await getWord(word);
    if(data === "Word not found"){
        let div = document.createElement("div");
        div.classList.add("card");
        body.append(div);
        let img = document.createElement("img");
        img.classList.add("gif");
        img.src = "gif1.gif";
        div.appendChild(img);
        let h1 = document.createElement("h1");
        h1.textContent = "Word not found!";
        div.appendChild(h1);
        return;
    }
    console.log(data);
    displayInfo(data.data);
})
async function getWord(word){
   try{
    let res = await axios.get(url+word);
    return res;
   }
   catch{
    return "Word not found";
   }
}
function displayInfo(data){
    for (const element of data) {
        console.log(element.word);
        let div = document.createElement("div");
        div.classList.add("card");
        let word = document.createElement("h2");
        word.innerText = element.word;
        div.append(word);
        let phonetic = document.createElement("h4");
        phonetic.innerText = `Phonetic - ${element.phonetic}`;
        if(phonetic) {
            div.append(phonetic);
        } 
        
        let rule = document.createElement("hr");
        div.append(rule);
        for (const audio of element.phonetics) {
            if(audio.audio){
                let txt = document.createElement("h4");
                txt.innerText = audio.text;
                if(txt) {
                    div.append(txt);
                } 
                
                let aud = document.createElement("audio")
                aud.controls = true;
                aud.src = audio.audio;
                div.append(aud);
            }
        }
        for (const meaning of element.meanings) {
            let meaningDiv = document.createElement("div");
            meaningDiv.classList.add("meaningDiv");
            let partSpeech = document.createElement("h4");
            partSpeech.innerText = meaning.partOfSpeech;
            meaningDiv.append(partSpeech);
            div.append(meaningDiv);
            for (const definition of meaning.definitions) {
                let def = document.createElement("h5");
                def.innerText = definition.definition;
                meaningDiv.append(def);
                if(definition.example){
                    let example = document.createElement("h5");
                    example.innerText = `e.g - ${definition.example}`;
                    meaningDiv.append(example);
                }
                let hr = document.createElement("hr");
                meaningDiv.append(hr);
            
            }
        }
        console.log(body);
        body.append(div);
    }
}
function reset(){
    let cards = document.querySelectorAll(".card");
    for (const card of cards) {
        card.remove();
    }
    
}
