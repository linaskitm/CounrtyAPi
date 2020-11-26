const display = document.getElementById('display');
const selectRegion = document.getElementById('select');
const regionBtn = document.getElementById('regionBtn');
const allBtn = document.getElementById('allBtn');
const countryOption = document.getElementById('countryOption');
const countries = document.getElementById('countries');
const oneCounrtyBtn = document.getElementById('oneCounrtyBtn'); 


const fetchAll = async () => {
    await fetch("https://restcountries.eu/rest/v2/all?_limit=10")
   .then(res => {
     //tikrinam response, kad galetum catch error.
      console.log(res);
      //tikrinam ar response geras, ty ok: true, status:200
      if(!res.ok) {
        // jei bus error, sita zinute pagaus .catch apacioje
        throw Error('Blogas api');
      }
      return res.json()})
   .then(data => {
     console.log(data);
     const salys = data.map(salis => {
       // paimu inputo reiskme, useris parenka
    //    let opt = select.value;
    //    console.log(opt);
    //    if(salis.region === opt)
       return `<div class="col pb-2">
               <div class="card" style="width: 18rem;">
                 <img src="${salis.flag}" width="200px" height="150px" class="card-img-top" alt="flag">
                 <div class="card-body">
                   <h5 class="card-title">${salis.name}</h5>
                   <h6 class="card-subtitle mb-2 text-muted">${salis.capital}</h6>
                </div>
               </div>
               </div>`
     }).join('');
     display.insertAdjacentHTML('afterbegin', salys);
   }).catch(err => {
     console.log(err);
   })
 }

allBtn.addEventListener('click', fetchAll);

 const fetchRegion = async () => {
     const regionSelected = selectRegion.value;
     try{
        const response = await fetch(`https://restcountries.eu/rest/v2/region/${regionSelected}`);
        const data = await response.json();
        console.log(data);
        const salys = data.map(salis => {

            
            return `<div class="col pb-2">
                    <div class="card" style="width: 18rem;">
                      <img src="${salis.flag}" width="200px" height="150px" class="card-img-top" alt="flag">
                      <div class="card-body">
                        <h5 class="card-title">${salis.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${salis.capital}</h6>
                     </div>
                    </div>
                    </div>`
            
          }).join('');
          display.insertAdjacentHTML('afterbegin', salys);
     } catch (err) {
         console.log(err)
     }
 }
 regionBtn.addEventListener('click', fetchRegion);

 let defaultOption = document.createElement('option');
 defaultOption.value = 'Choose Country';
 countries.appendChild(defaultOption);
 countries.selectedIndex = 0;

 const fetchOptions = async () => {
     const inputValue = countryOption.value;
     try {
     const response = await fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`);
     const data = await response.json();
    //  console.log(data);
         //setting datalist empty at the start of function 
         //if we skip this step, same name will be repeated 
            countries.innerHTML = '';
            let option;
             option = document.createElement('option');
        // console.log(option)
                
            for(let i =0; i < data.length; i++) {
                    option.value = data[i].name;    
            }
            countries.appendChild(option);
    } catch (err) {
        console.log('Error Bl:', err);
    }
    }
    

countryOption.addEventListener('keyup', fetchOptions, false);

const fecthCounrty = async () => {
    const inputValue = countryOption.value;
    try {
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${inputValue}`);
        const data = await response.json();
        display.innerHTML = "";
        data.forEach(salis => {
          console.log(salis);
          const div = document.createElement('div');
          div.setAttribute('class', 'jumbotron');
          div.style.width = '50%';
          display.appendChild(div);

          const img = document.createElement('img');
          img.setAttribute('class', 'img-thumbnail');
          img.src = salis.flag;
          div.appendChild(img);

          const name = document.createElement('h3');
          name.setAttribute('class', 'display-4');
          name.innerText = salis.name;
          div.appendChild(name);

          const capital = document.createElement('h5');
          capital.innerText = `Capital ${salis.capital}`;
          capital.setAttribute('class', 'display-6');
          div.appendChild(capital);

          const currencyList = document.createElement('ul');
          currencyList.innerText = 'currencies';
          currencyList.setAttribute('class', 'list-group')
          div.appendChild(currencyList)
          for(let c in salis.currencies) {
            const currency = document.createElement('li')
            currency.setAttribute('class', 'list-group-item')
            currency.innerHTML = salis.currencies[c].name;
            currencyList.appendChild(currency);
          }

          const borderList = document.createElement('ul');
          borderList.innerText = 'Border';
          borderList.setAttribute('class', 'list-group');
          div.appendChild(borderList)
          for(let b in salis.borders) {
            const border = document.createElement('li')
            border.setAttribute('class', 'list-group-item')
            border.innerHTML = salis.borders[b];
            borderList.appendChild(border);
          }
          const translationList = document.createElement('ul');
          translationList. innerText = 'Translations';
          translationList.setAttribute('class', 'list-group');
          div.appendChild(translationList);
          for(let t in salis.translations) {
            // console.log(salis.translations[t], t)
            const li = document.createElement('li');
            li.setAttribute('class', 'list-group-item');
            li.innerHTML = `${t} : ${salis.translations[t]}`;
            translationList.appendChild(li);
          }


        })
        
    } catch (error) {
        console.log('Error Bl:' , error)
        
    }
}
function resetValue() {
  countryOption.value = '';
}


oneCounrtyBtn.addEventListener('click', function(e){
  e.preventDefault();
  fecthCounrty();
  resetValue();

});
