//console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//console.log('search:'+search        )
const messageHdrTitle = document.querySelector('#message-header-title')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIconImg = document.querySelector('#weather_icon')

const divResultOutput = document.querySelector('#div-result-output')
divResultOutput.style.display = "none";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageHdrTitle.textContent = ''
    //console.log('Client side javascript file is loaded! before fetch')
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageHdrTitle.textContent = 'Forecast Result:'
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                weatherIconImg.src = data.weather_icons_url
                divResultOutput.style.display = "block";

            }
        })
    })
})