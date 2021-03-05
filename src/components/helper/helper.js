import {IMAGE_API,API_KEY,WEATHER_API} from '../api/config'

export const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
export const getImagesFromApiByDate = async (date) => {
    const data = await (await fetch(`${IMAGE_API}?earth_date=${date}&api_key=${API_KEY}&page=1`)).json();
    return data;
  }

  export const getWeatherFromApi = async () => {
    const data = await (await fetch(`${WEATHER_API}`)).json();
    return data;
  }