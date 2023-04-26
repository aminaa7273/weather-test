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

function search () {

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
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`

    fetch(apiCall)
    .then(response => response.json())
    // Амжилттай
    .then(
        result => {


            // хэрвээ алдаатай бол 
            if (result.cod == '404') {
                card.style.height = "385px"
                errorBox.style.display = "flex";
                errorIcon.classList.add("grow-in");
                errorMessage.classList.add("grow-in");
                return;
            }

            // хэрвээ амжилттай бол 
            tempBox.style.display = "flex";
            card.style.height = "720px"

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
            const {description, id} = result.weather[0];
            const {temp, humidity, } = result.main;
            const windSpeed = result.wind.speed;

            // Утгыг html рүү шилжүүлэх
            document.querySelector(".current-temp .num").innerText = Math.round(temp);
            document.querySelector(".description").innerText = description;
            document.querySelector(".location-response-name").innerText = `${city}, ${country}`;
            document.querySelector(".humidity").innerText = humidity + "%";
            document.querySelector(".wind-speed").innerText = windSpeed + " Km/h";
              //  https://openweathermap.org/weather-conditions
            if (id === 800) {
                weatherIcon.src = "./image/clear.svg";
            }
            else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
                weatherIcon.src = "./image/rain.svg";
            }
            else if (id >= 600 && id <= 622) {
                weatherIcon.src = "./image/snow.svg";
            }
            else if (id >= 701 && id <= 781) {
                weatherIcon.src = "./image/storm.svg";
            }
            else if (id >= 801 && id <= 804) {
                weatherIcon.src = "./image/cloud.svg";
            }
        }
    )

}