
const APIKey = prompt('Enter your APIKey: ')

const container = document.querySelector('.wt-card')
const search = document.querySelector('.wt-card__search button')
const weatherBox = document.querySelector('.wt-card__current')
const weatherDetails = document.querySelector('.wt-card__details')
const error404 = document.querySelector('.wt-card__not-found')

search.addEventListener('click', () => {

    const city = document.querySelector('.wt-card__search input').value

    if (city === '') return

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px'
                weatherBox.style.display = 'none'
                weatherDetails.style.display = 'none'
                error404.style.display = 'block'
                error404.classList.add('fade-in')
                return
            }

            error404.style.display = 'none'
            error404.classList.remove('fade-in')

            console.log(json)

            const weatherImage = document.querySelector('.wt-card__current img')
            const weatherTemp = document.querySelector('.wt-card__current-temperature')
            const weatherDesc = document.querySelector('.wt-card__current-description')
            const humidity = document.querySelector('.humidity span')
            const wind = document.querySelector('.wind span')

            switch (json.weather[0].main) {
                case 'Clear':
                    weatherImage.src = './images/clear-day.svg'
                    break
                case 'Rain':
                    weatherImage.src = './images/rain.svg'
                    break
                case 'Clouds':
                    weatherImage.src = './images/cloudy.svg'
                    break
                case 'Snow':
                    weatherImage.src = './images/snow.svg'
                    break
                case 'Haze':
                    weatherImage.src = './images/mist.svg'
                    break

                default:
                    weatherImage.src = ''

                
            }

            weatherTemp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            weatherDesc.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fade-in');
            weatherDetails.classList.add('fade-in');
            container.style.height = '590px';

        })
})