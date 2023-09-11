let infoTable = document.getElementById('infoTable');
let info = document.getElementById('info');
let exit = document.getElementById('exit');
let tab = document.getElementsByClassName('tab');;
let tabContent = document.getElementsByClassName('tabContent');
let AddBtn = document.getElementById('AddBtn');
let add = document.getElementById('add');
let startAdventure = document.getElementById('startAdventure');

let cityName = document.getElementById('cityName');
let cityDistance = document.getElementById('cityDistance');
let cityAdd = document.getElementById('cityAdd');

let eventName = document.getElementById('eventName');
let eventDescription = document.getElementById('eventDescription');
let eventSpeedDebuff = document.getElementById('eventSpeedDebuff');
let eventLuckDebuff = document.getElementById('eventLuckDebuff');
let eventAdd = document.getElementById('eventAdd');

let productName = document.getElementById('productName');
let productWeight = document.getElementById('productWeight');
let productCost = document.getElementById('productCost');
let productType = document.getElementById('productType');
let productStatus = document.getElementById('productStatus');
let productStatusInfo = document.getElementById('productStatusInfo');
let productAdd = document.getElementById('productAdd');

let addErrors = document.getElementById('addErrors');

let NameOfCity = "";
let NameOfEvent = "";

let NameOfProduct = "";

let DiscriptionOfEvent = "";

let TypeOfProduct = "";
let StatusOfProduct = "";


let DistanceOfCity = 0;

let SpeedDebuffOfEvent = 0;
let LuckDebuffOfEvent = 0;

let WeightfOfProduct = 0;
let CostOfProduct = 0;


let click = 0;
let click2 = 0;

startAdventure.setAttribute("disabled", "disabled");
startAdventure.style.backgroundColor = "grey";
startAdventure.style.cursor = "default";
    
class city{
    getCity(){
        let loginName = localStorage.getItem("login");
        fetch('https://admin.tolykbaiev.kz/cities?login=' + loginName)
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
        fetch('https://admin.tolykbaiev.kz/dealer?login=' + loginName)
        .then(function (response) {
            response.json().then((data) => {
                //console.log(data);
                let DealerInfo = {login: data[0]["login"] ,Speed : data[0]["speed"], money: data[0]["money"],weight: data[0]["weight"]}
                localStorage.setItem("dealerInfo", JSON.stringify(DealerInfo));
                info.innerHTML += `
                    <p>Логин: ${data[0]["login"]}</p>
                    

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
                    
                    
                `

             });
    })
    }
}

class product{
    getProducts(){
        fetch('https://admin.tolykbaiev.kz/products')
        .then(function (response) {
            response.json().then((data) => {
                //console.log(data);
                for(let i = 0; i < data.length; i++){
                    //console.log(data[i]["name"]);
                    infoTable.innerHTML += `<tr>
                    <td class="${data[i]['name']} ${data[i]['name']}name">${data[i]['name']}</td>
                    <td class="${data[i]['name']} ${data[i]['name']}weight" value="${data[i]['weight']}">${data[i]['weight']}</td>
                    <td class="${data[i]['name']} ${data[i]['name']}cost" value="${data[i]['cost']}">${data[i]['cost']}</td>
                    <td class="${data[i]['name']} ${data[i]['name']}type" value="${data[i]['type']}">${data[i]['type']}</td>
                    <td class="${data[i]['name']} ${data[i]['name']}status" value="${data[i]['status']}">${data[i]['status']}</td>
                    <td class="${data[i]['name']} ${data[i]['name']}CostOfSellingPlace" value="${data[i]['CostOfSellingPlace']}">${data[i]['CostOfSellingPlace']}</td>
                    <td class="${data[i]['name']} ${data[i]['name']}CheckBox"><input value="${data[i]['name']}" type="checkbox" class="${data[i]['name']} ${data[i]['name']}cb checkboxClass" tagName="${data[i]['name']}" id="checkbox">
                </tr>`
                }
            });
    })
    }

}

class gameevent{
    _AllOfEvent(){
        return{
            1: "Обычный день - ничего не произошло. Проехали сколько-то лиг.",
            2: "Дождь - снижается скорость передвижения на 2 лиги. Есть 20% шанс, что качество одного из случайных товаров будет понижено (товар намок и подпортился)",
            3: "Ровная дорога - повышается скорость +2 лиги в день, но не выше максимально возможной",
            4: "Телега сломалась день в пустую, стоим на месте" ,
            5: "Река - потратил целый день, пока искал брод. Проехал от 1 до 2 лиг", 
            6: "Встретил местного - удалось срезать часть пути, в этот день проехали больше на 3 - 6 лиг дополнительно к скорости передвижения.",
            7: "Разбойники большой дороги - откупился или деньгами (если они есть) или частью товара. Разбойники забирают случайное количество самого лучшего товара из тех, что есть у торговца.",
            8: "Придорожный трактир - Торговец решает хочет ли остановиться на отдых. Если останавливаемся, то решаем хотим ли торговать, есть вероятность обменять/продать/купить товар. Если останавливаемся, то тратим часть денег на еду/ночлег.", 
            9: "Товар испортился - Случайно испортился один из товаров. Можно реализовать как уменьшение качества, или уничтожать полностью (выкидывать из телеги)."

        }
    }
    getAllOfEvetn(){
        return this._AllOfEvent();
    }
}

// Create Class Object

let City = new city();
let Dealer = new dealer();
let Product = new product();



// All function

function hideTabsContent(a){
    for(var i = a;i< tabContent.length ; i++){
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}

function showTabsContent(b){
    if(tabContent[b].classList.contains('hide')){
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

// Listener

exit.addEventListener('click',()=>{
    localStorage.removeItem("login");
    localStorage.removeItem('dealerInfo');
    document.location.href = "index.html";
    console.log("exit");
})

add.onclick = function(event){
    var target = event.target;
    if(target.className == 'tab'){
        for(var i = 0 ; i <tab.length;i++){
            if(target == tab[i]){
                //console.log(target);
                //console.log(tab[i]);
                showTabsContent(i);
                break;
            }
        }
    }
}

AddBtn.addEventListener('click',(event)=>{
    
    if(click / 2 == 0){
        //console.log(click);
        add.style.top = "50px";
        add.style.display = "block";
        click = click + 1;
    }else{
        //console.log(click);
        add.style.top = "-1000px";
        click = click - 1;
    }
   
})

///City LIstener

cityName.addEventListener("input",(event)=>{
    NameOfCity = event.target.value;
})

cityDistance.addEventListener("input",(event)=>{
    DistanceOfCity = event.target.value;
    if(!(DistanceOfCity <= 100)){
        cityAdd.setAttribute("disabled","disabled");
        addErrors.innerHTML = "Значение больше положенного. Максимальное значение 100";
        cityDistance.value = 0;
    }else if(!(DistanceOfCity >= 50)){
        cityAdd.setAttribute("disabled","disabled");
        addErrors.innerHTML = "Значение больше положенного. Минимальное значение 50";
        cityDistance.value = 0;
    }
    else{
        cityAdd.removeAttribute("disabled");
        //console.log("Okey");
    }
    //console.log(DistanceOfCity);
})

cityAdd.addEventListener('click',()=>{
    fetch('https://admin.tolykbaiev.kz/cities', {
        method: 'post',
        body: JSON.stringify({cityName: NameOfCity, cityDistance: DistanceOfCity }),
        headers: {
        'content-type': 'application/json',
        'Accept': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    }).then(function (response) {
        //console.log(response);
        response.json().then((data) => {
            //console.log(data);
            if(data['access'] == false){
                addErrors.innerHTML += `<p>Название ${NameOfCity} Занято введите другое</p>`
                let contin = document.getElementById('contin');
                cityName.value = "";
                cityDistance.value = 0;
                // inputGame.value = "";
            }else{
                addErrors.innerHTML = "";
            }
         });
        })
    cityName.value = "";
    cityDistance.value = "";
    
})


/// Event Listener

eventName.addEventListener("input",(event)=>{
    NameOfEvent = event.target.value;
})

eventDescription.addEventListener("input",(event)=>{
    DiscriptionOfEvent = event.target.value;
})

eventSpeedDebuff.addEventListener("input",(event)=>{
    SpeedDebuffOfEvent = event.target.value;
    if(!(SpeedDebuffOfEvent <= 20)){
        eventAdd.setAttribute("disabled","disabled");
        addErrors.innerHTML = "Значение больше положенного. Максимальное значение 20";
        eventSpeedDebuff.value = 0;
    }
    else{
        eventAdd.removeAttribute("disabled");
        //console.log("Okey");
    }
    //console.log(DistanceOfCity);
})

eventLuckDebuff.addEventListener("input",(event)=>{
    LuckDebuffOfEvent = event.target.value;
    if(!(LuckDebuffOfEvent <= 20)){
        eventAdd.setAttribute("disabled","disabled");
        addErrors.innerHTML = "Значение больше положенного. Максимальное значение 20";
        eventLuckDebuff.value = 0;
    }
    else{
        eventAdd.removeAttribute("disabled");
        //console.log("Okey");
    }
    //console.log(DistanceOfCity);
})

eventAdd.addEventListener('click',()=>{
    fetch('https://admin.tolykbaiev.kz/event', {
        method: 'post',
        body: JSON.stringify({NameOfEvent: NameOfEvent, DiscriptionOfEvent: DiscriptionOfEvent, SpeedDebuffOfEvent: SpeedDebuffOfEvent, LuckDebuffOfEvent: LuckDebuffOfEvent}),
        headers: {
        'content-type': 'application/json',
        'Accept': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    }).then(function (response) {
        //console.log(response);
        response.json().then((data) => {
            //console.log(data);
            if(data['access'] == false){
                addErrors.innerHTML += `<p>Название ${NameOfEvent} Занято введите другое</p>`
                eventName.value = " ";
                eventDescription.value = " ";
                eventSpeedDebuff.value = " ";
                eventLuckDebuff.value = " ";
                // inputGame.value = "";
            }else{
                addErrors.innerHTML = "";
                eventName.value = " ";
                eventDescription.value = " ";
                eventSpeedDebuff.value = " ";
                eventLuckDebuff.value = " ";
            }
         });
        })
    cityName.value = "";
    cityDistance.value = "";
    
})

//Product Listener

productName.addEventListener("input",(event)=>{
    NameOfProduct = event.target.value;
})

productWeight.addEventListener("input",(event)=>{
    WeightfOfProduct = event.target.value;
    if(!(WeightfOfProduct <= 200)){
        productAdd.setAttribute("disabled","disabled");
        addErrors.innerHTML = "Значение больше положенного. Максимальное значение 200";
        WeightfOfProduct.value = 0;
    }
    else{
        productAdd.removeAttribute("disabled");
        //console.log("Okey");
    }
    //console.log(DistanceOfCity);
})

productCost.addEventListener("input",(event)=>{
    CostOfProduct = event.target.value;
    if(!(CostOfProduct <= 200000)){
        productAdd.setAttribute("disabled","disabled");
        addErrors.innerHTML = "Значение больше положенного. Максимальное значение 200 000";
        productCost.value = 0;
    }
    else{
        productAdd.removeAttribute("disabled");
        //console.log("Okey");
    }
    //console.log(DistanceOfCity);
})

productType.addEventListener("input",(event)=>{
    TypeOfProduct = event.target.value;
})


productStatus.addEventListener("input",(event)=>{
    StatusOfProduct = event.target.value;
    //console.log(StatusOfProduct);
})

productStatusInfo.addEventListener('click',()=>{

    if(click2 / 2 == 0){
        //console.log(click);
        productStatusInfo.innerHTML = `
        <p>• нормальное - 1.2 </p>
        <p>• слегка испорчен - 0.95 </p>
        <p>• половина испортилась - 0.55 </p>
        <p>• почти весь пропал - 0.25 </p>
        <p>• испорчен в хлам - 0.1 </p>  
    `;
    }else{
        //console.log(click);
        productStatusInfo.innerHTML = `<p>Информация о статусе продукта</p>`;
    }
    
})

productAdd.addEventListener('click',()=>{
    fetch('https://admin.tolykbaiev.kz/products', {
        method: 'post',
        body: JSON.stringify({NameOfProduct: NameOfProduct, WeightfOfProduct: WeightfOfProduct, CostOfProduct: CostOfProduct, TypeOfProduct: TypeOfProduct, StatusOfProduct: StatusOfProduct}),
        headers: {
        'content-type': 'application/json',
        'Accept': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    }).then(function (response) {
        //console.log(response);
        response.json().then((data) => {
            //console.log(data);
            if(data['access'] == false){
                addErrors.innerHTML += `<p>Название ${NameOfEvent} Занято введите другое</p>`
                productName.value = " ";
                productWeight.value = " ";
                productCost.value = " ";
                // inputGame.value = "";
            }else{
                addErrors.innerHTML = "";
                setTimeout(location.reload(), 2000);
            }
         });
        })
    cityName.value = "";
    cityDistance.value = "";
    
})


//Checkbox Listener

infoTable.onclick = function(event) {
    let checkboxInfo = document.getElementsByClassName('checkboxClass');
    let target = event.target.value;
    let id = event.target.type;
    if(id == "checkbox"){
        let block = document.getElementsByClassName(`${target}`);
        let Money = document.getElementById('Money');
        let Speed = document.getElementById('Speed');
        let weight = document.getElementById('weight');
        let savedInfo = JSON.parse(localStorage.getItem('dealerInfo'));
        let checking = event.target.checked;
        let storageMoney = savedInfo['money'];
        let storageWeght = savedInfo['weight'];
        let currentMoney = Money.textContent;
        let currentWeight = weight.textContent;
        adventureBtn(checking);

        if(checking){
            if(((currentMoney - block[2].textContent) <= 0) || ((currentWeight - block[1].textContent) <= 0)){
                event.target.setAttribute("disabled","disabled")
                event.target.checked = false;
            }else{
                currentMoney = currentMoney - block[2].textContent;
                currentWeight = currentWeight -block[1].textContent;
                Money.innerHTML = `${currentMoney}`;
                weight.innerHTML = `${currentWeight}`;
                Cheking();
            }
        }else{
            currentMoney = parseInt(currentMoney) + parseInt(block[2].textContent);
            currentWeight = parseInt(currentWeight) + parseInt(block[1].textContent);
            Money.innerHTML = `${currentMoney}`;
            weight.innerHTML = `${currentWeight}`;
            Cheking();
        }  

        function Cheking(){
            if(!(currentMoney < 0) || !(currentWeight < 0)){
                for(let i = 0; i< checkboxInfo.length; i++){
                    checkboxInfo[i].removeAttribute("disabled");
                }
            }
        }

    }else{
        console.log("error");
    }
}

//StartAdventureButton Listener

startAdventure.addEventListener('click',()=>{
    let checkboxInfo = document.getElementsByClassName('checkboxClass');
    let product;
    let login = localStorage.getItem("login");
    for(let i = 0;i<checkboxInfo.length;i++){
        if(checkboxInfo[i].checked){
            let block = document.getElementsByClassName(`${checkboxInfo[i].value}`);
            let Money = document.getElementById('Money');
            let Speed = document.getElementById('Speed');
            let weight = document.getElementById('weight');
            let cityName = document.getElementById('city');
            let cityDist = document.getElementById('cityDistance');

            let productNa = block[0].textContent;
            let currentMoney = Money.textContent;
            let currentWeight = weight.textContent;
            let currentSpeed = Speed.textContent;
            let currentCityName = cityName.textContent;
            let currentCityDistance = cityDist.textContent;

            product = JSON.stringify({name: productNa, login: login, cost:currentMoney, weight:currentWeight, speed:currentSpeed, cityName: currentCityName, cityDistance: currentCityDistance});

        fetch('http://zadanie.kz/save', {
            method: 'post',
            body: product,
            headers: {
            'content-type': 'application/json',
            'Accept': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then(function (response) {
            //console.log(response);
            response.json().then((data) => {
            //console.log(data);
            localStorage.setItem("adventureStart","true");
            document.location.href = "event.html";
            });
        })


        }
    }
})

// работа с checkbox и объявление эвентов, плюс работа с городами плюс сохранение, плюс дизайн
//function


function adventureBtn(btnInfo){
    if(btnInfo){
        startAdventure.removeAttribute("disabled");
        startAdventure.style.backgroundColor = "black";
        startAdventure.style.cursor = "pointer";
    }else{
        startAdventure.setAttribute("disabled", "disabled");
        startAdventure.style.backgroundColor = "grey";
        startAdventure.style.cursor = "default";
    }
    
}

function SaveServer(){
    fetch('http://zadanie.kz/save', {
        method: 'post',
        body: JSON.stringify({login: loginName}),
        headers: {
        'content-type': 'application/json',
        'Accept': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    }).then(function (response) {
        //console.log(response);
        response.json().then((data) => {
            //console.log(data);
            if(data['access'] == false){
                AccessText.innerHTML += `<p>Логин ${loginName} Занят введите другой. Если это вы, то продолжите</p>`
                AccessText.innerHTML += `<button id="contin"> Продолжить </button>`
                let contin = document.getElementById('contin');
                contin.addEventListener('click',()=>{
                    localStorage.setItem("login",loginName);
                    document.location.href = "gameInner.html";
                })
                // inputGame.value = "";
            }else{
                localStorage.setItem("login",loginName);
                document.location.href = "gameInner.html";
            }
         });
        })
}

//main function
function Main(){
    let adventure = localStorage.getItem("adventureStart")
    if(!adventure){
        hideTabsContent(1);
        City.getCity();
        Product.getProducts();
        Dealer.getDealerInfo();
    }else{
        document.location.href = "event.html";
    }
    //console.log(localStorage.getItem("login"));
}

Main();