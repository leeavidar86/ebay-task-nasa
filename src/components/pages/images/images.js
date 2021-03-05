import React, { Component } from "react";
import style from './images.module.scss'
import DatePicker from 'react-datepicker';
import {formatDate, getImagesFromApiByDate} from '../../helper/helper'
import Loader from '../../shared/loader/loader'
import "react-datepicker/dist/react-datepicker.css";
// import ReactPaginate from 'react-paginate';


export default class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
          imageArray:[],
          startDate: new Date(),
          userMessage:'',
          loader:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
       // this.handlePageClick = this.handlePageClick.bind(this);
      }
      handleChange(date) {

        this.setState({
          startDate: date
        })
      }
  
      async onFormSubmit(e) {
        e.preventDefault();
        this.setState({loader:true, userMessage:''})
        let newDate = formatDate(this.state.startDate);
        let dataFromApi = await getImagesFromApiByDate(newDate);
        if(dataFromApi.photos.length === 0) {
            this.setState({userMessage: 'No images for this date, please choose another date :)', imageArray:[],loader:false})
        } else {
            this.setState({imageArray: dataFromApi.photos, userMessage:'', loader:false})
        }
        
      }
     

 
    render() {        
     
        return (
     <section className={style.imagesPage}>
        <h1>Mars images By Date</h1>
        <div className={style.imagesConteiner}>
        <div className={style.imagesFilter}>
        <form onSubmit={ this.onFormSubmit }>
            <div className="form-group">
                Earth date: 
            <DatePicker
                selected={ this.state.startDate }
                onChange={ this.handleChange }
                name="startDate"
                dateFormat="MM/dd/yyyy"
            />
            <button className={style.search}>Search <span  className={style.iconLupa}></span> </button>
            </div>
        </form>
        </div>
        {this.state.loader && (
            <Loader />
        )}
        <div className={style.imagesWrapper}>
             {this.state.userMessage&& <span>{this.state.userMessage}</span>}
            {this.state.imageArray && 
            this.state.imageArray.map((img)=>{
                return (
                    <div className={style.image}>
                        <img src={img.img_src} key={img.img_src} alt={img.img_src} />
                        <div className={style.imagesInfo}>
                            <ul>
                                <li>name: {img.rover.name}</li>
                                <li>landing date: {img.rover.landing_date}</li>
                                <li>launchdate: {img.rover.launch_date}</li>
                            </ul>
                        </div>
                    </div>
                )
                })
            }
          
        </div>

         
        </div>
        </section>
       )
    }
}