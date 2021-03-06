
import React, { Component } from "react";
import style from './about.module.scss'
 import Slider from 'infinite-react-carousel';
import Button from '../../shared/button/button';
import Loader from '../../shared/loader/loader';
import {ABOUT_PAGE_TEXT} from '../../helper/texts';
import {getImagesFromApiByDate} from '../../helper/helper';

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
          imageArray:[],
          loader:false,
          settings: {
            slidesPerRow: 1,
            slidesToShow:5,
            arrowsBlock:true,
            centerPadding:20,
            adaptiveHeight:true,
            nextArrow:<span><span className="customArrowRight"></span></span>,
            prevArrow:<span><span className="customArrowLeft"></span></span>,
          },
          displayGallery:false
        };
      }

     async componentDidMount(){
        this.setState({ loader:true })
        let yesterdayDate = this.getYesterdayDate();
        let dataFromApi = await getImagesFromApiByDate(yesterdayDate);

        this.setState({imageArray:dataFromApi.photos}, ()=>{
        this.setState({displayGallery:true, loader:false})
        })

    }
 
    getYesterdayDate() {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1);

        const month = yesterday.getUTCMonth() + 1; 
         const day = yesterday.getUTCDate();
        const year = yesterday.getUTCFullYear()-1; //there are no images for the last day  so i took the last year

        const dateFormat = year + "-" + month + "-" + day;
        return dateFormat
    }


    render() {        
        const { settings,loader,displayGallery,imageArray } = this.state;
        console.log(imageArray)
      return (
        <section className={style.aboutPage}>
            <h1>About The Program</h1>
            
            <section className={style.topSection}>
            {loader && (
                <Loader />
            )}
            {displayGallery && (
                <div className={style.imageWrapper}>
                    <img  src={imageArray[0].img_src} alt="" />
                    <span>Curiosity rover image</span>
                </div>
            )
              
                }
                <div className={style.information}>
                   <p> {ABOUT_PAGE_TEXT}</p>
                   <div className={style.buttonsWrapper}>
                        <Button text="View Images By Date" url="images" />
                        <Button text="View Weather" url="weather" />
                   </div>
                </div>
            </section>
            <section className={style.bottomSection}>
            <h2>Curiosity rover images <span>from today</span></h2>
            {loader && (
            <Loader />
        )}
            {displayGallery && 
                <Slider {...settings}>
                    {imageArray.map((img)=>{
                        return <img src={img.img_src} key={img.img_src} alt={img.img_src} />
                    })
                }
                </Slider>
            }

            </section>
        </section>
      );
    }
  }
  