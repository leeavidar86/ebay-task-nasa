import React, { Component } from "react";
import style from './weather.module.scss'

import {getWeatherFromApi} from '../../helper/helper';
import Loader from '../../shared/loader/loader';
import {WEATHER} from '../../api/images.mock'

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
          weatherInfoList:WEATHER,
          loader:false,
          displayData:false
        };
      }
    async componentDidMount(){
       // this.setState({ loader:true},()=>{console.log(this.state.weatherInfoList)})
        // if(this.state.weatherInfoList) {
            
        //     this.setState({ displayData:true})
        // }
        let dataFromApi = await getWeatherFromApi();
         this.setState({weatherInfoList:dataFromApi}, ()=>{
        this.setState({loader:false,displayData:true})
        })

    }
    render() {        
   
        return (<>
            <section className={style.weatherPage}>
                <h1>Mars Weather</h1>
                {this.state.loader && (
                  <Loader />
                )}
                    <div className={style.weatherBoxWrapper}>

                    {this.state.displayData && 
                        Object.entries(this.state.weatherInfoList).map(([key, value]) => {
                            if(key !== 'sol_keys' && key !== 'validity_checks') {
                                return(
                                    <div className={style.weatherBox} key={key}> 
                                    <ul>
                                        <li><span className={style.title}>Data point:</span><span>{key} </span></li>
                                        <li><span className={style.title}>Temperatura[AVG]:</span><span> - </span></li>
                                        <li><span className={style.title}>Wind[AVG]:</span><span> - </span></li>
                                        <li><span className={style.title}>Pressure[AVG]:</span><span>{value.PRE.av} </span></li>
                                        <li><span className={style.title}>First UTC:</span><span>"{value.First_UTC}" </span></li>
                                        <li><span className={style.title}>Last UTC:</span><span>"{value.Last_UTC}" </span></li>  
                                    </ul>
                                </div>
                                ) 
                            }
                               
                      })
                
                    }
                    </div>

            </section>
        </>)
    }
}