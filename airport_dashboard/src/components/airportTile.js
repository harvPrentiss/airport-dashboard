import React from "react"
import styled from 'styled-components'

import {getAirportPoints, getAirportWeather} from '../services/weatherAPI'

const TileContainer = styled.div`
    border: 1px solid black;
    width: 450px;
    position: relative;
    margin-right: 5px;
    margin-bottom: 5px;
`

const NameHeader = styled.div`
    background-color: lightgray;
    font-weight: bold;
    padding: 0 20px;
`

const TimeContainer = styled.div`
    padding: 0 5px;
`

const WeatherContainer = styled.div`
    padding: 0 5px;
`

const RefreshContainer = styled.div`
    position: absolute;
    bottom: 0px;
    right: 2px;
    color: blue;
    cursor: pointer;
`

const RemoveContainer = styled.div`
    position: absolute;
    top: -3px;
    right: 5px;
    color: red;
    cursor: pointer;
`

export default class AirportTile extends React.Component {

    constructor(){
        super();
        this.state = {
            loading: true,
            forecastURL: '',
            temperature: '',
            temperatureUnit: '',
            windSpeed: '',
            windDirection: '',
            shortForecast: ''
        };
    }

    componentDidMount(){
        getAirportPoints({long:this.props.airport.long, lat: this.props.airport.lat})
        .then(res => {
            if(res.status === 200){
                this.setState({forecastURL: res.data.properties.forecast}, () =>{
                    this.getAirportWeather();
                } );
            }
        })
        .catch(err => {
            console.group(err);
        });
    }

    getAirportWeather = () =>{
        getAirportWeather({weatherURL: this.state.forecastURL})
        .then(res => {
            if(res.status == 200){
                this.setState({
                    temperature: res.data.properties.periods[0].temperature,
                    temperatureUnit: res.data.properties.periods[0].temperatureUnit,
                    windSpeed: res.data.properties.periods[0].windSpeed,
                    windDirection: res.data.properties.periods[0].windDirection,
                    shortForecast: res.data.properties.periods[0].shortForecast
                })
            }
        })
        .catch(err => { 
            console.log(err);
        });
    }

    remove = () => {
        this.props.removeMethod(this.props.id);
    }

    render(){
        return (
            <TileContainer>
                <NameHeader>{this.props.airport.name}</NameHeader>
                <TimeContainer>
                    <strong>Local Time:</strong> {new Date().toLocaleString('en-US', {timeZone: this.props.airport.timezone})}
                </TimeContainer>
                <WeatherContainer>
                    <strong>Temperature:</strong> {this.state.temperature} {this.state.temperatureUnit}
                    <br/>
                    <strong>Wind Speed:</strong> {this.state.windSpeed} {this.state.windDirection}
                    <br/>
                    <strong>Current Weather:</strong> {this.state.shortForecast}
                </WeatherContainer>
                <RefreshContainer onClick={this.getAirportWeather}>Refresh</RefreshContainer>
                <RemoveContainer onClick={this.remove}>X</RemoveContainer>
            </TileContainer>
        )
    }

}