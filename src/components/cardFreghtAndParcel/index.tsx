import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './styles.module.scss'

import Slider from "react-slick";
import Image from 'next/image'

export function CardFreghtAndParcel(){
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 7000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={styles.freight_and_parcel}>
            <div className={styles.freight_and_parcel_content +' '+ styles.freight_and_parcel_desktop}>
                <div className={styles.freight}>
                    <Image
                    width={20}
                    height={20}
                    alt="Frete icone"
                    src={'/images/freight-icon.svg'}
                    objectFit="contain"
                    />
                    <p><span>Frete grátis</span> nas compras acima de R$ 299,00</p>
                </div>

                <div className={styles.parcel}>
                    <Image
                    width={20}
                    height={20}
                    alt="Frete icone"
                    src={'/images/card-credit.svg'}
                    objectFit="contain"
                    />
                    <p><span>6 vezes sem juros</span> no cartão de crédito</p>
                </div>
            </div>
            
            <Slider {...settings} className={styles.freight_and_parcel_content_mobile}>
                <div>
                    <div className={styles.freight_mobile}>
                        <Image
                        width={20}
                        height={20}
                        alt="Frete icone"
                        src={'/images/freight-icon.svg'}
                        objectFit="contain"
                        />
                        <p><span>Frete grátis</span> nas compras acima de R$ 299,00</p>
                    </div>
                </div>

                <div>
                    <div className={styles.parcel_mobile}>
                        <Image
                        width={20}
                        height={20}
                        alt="Frete icone"
                        src={'/images/card-credit.svg'}
                        objectFit="contain"
                        />
                        <p><span>6 vezes sem juros</span> no cartão de crédito</p>
                    </div>
                </div>
            </Slider>
        </div>
    )
}