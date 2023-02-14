const apiKey = '31bc9fcdacc37b494ffc295523a5f668';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=31bc9fcdacc37b494ffc295523a5f668`;

fetch(url).then((response) => {
   return response.json()
}).then((data) => {
})
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
const main = document.querySelector('.main');

// Объявляем настоящее дату и время
const today = new Date();
const day = today.toLocaleDateString();
const time = today.toLocaleTimeString ()
const now = day + " " + time;
const hours = today.getHours();

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
                <div class="card card--active">Город не найден</div>`
                main.insertAdjacentHTML('afterbegin', html);           
        } else{
        removeCard()
        // Делаем заглавной первую букву описания погоды
        const weatherDescription = data.weather['0'].description;
        const wDescription = weatherDescription.replace(weatherDescription[0], weatherDescription[0].toUpperCase());
         // Разметка для карточки
         const html = `
            <div class="card">
                <h2 class="card__title-city">${data.name}<span class="card__GB">${data.sys.country}</span></h2>
                <div class="today">
                    <span class='clock'>${day}</span>
                    <span class='clock'>${time}</span>
                </div>
                <div class="card__weather">
                    <p class="card__value">${Math.round(data.main.temp)}<sup>°c</sup> </p>
                    <div class="box">
                        <img src="https://openweathermap.org/img/wn/${data.weather['0'].icon}@4x.png" alt="weather" class="card__img">
                    </div>
                </div>
                <div class="card__description-cloud">${wDescription}</div>
            </div>`;
        main.insertAdjacentHTML('afterbegin', html);
        //Очищаем поле ввода и возвращаем на него фокус
        input.value = '';
        input.focus();
        }   
     });
}
// В зависимости от времени суток изменяем дизайн страницы.
if(19 < hours && hours < 24 || hours < 7){
    document.body.classList.add('dark');
} else {
    const isDark = document.body.classList.remove('dark');

    if(isDark){
        localStorage.setItem('darkMode', 'dark');
    } else{
        localStorage.setItem('darkMode', 'light'); 
    }
}
