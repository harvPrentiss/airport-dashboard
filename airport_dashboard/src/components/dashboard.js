import React from "react"
import styled from 'styled-components'
import AirportTile from './airportTile'

import {getWeatherStation} from '../services/weatherAPI'

const ControlContainer = styled.div`
    padding: 20px 25px;
`

const ErrorMessageContainer = styled.div`
    color: red;
`

const AirportBox = styled.input`

`

const AddButton = styled.button`

`

const AirportTileContainer = styled.div`
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
`



export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            airportCode: '',
            errorMessage: '',
            airportCodeList: []
        };
    }

    onChange = (event) =>{
        this.setState({airportCode: event.target.value.toUpperCase()});
    }

    getAirportData = () =>{
        if(this.state.airportCode.length > 3){
            this.setState({errorMessage: 'Airport codes are only 3 letters'});
        }
        else if(this.checkDuplicate(this.state.airportCode)){
            this.setState({errorMessage: 'This airport code already exists in the dashboard'});
        }
        else{
            getWeatherStation({airportCode:this.state.airportCode})
            .then(res => {
                if(res.status == 200){
                    this.setState(prevState => ({
                        errorMessage: '',
                        airportCodeList: prevState.airportCodeList.concat(
                            [
                                {
                                    code: this.state.airportCode,
                                    timezone: res.data.properties.timeZone, 
                                    lat:Number(res.data.geometry.coordinates[0].toFixed(4)), 
                                    long:Number(res.data.geometry.coordinates[1].toFixed(4)),
                                    name: res.data.properties.name
                                }
                            ]
                        )                        
                    }));
                }
                else{
                    this.setState({errorMessage:'The code ' + this.state.airportCode + ' does not correspond to an airport'});
                }
            })
            .catch(err => {
                this.setState({errorMessage:'There was an error contacting the server'});
            })
        }
    }

    checkDuplicate = (code) =>{
        for(var i = 0; i < this.state.airportCodeList.length; i++){
            if(this.state.airportCodeList[i].code === code){
                return true;
            }
        }
        return false;
    }

    removeMethod = (id) => {
        let tempList = this.state.airportCodeList;
        tempList.splice(id,1);
        this.setState({airportCodeList: tempList});
    }

    render(){
        return (
            <ControlContainer>
                Type in the airports 3 letter code and press Add Airport to add it ot your dashboard.
                <br/>
                <br/>
                <AirportBox type='text' value={this.state.airportCode} onChange={this.onChange} ></AirportBox>
                <AddButton onClick={this.getAirportData}>Add Airport</AddButton>
                <ErrorMessageContainer>{this.state.errorMessage}</ErrorMessageContainer>
                <AirportTileContainer>
                    {this.state.airportCodeList.map((airport, index) =>{
                        return(
                            <AirportTile key={index} id={index} airport={airport} removeMethod={this.removeMethod}></AirportTile>
                        )
                        })
                    }
                </AirportTileContainer>
            </ControlContainer>
        )
    }

}