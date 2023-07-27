/*----------------------------------All the variable are initialized here
including the weather api url---------------------------------------*/

let city = "";
const  api_url = "https://api.openweathermap.org/data/2.5/weather?q=";
const api_key = "531f6b9b291d2f885fb702ef88d4880c";
const api_url_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
let clicked = "";

/*--------------------------------This function is called by the click of the button----------------------------------*/

function cities_weather (clicked)
{
    /*-------------------------The function will fetch the URL JSON object
    and the DOM will display that information on the main page------------------------------------*/
    /*----------------------This call out the current weather-------------------------------*/
    fetch(api_url + clicked + "&units=metric&appid=" + api_key)
        .then(response => response.json())
        .then(data =>
        {
            console.log(data)
            document.getElementById("main_image_display").src = "images_weather/" +`${data.weather[0].icon}`
            + ".png";
            document.getElementById("daily_temp").innerHTML = data.main.temp;
            document.getElementById("daily_wind").innerHTML = data.wind.speed;
            document.getElementById("city_name").innerHTML = data.name;

        })
        .catch(err => console.log("Error!"));

    /*---------------------------This function will call out the weather forecast--------------------------------*/
    function forecast()
    {
        let count = 1;
        fetch( api_url_forecast + clicked + "&units=metric&appid=" + api_key)
            .then(response => response.json())
            .then(data2 =>
            {
                /*----------------------------The loop function will iterate through the list and get the
                weather data for particular days in fixed time-------------------------------*/
                /*-----------------------The loop acquires information needed by the html-----------------------------*/
                for (let i = 7; i < data2.list.length; i = i + 7)
                {
                    document.getElementById("date" + count).innerHTML = new Date(data2.list[i].dt * 1000
                    ).toDateString();
                    document.getElementById("weather_icon" + count).src = "images_weather/"
                        + `${data2.list[i].weather[0].icon}` + ".png";
                    document.getElementById("temp" + count).innerHTML = data2.list[i].main.temp;
                    document.getElementById("wind" + count).innerHTML = data2.list[i].wind.speed;
                    document.getElementById("humidity" + count).innerHTML = data2.list[i].main.humidity;
                        count += 1;
                }
            })
            .catch(err => console.log("Error!"));
    }
    forecast();
}

/*--------------------------This function call out the main functions from the search entered by the user--------------
---------------------*/
function search_city()
{
    city = document.getElementById("city-search").value;
    console.log(city);
    cities_weather(city);

}

