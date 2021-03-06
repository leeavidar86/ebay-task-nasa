import React, { Component } from "react";
import style from './images.module.scss'
import DatePicker from 'react-datepicker';
import {formatDate, getImagesFromApiByDate} from '../../helper/helper'
import Loader from '../../shared/loader/loader'
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from 'react-paginate';
import Button from '../../shared/button/button';

export default class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
          imageArray:[],
          startDate: new Date(),
          userMessage:'',
          loader:false,
          originalImageArrayLength:0,
          offset: 0,
          perPage: 15,
          currentPage: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
      }
      handleChange(date) {

        this.setState({
          startDate: date
        })
      }
      async getImages () {
        this.setState({loader:true, userMessage:''})

        let newDate = formatDate(this.state.startDate);
        let dataFromApi = await getImagesFromApiByDate(newDate);
        if(dataFromApi.photos.length === 0) {
            this.setState({userMessage: 'No images for this date, please choose another date :)', imageArray:[],loader:false})
        } else {
            let sliceDataFromApi = dataFromApi.photos.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({ 
                originalImageArrayLength:dataFromApi.photos.length,
                imageArray: sliceDataFromApi,
                userMessage:'', 
                loader:false,  
                pageCount: Math.ceil(dataFromApi.photos.length / this.state.perPage)
            })
        }
      }
      async onFormSubmit(e) {
        e.preventDefault();
        this.getImages()
        
      }
     
      handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
  
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getImages()
        });
  
    };
 
    render() {        
        const { startDate,loader,userMessage,imageArray,originalImageArrayLength } = this.state;

        return (
         <section className={style.imagesPage}>
        <Button text="< Back" url="/" isLink={true}/>
        <h1>Mars images By Date</h1>
        <div className={style.imagesConteiner}>
        <div className={style.imagesFilter}>
        <form onSubmit={ this.onFormSubmit }>
            <div className="form-group">
                Earth date: 
            <DatePicker
                selected={ startDate }
                onChange={ this.handleChange }
                name="startDate"
                dateFormat="MM/dd/yyyy"
            />
            <button className={style.search}>Search <span  className={style.iconLupa}></span> </button>
            </div>
        </form>
        </div>
        {loader && (
            <Loader />
        )}
        <div className={style.imagesWrapper}>
             {userMessage&& <span>{userMessage}</span>}
            {imageArray && 
            imageArray.map((img)=>{
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
        {imageArray && originalImageArrayLength > 15 &&

        <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/>
         
        }
        </div>
        </section>
       )
    }
}