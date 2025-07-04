let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let btn = document.querySelector("#searchBtn");
let inp = document.querySelector("#search");
btn.addEventListener("click", async()=>{
    let word = inp.value;
    inp.value = "";
    let data = await getWord(word);
    console.log(data);
})
async function getWord(word){
    let res = await axios.get(url+word);
    return res;
}
