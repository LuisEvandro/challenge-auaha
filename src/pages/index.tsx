import Head from 'next/head'

import { MainCarrosel } from '../components/sliders/carroselMain'
import { CardFreghtAndParcel } from '../components/cardFreghtAndParcel'
import { PromotionsCarrosel } from '../components/sliders/carroselPromotions'

import productsTemp from '../../utils/productsTemp.json'

import styles from '../styles/home.module.scss'

export default function Home() {
  const imagesCarroselMain = [
    "/images/banner_main.png",
    "/images/banner_main.png",
    "/images/banner_main.png",
    "/images/banner_main.png"
  ];

  const productsList = productsTemp;

  return (
    <>
      <Head>
        <title>Home | Challenge-Auaha</title>
      </Head>
      
      <div className={styles.slider_main_content}>
        <MainCarrosel images={imagesCarroselMain} />
        
        <CardFreghtAndParcel />

        <div className={'container'}>
          <div className={styles.mosaic_categories_content}>
            <div className={styles.mosaic_item}>
              <img 
                alt="Anéis"
                src={'/images/categories/banner1.png'}
              />
              <p>Anéis</p>
            </div>

            <div className={styles.mosaic_item}>
              <img 
                alt="Brincos"
                src={'/images/categories/banner2.png'}
              />
              <p>Brincos</p>
            </div>

            <div className={styles.mosaic_item}>
              <img 
                alt="Colares"
                src={'/images/categories/banner5.png'}
              />
              <p>Colares</p>
            </div>

            <div className={styles.mosaic_item}>
              <img 
                alt="Pingentes"
                src={'/images/categories/banner3.png'}
              />
              <p>Pingentes</p>
            </div>

            <div className={styles.mosaic_item}>
              <img 
                alt="Pulseiras"
                src={'/images/categories/banner4.png'}
              />
              <p>Pulseiras</p>
            </div>
          </div>
        
          <div className={styles.promotions_content}>
            <PromotionsCarrosel products={productsList} />
          </div>
        </div>
      </div>
    </>
  )
}
