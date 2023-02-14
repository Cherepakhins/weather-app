const apiKey = '31bc9fcdacc37b494ffc295523a5f668';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=31bc9fcdacc37b494ffc295523a5f668`;

fetch(url).then((response) => {
   return response.json()
}).then((data) => {
    console.log(data);
})
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
const header = document.querySelector('.header');

function removeCard () {
    const prevCard = document.querySelector('.card');
    if(prevCard) prevCard.remove();
}

// Отправка формы
form.onsubmit = function (e) {
    // Отменяем отправку формы
    e.preventDefault();

    // Берем значения из инпута и обрезаем пробелы 
    let city = input.value.trim();

    // Делаем запрос на сервер
    // Адрес запроса
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    //Выполняем запрос
    fetch(url).then((response) => {
        return response.json()
     }).then((data) => {
         // Проверка на ошибку 
         if(data.cod === "404"){
            removeCard()
            // Отобразить карточку с ошибкой
            const html = `
            <main class="main">
                <div class="card card--active">Город не найден</div>
            </main>`
            header.insertAdjacentHTML('afterend', html);           
        } else{
        removeCard()
         // Разметка для карточки
         const html = `
         <main class="main">
            <div class="card">
                <h2 class="card__title-city">${data.name}<span class="card__GB">${data.sys.country}</span></h2>
                
                <div class="card__weather">
                    <p class="card__value">${Math.round(data.main.temp)}<sup>°c</sup> </p>
                    <img src="https://openweathermap.org/img/wn/${data.weather['0'].icon}@4x.png" alt="weather" class="card__img">
                </div>
                <div class="card__description-cloud">${data.weather['0'].description}</div>
            </div>
        </main>`;
        header.insertAdjacentHTML('afterend', html);
        //Очищаем поле ввода и возвращаем на него фокус
        input.value = '';
        input.focus();
        }   
     });
}
