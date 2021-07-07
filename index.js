let myleads = [];

const inputEl = document.getElementById("input");

const input_btn = document.getElementById("save-button")

let ulel = document.getElementById("ul");

let leadsfromstorage;

const tabbtn = document.getElementById("tab-button");

const delete_all = document.getElementById("delete-button");

leadsfromstorage = JSON.parse(localStorage.getItem("myleads"));


if(leadsfromstorage)
{
    myleads = leadsfromstorage;
    renderleads();
}

input_btn.addEventListener("click", function()
{
    myleads.push(inputEl.value);
    
    inputEl.value = "";     //THIS IS TO REMOVE THE DATA FROM INPUT TEXT

    localStorage.setItem("myleads" , JSON.stringify(myleads));

    renderleads();

})


tabbtn.addEventListener("click", function()
{

    chrome.tabs.query({active: true, currentWindow: true},function(tabs){

        myleads.push(tabs[0].url);

        localStorage.setItem("myleads" , JSON.stringify(myleads));
    
        renderleads();
    })
})

function renderleads(){

    let listitems = ""

    for(let i=0; i<myleads.length ; i++)
    {
        listitems += ` 
        <li>
            <a target = '_blank' href = '${myleads[i]}'>
                ${myleads[i]}
            </a>    
        </li>
        `
    }    

    ulel.innerHTML = listitems;

    // ANOTHER WAY TO USE THE ABOVE CODE
    // let listitems = "";
    // listitems += "<li>" + inputEl.value + "</li>";
    // ulel.innerHTML = listitems;    
    // ANOTHER WAY TO USE THE ABOVE CODE 
    // const li = document.createElement("li");
    // li.textContent = inputEl.value;
    // ulel.append(li);    

    
}

delete_all.addEventListener("click",function()
{
    localStorage.clear();
    myleads = [];
    renderleads();
})

//ENTER KEY FOR SAVING INPUT
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        input_btn.click();
    }
});

//DELETE KEY TO DELETE ALL 
document.addEventListener('keydown', (event) => {
    var name = event.key;
    if(name === "Delete")
    {
        localStorage.clear();
        myleads = [];
        renderleads();
    }

}, false);


//INSERT KEY TO INSERT THE TAB LINK
document.addEventListener('keydown', (event) => {
    var name = event.key;
    if(name === "Insert")
    {
        chrome.tabs.query({active: true, currentWindow: true},function(tabs){
    
            myleads.push(tabs[0].url);
    
            localStorage.setItem("myleads" , JSON.stringify(myleads));
        
            renderleads();
        })
    }

}, false);
