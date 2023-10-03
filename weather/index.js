// Скриптэд хялбар лавлахын тулд DOM элементүүдийг сонгож, тэдгээрийг тогтмолуудад оноосон нь.
const card = document.querySelector(".card");
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search");
const tempBox = document.querySelector(".temp-box");
const weatherIcon = document.querySelector(".weather-icon img");
const currentTemp = document.querySelector(".current-temp");
const descriptionDisplay = document.querySelector(".description");
const locationResponseIcon = document.querySelector(".location-response-icon");
const locationResponseName = document.querySelector(".location-response-name");
const weatherDetails = document.querySelector(".weather-details");

// алдааны  талбар
const errorBox = document.querySelector(".error-box");
const errorIcon = document.querySelector(".error-icon img");
const errorMessage = document.querySelector(".error-message");

searchButton.addEventListener("click", search);
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        search();
    }
})

function search() {
    // reset хийгдэх
    tempBox.style.display = "none";
    errorBox.style.display = "none";

    // оролтоос хотын  нэрийг авах
    const cityName = document.querySelector(".search-bar input").value;

    if (cityName === '') { // хотын нэр хоосон бол температур талбарыг нуух 
        card.style.height = "128px";
        return;
    }

    const apiKey = "2b3bccfa779a4df7f9e33e29726b5c3d";
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(apiCall)
        .then(response => response.json())
        .then(result => {
            // хэрвээ алдаатай бол 
            if (result.cod == '404') {
                card.style.height = "385px";
                errorBox.style.display = "flex";
                errorIcon.classList.add("grow-in");
                errorMessage.classList.add("grow-in");
                return;
            }

            // хэрвээ амжилттай бол 
            tempBox.style.display = "flex";
            card.style.height = "720px";

            weatherIcon.classList.add("slide-in");
            currentTemp.classList.add("grow-in");
            descriptionDisplay.classList.add("grow-in");
            locationResponseIcon.classList.add("grow-in");
            locationResponseName.classList.add("grow-in");
            weatherDetails.classList.add("grow-in");

            // цаг агаарын мэдээлэл авах
            console.log(result);
            const city = result.name;
            const country = result.sys.country;
            const { description, id } = result.weather[0];
            const { temp, humidity } = result.main;
            const windSpeed = result.wind.speed;

            // Утгыг html рүү шилжүүлэх
            document.querySelector(".current-temp .num").innerText = Math.round(temp);
            document.querySelector(".description").innerText = getDescriptionTranslation(id);
            document.querySelector(".location-response-name").innerText = `${city}, ${country}`;
            document.querySelector(".humidity").innerText = humidity + "%";
            document.querySelector(".wind-speed").innerText = windSpeed + " Km/h";

            // weather icon орчуулга
            setWeatherIcon(id);

        })
}

function getDescriptionTranslation(weatherId) {
    switch (weatherId) {
        case 800:
            return "цэлмэг тэнгэр"; // Clear Sky
        case 801:
        case 802:
        case 803:
        case 804:
            return "үүлэрхэг"; // Cloudy
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
            return "бороо"; // Rain
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            return "цас"; // Snow
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            return "хэсэг"; // Агаар мандлын нөхцөл
        default:
            return "Unknown";
    }
}

function setWeatherIcon(weatherId) {
    const weatherIcon = document.querySelector(".weather-icon img");
    switch (weatherId) {
        case 800:
            weatherIcon.src = "./image/clear.svg";
            break;
        case 801:
        case 802:
        case 803:
        case 804:
            weatherIcon.src = "./image/cloud.svg";
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
            weatherIcon.src = "./image/rain.svg";
            break;
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            weatherIcon.src = "./image/snow.svg";
            break;
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            weatherIcon.src = "./image/haze.svg";
            break;
        default:
            weatherIcon.src = "";
    }
}
