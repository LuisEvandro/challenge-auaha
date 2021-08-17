import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './styles.module.scss'
import firebase from 'firebase/app'

import Slider from "react-slick";
import { Banner } from "../../../lib/interfaces";
import { useEffect, useState } from "react";

export function MainCarrosel() {
    const [ banners, setBanners ] = useState<Banner[]>([])

    async function getBanners() {
        const bannersTemp: Banner[] = []
        const querySnapshot = await firebase
                                .firestore()
                                .collection('banners')
                                .orderBy('order', 'asc')
                                .get();
    
        querySnapshot.forEach(function (doc: any) {
            bannersTemp.push({
                id: doc.id,
                ... doc.data(),
            })
        })

        setBanners(bannersTemp)
    }

    useEffect(() => {
        getBanners()
    }, [])


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: styles.button__bar,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    function SampleNextArrow(props: any) {
        const { className, style, onClick } = props;

        return (
            <img src="/images/arrow-right.svg" alt="próximo slide" className={className+' '+styles.arrowsSlide} onClick={onClick} style={{ ...style, right: "275px", width: "30px", height: "30px", zIndex: "100" }} />
        );
    }
      
    function SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <img src="/images/arrow-left.svg" alt="slide anterior" className={className+' '+styles.arrowsSlide} onClick={onClick} style={{ ...style, left: "275px", width: "30px", height: "30px", zIndex: "100" }} />
        );
    }
    
    return (
        <>
            <Slider {...settings}>
                {banners.length > 0 ? (
                    banners.map((img: Banner, index: number) => {
                        return (
                            <figure key={index}>
                                <img src={img.imagePath} alt={img.name} className={styles.slider_image} />
                            </figure>
                        )
                    })
                ):(
                    <figure>
                        <img src={'/images/no-image.png'} alt="Não contém slide" style={{margin: "auto"}} />
                    </figure>
                )}
            </Slider>
        </>
    );
}