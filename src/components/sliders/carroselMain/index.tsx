import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './styles.module.scss'

import Slider from "react-slick";

export function MainCarrosel({images}: any) {
    
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
                {images.length > 0 ? (
                    images.map((img: string, index: number) => {
                        return (
                            <figure key={index}>
                                <img src={img} alt={'Slide '+index} className={styles.slider_image} />
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