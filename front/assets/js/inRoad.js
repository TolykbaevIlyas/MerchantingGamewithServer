let infoTable = document.getElementById('infoTable');
let info = document.getElementById('info');
let cityDistance = document.getElementById('cityDistance');
let Start = document.getElementById('Start');
let distance = 0;
let speed = 0;



class product{
    getProducts(){
        let loginName = localStorage.getItem("login");
        fetch('http://zadanie.kz/save?login=' + loginName)
        .then(function (response) {
            response.json().then((data) => {
                //console.log(data);
                for(let i = 0; i < data.length; i++){
                    //console.log(data[i]["name"]);
                    infoTable.innerHTML += `<tr>
                    <td class="${data[i]['productName']} ${data[i]['productName']}name">${data[i]['productName']}</td>
                    <td class="${data[i]['productName']} ${data[i]['productName']}weight" value="${data[i]['productweight']}">${data[i]['productweight']}</td>
                    <td class="${data[i]['productName']} ${data[i]['productName']}cost" value="${data[i]['productCost']}">${data[i]['productCost']}</td>
                    <td class="${data[i]['productName']} ${data[i]['productName']}type" value="${data[i]['productType']}">${data[i]['productType']}</td>
                    <td class="${data[i]['productName']} ${data[i]['productName']}status" value="${data[i]['productStatus']}">${data[i]['productStatus']}</td>
                    <td class="${data[i]['productName']} ${data[i]['productName']}CostOfSellingPlace" value="${data[i]['productCostOfSellingPlace']}">${data[i]['productCostOfSellingPlace']}</td>
                </tr>`
                }
            });
    })
    }

}

class city{
    getCity(){
        let loginName = localStorage.getItem("login");
        fetch('http://zadanie.kz/cities?login=' + loginName)
        .then(function (response) {
            response.json().then((data) => {
                let dataN = data[0];
                //console.log(dataN);
                //console.log(data[i]["name"]);
                info.innerHTML += `
                    Город:<p id="city">${dataN["name"]}</p>
                    Расстояние до города:<p id="cityDistance">${dataN["distance"]}</p>`
                });
    })
    }

}

class dealer{
    getDealerInfo(){
        let loginName = localStorage.getItem("login");
        fetch('http://zadanie.kz/save?login=' + loginName)
        .then(function (response) {
            response.json().then((data) => {
                //console.log(data);
                // let DealerInfo = {login: data[0]["login"] ,Speed : data[0]["speed"], money: data[0]["money"],weight: data[0]["weight"]}
                // localStorage.setItem("dealerInfo", JSON.stringify(DealerInfo));
                info.innerHTML += `
                    <div class="infoFlexer">
                        <p>Скорость передвижения:</p>
                        <p id="Speed"> ${data[0]["speed"]}</p>
                        <p>км</p>
                    </div>
                    <div class="infoFlexer">
                        <p>Количество денег:</p>         
                        <p id="Money">${data[0]["money"]}</p>
                        <p>тг</p>
                    </div>
                    <div class="infoFlexer">
                        <p>Грузоподъемность: </p>
                        <p id="weight">${data[0]["weight"]}</p>
                        <p>кг</p>
                    </div>
                    
                    
                // `

             });
    })
    }
}

let Product = new product();
let City = new city();
let Dealer = new dealer();


Start.addEventListener('click',()=>{
    let cityDistance = document.getElementById('cityDistance');
    let PlayerSpeed = document.getElementById('Speed');
    distance = cityDistance.textContent;
    speed = PlayerSpeed.textContent;
    Engine(distance,speed);
})



function Main(){
    City.getCity();
    Product.getProducts();
    Dealer.getDealerInfo();
    //let distance = cityDistance.textContent;
    //console.log(infoTable);
}

function Engine(distance,speed){
    let advStart = true;
    let i = 0;
    let k = parseInt(distance);
    let cityDistance = document.getElementById('cityDistance');  
    while(advStart){
        let min = Math.ceil(0);
        let max = Math.floor(k);
        let rand =  Math.floor(Math.random() * (max - min)) + min;
        
        if(i < k){
            
            k = k - parseInt(speed);
            cityDistance.innerHTML = k;
            if(k == rand){
                console.log(k);
                
            }
            
        }else{
            advStart = false;
        }
    }
}

Main();

