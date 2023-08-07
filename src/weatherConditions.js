import clear from './img/weather/sun.png'
import partCloudy from './img/weather/cloudy.png'
import rain from './img/weather/rainy-day.png'
import storm from './img/weather/storm.png'
import cloudy from './img/weather/cloud.png'



export const weatherConditions =[
    {
        condition:'Clear',
        img: clear
    },
    {
        condition: 'Partially cloudy',
        img: partCloudy
    },
    {
        condition: 'Rain',
        img: rain
    },
    {
        condition: 'Thunderstorm',
        img: storm
    },
    {
        condition: 'Overcast',
        img: cloudy
    }
]