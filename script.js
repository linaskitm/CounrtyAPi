const display = document.getElementById('display');

const fetchX = async () => {
    await fetch("https://restcountries.eu/rest/v2/all")
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
 fetchX();