document.querySelector('#busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nomeCidade = document.querySelector('#nome_cidade').value;

    if (!nomeCidade) {
        document.querySelector("#clima").classList.remove('show');
        //showAlert('Você precisa digitar uma cidade...');
        return;
    }

    const apiKey = '7f73a2da2e9ec5bb2c52193d9874e513';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomeCidade)}&appid=${apiKey}&units=metric&lang=pt_br`
    console.log('Fez a chamada');

    const results = await fetch(apiUrl);
    const json = await results.json();

    console.log(json)

    if(json.cod === 200){
        showInfo({
            cidade:json.name,
            pais: json.sys.country,
            temp: json.main.temp,
            tempMx: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
        });
    } else {
        return;
        //showAlert('Não foi possível localizar...')
    }

});



function showInfo(json){
    //showAlert(''); 

    console.log(json.cidade);

    document.getElementById('title').innerHTML = " " + json.cidade + "," + json.pais;

    document.getElementById('temp_value').innerHTML = `${json.temp} <sup>Cº</sup>`;

    document.getElementById('temp_description').innerHTML = `${json.description}`;

    document.getElementById('temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.getElementById('temp_max').innerHTML = `${json.tempMx} <sup>Cº</sup>`;

    document.getElementById('temp_min').innerHTML = `${json.tempMin} <sup>Cº</sup>`;

    document.getElementById("clima").classList.add('show');
}

// function showAlert(msg){
//     document.getElementById('#alert').innerHTML = msg;
// }
