import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './styles.module.scss'
import Image from "next/image";

import { calculateInstallments } from '../../../../utils/functions'
import { Product } from '../../../lib/interfaces'

import Slider from "react-slick";
import { useLayoutEffect, useState } from "react";

export function PromotionsCarrosel({products}: any) {
    
    const [widthSize, setWidthSize] = useState<number>(0);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 7000,
        slidesToShow: 4,
        slidesToScroll: 4,
        dotsClass: styles.button__bar_promotions,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        className: styles.text_center,
        responsive: [
            {
                breakpoint: 320,
                settings: { 
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: { 
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false
                }
            },
            {
                breakpoint: 1080,
                settings: { 
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    arrows: false
                }
            },
            {
                breakpoint: 1400,
                settings: { 
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    arrows: false
                }
            }
          ]
    };
    
    useLayoutEffect(() => {
        function updateSize() {
            setWidthSize(window.innerWidth);
        }
        
        window.addEventListener('resize', updateSize);
        
        updateSize();
        
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    function spyProduct(product: Product){
        console.log(product);
    }

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
                            <div className={styles.promotions_carrosel_item} key={index} onClick={() => spyProduct(item)}>
                                <figure className={styles.promotions_carrosel_item_image} key={index}>
                                    <div className={styles.off_icon_content+' '+ (!item.percentageOff && styles.hidden)}>
                                        <div className={styles.off_icon}>
                                            <p>{item.percentageOff} Off</p>
                                        </div>
                                    </div>
                                    <div className={styles.spy_button_content}>
                                        <div className={styles.spy_button}>
                                            <p>Espiar</p>
                                        </div>
                                    </div>
                                    <img src={item.imagePath} alt={'Promoção '+item.name} className={styles.slider_image} />
                                    <div className={styles.status_buttons_content}>
                                        <div className={styles.buttons_card}>
                                            <div className={styles.best_seller_button+' '+ (!item.isBestSeller && styles.hidden)}>
                                                <p>Mais vendidos</p>
                                            </div>
                                            <div className={styles.free_shipping_button+' '+ (!item.isFreghtFree && styles.hidden)}>
                                                <p>Frete grátis</p>
                                            </div>
                                        </div>
                                    </div>
                                </figure>
                                <div className={styles.promotions_carrosel_item_descriptions}>
                                    <p className={styles.promotions_carrosel_item_name} style={{marginBottom: (item.promotinalPrice ? "20px" : "35px")}}>{item.name}</p>

                                    <div className={styles.promotions_carrosel_item_price_detail}>
                                        <p className={styles.promotions_carrosel_item_price_1+' '+(!item.promotinalPrice && styles.hidden)}>
                                            De <span>{(item.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                        </p>
                                        <p className={styles.promotions_carrosel_item_price_2}> 
                                            Por <span>{item.promotinalPrice ? ((item.price - item.promotinalPrice)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : (item.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                                        </p>
                                        <p className={styles.promotions_carrosel_item_parcels}>
                                            6x {(calculateInstallments(item.price, 6, item.promotinalPrice)).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} sem juros
                                        </p>
                                    </div>

                                    <div className={styles.add_to_cart_content}>
                                        <div className={styles.add_to_cart_button}>
                                            <Image 
                                                width={18}
                                                height={20}
                                                src={'/images/cart_icon.png'}
                                                alt={"Icone carrinho"}
                                                className={styles.cart_button_icon}
                                            />
                                            <p>Adicionar à sacola</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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