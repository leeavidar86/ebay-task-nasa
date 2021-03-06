import React, { Component } from "react";
import style from './weather.module.scss'
import {getWeatherFromApi} from '../../helper/helper';
import Loader from '../../shared/loader/loader';
import Button from '../../shared/button/button';
import {WEATHER} from '../../api/mock'
import ReactPaginate from 'react-paginate';

//Sorting - not working
const sortTypes = {
	up: {
		class: 'sort-up',
		fn: (a, b) => a.value.PRE.av - b.value.PRE.av
	},
	down: {
		class: 'sort-down',
		fn: (a, b) => b.value.PRE.av - a.value.PRE.av
	},
	default: {
		class: 'sort',
		fn: (a, b) => a
	}
};
export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
          weatherInfoList:{},
          loader:false,
          displayData:false,

          //Sorting - not working
          selectValueToSort:'Temperatura',
          currentSort: 'default',
        };
      }

      //Sorting - not working
      onSortChange = () => {
		const { currentSort } = this.state;
		let nextSort;
		if (currentSort === 'down') nextSort = 'up';
		else if (currentSort === 'up') nextSort = 'default';
		else if (currentSort === 'default') nextSort = 'down';
        let newObj = [...this.state.weatherInfoList].sort(sortTypes[currentSort].fn);
        console.log(newObj)
		this.setState({
			currentSort: nextSort
		});
	};
    async componentDidMount(){
       this.getWeather();
    }

    async getWeather(){
        let dataFromApi = await getWeatherFromApi();
        if(dataFromApi.length === 0) {
            this.setState({loader:true,displayData:false})
        } else{
            this.setState({
                weatherInfoList:dataFromApi,
                loader:false,
                displayData:true

            })
            
        }
     
    }

    //Sorting - not working
    handleSortChange = (e) => {
        this.setState({selectValueToSort:e.target.value},()=>{
          //  this.onSortChange()
        });

    }
    
    render() {        
        const { selectValue,loader,displayData,weatherInfoList } = this.state;

        return (
            <section className={style.weatherPage}>
                <div className={style.titleWrapper}>
                    <Button text="< Back" url="/" isLink={true}/>
                    <h1>Mars Weather</h1>
                    <div className={style.sortBox}>
                    Sort By: 
                    <select value="Pressure"    
                        value={selectValue} 
                        onChange={this.handleSortChange} >
                        <option value="Temperatura">Temperatura</option>
                        <option value="Pressure">Pressure</option>
                        <option value="Wind">Wind</option>
                        </select>
                    </div>
                </div>
                
                {loader && (
                  <Loader />
                )}
                    <div className={style.weatherBoxWrapper}>

                    {displayData && 
                        Object.entries(weatherInfoList).map(([key, value]) => {
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
        )
    }
}