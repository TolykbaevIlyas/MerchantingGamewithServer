let inputGame = document.getElementById('inputGame');
let PlayButton = document.getElementById('PlayButton');
let AccessText = document.getElementById('AccessText');
let loginName = "";

if(localStorage.getItem("login") == null){
    PlayButton.setAttribute("disabled", "disabled");
    PlayButton.style.color = "black";
    PlayButton.style.backgroundColor = "gray";
    PlayButton.style.cursor = "context-menu";

inputGame.addEventListener("input",(event)=>{
    loginName = event.target.value;
    if(event.data == null){
        PlayButton.setAttribute("disabled", "disabled");
        PlayButton.style.color = "black";
        PlayButton.style.backgroundColor = "gray";
        PlayButton.style.cursor = "context-menu";
    }
    else{
        // document.location.href = "/gameInner.html";
        PlayButton.removeAttribute("disabled");
        PlayButton.style.color = "white";
        PlayButton.style.backgroundColor = "black";
        PlayButton.style.cursor = "pointer";

        //console.log(login)
    }
})

PlayButton.addEventListener('click',()=>{
    fetch('https://admin.tolykbaiev.kz/dealer', {
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
})
}else{
    document.location.href = "gameInner.html";
}
