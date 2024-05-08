let form = document.querySelector("#add_Float");
let formFilter = document.querySelector("#filterForm");

// this brings the data to add the array
const loadFloats = () => {
    return JSON.parse(localStorage.getItem('floats')) ?? [];
}
if (form){
    form.addEventListener('submit', e => {
        e.preventDefault()
        // all form elements that are transformed into an object
        const data = Object.fromEntries(
            new FormData(e.target)
        );
        data["favorite"]=true
        data["id"]= Date.now();
        let floats = loadFloats();
        floats.push(data);
        localStorage.setItem('floats', JSON.stringify(floats));
        fillTable(floats);
    }) 
}



const fillTable = (floats, isHome = false) => {

    let tableElement = document.querySelector("#tblFloats tbody");
    
    
    if (isHome) {
        tableElement = document.querySelector("#tblFavorites tbody");

    }
    if (!tableElement){
        return;
    }
    tableElement.innerHTML = '';


    floats.forEach((item, index,array) => {

        let row = tableElement.insertRow(0);
        for (let itemKey in item) {
            if (itemKey == 'id' ){
                continue;
            }
                let cell = row.insertCell(-1);
                
            if (itemKey == 'favorite'){
                let check = document.createElement('input');
                check.type="checkbox";
                check.onclick = function () {
                    item.favorite = !item.favorite;
                    let floatsA = loadFloats();
                    let newFloat =floatsA.map((itemA)=>{
                        if (itemA.id == item.id){
                            return item;
                        }
                    })
                    localStorage.setItem('floats', JSON.stringify(newFloat));
                    if (isHome){
                        initHome()
                    }
                
                    
                }
                check.checked = item["favorite"]
                cell.appendChild(check)
            }else{
                let p = document.createElement('p');
                p.innerText = item[itemKey];
                cell.appendChild(p) 
            }
                
                
            
  
        }
    });

}

if (formFilter){
    formFilter.addEventListener('submit',(e) =>{
        e.preventDefault();
        const data = Object.fromEntries(
            new FormData(e.target)
        );

        let flats = loadFloats();

        //city
        if (data.city){

            flats = flats.filter((item) =>{
                if (data.city.toLowerCase() == item.city.toLowerCase()){
                    return item;
                }

            });

        }

        //area
        if (data.minarea ==""){
            data.minarea = 0;
        }
        if (data.maxarea ==""){
            data.maxarea = 0;
        }

        if (data.minarea || data.maxarea){
            flats = flats.filter((item)=>{
                if (parseInt(item.areaSize) <= parseInt(data.maxarea)  &&   parseInt(item.areaSize) >= parseInt(data.minarea)) {
                    return item;
                }
            })
        }

        //price
        if (data.price) {
            let options =data.price.split("-");

            flats = flats.filter((item)=>{
                if (parseInt(item.rentPrice) <= parseInt(options[1])  &&   parseInt(item.rentPrice) >= parseInt(options[0])) {
                    return item;
                }
            })
        }


        fillTable(flats)
    })

}


function init() {
    let flats = loadFloats();
    fillTable(flats);
}

init();

function initHome() {
    let floats = loadFloats();
    let floatsFavorites = floats.filter((item)=>{
         if(item.favorite === true){
             return item;
         }
    })
    fillTable(floatsFavorites, true);
}

initHome();