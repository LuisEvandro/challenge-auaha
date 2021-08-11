import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './styles.module.scss'

import { Product } from '../../../lib/interfaces'

import Slider from "react-slick";

export function PromotionsCarrosel({products}: any) {
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToShow: 4,
        slidesToScroll: 4,
        dotsClass: styles.button__bar_promotions,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    function SampleNextArrow(props: any) {
        const { className, style, onClick } = props;

        return (
            <img src="/images/arrow-right.svg" alt="próximo slide" className={className+' '+styles.arrowsSlidePromotions} onClick={onClick} style={{ ...style, right: "-30px", width: "30px", height: "30px", zIndex: "100" }} />
        );
    }
      
    function SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <img src="/images/arrow-left.svg" alt="slide anterior" className={className+' '+styles.arrowsSlidePromotions} onClick={onClick} style={{ ...style, left: "-30px", width: "30px", height: "30px", zIndex: "100" }} />
        );
    }
    
    return (
        <>
            <div className={styles.title_promotions_carrosel}>
                <p>Promoções</p>
            </div>
            <Slider {...settings}>
                {products.length > 0 ? (
                    products.map((item: Product, index: number) => {
                        return (
                            <figure key={index}>
                                <img src={item.imagePath} alt={'Promoção'+item.name} className={styles.slider_image} />
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