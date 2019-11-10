import axios from 'axios';
const apiUrl = 'https://api.weather.gov/';

export const getWeatherStation = (props) => {
	var responses = axios.get(apiUrl + 'stations/K' + props.airportCode)
		.then (response => {
			return response;
		})
		.catch(e => {
			return e.response;
		})
	return responses;
}

export const getAirportPoints = (props) => {
	var responses = axios.get(apiUrl + 'points/' + props.long +',' + props.lat)
		.then (response => {
			return response;
		})
		.catch(e => {
			return e.response;
		})
	return responses;
}

export const getAirportWeather = (props) => {
	var responses = axios.get(props.weatherURL)
		.then (response => {
			return response;
		})
		.catch(e => {
			return e.response;
		})
	return responses;
}