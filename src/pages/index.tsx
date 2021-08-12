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
            <div className={styles.mosaic_item+' '+styles.mosaic_item_rings}>
              <img 
                alt="Anéis"
                src={'/images/categories/banner1.png'}
              />
              <div className={styles.mosaic_item_name}>
                <p>Anéis</p>
              </div>
            </div>

            <div className={styles.mosaic_item+' '+styles.mosaic_item_earrings}>
              <img 
                alt="Brincos"
                src={'/images/categories/banner2.png'}
              />
              <div className={styles.mosaic_item_name}>
                <p>Brincos</p>
              </div>
            </div>

            <div className={styles.mosaic_item+' '+styles.mosaic_item_pendants}>
              <img 
                alt="Pingentes"
                src={'/images/categories/banner3.png'}
              />
              <div className={styles.mosaic_item_name}>
                <p>Pingentes</p>
              </div>
            </div>

            <div className={styles.mosaic_item+' '+styles.mosaic_item_bracelets}>
              <img 
                alt="Pulseiras"
                src={'/images/categories/banner4.png'}
              />
              <div className={styles.mosaic_item_name}>
                <p>Pulseiras</p>
              </div>
            </div>
            
            <div className={styles.mosaic_item+' '+styles.mosaic_item_necklaces}>
              <img 
                alt="Colares"
                src={'/images/categories/banner5.png'}
              />
              <div className={styles.mosaic_item_name}>
                <p>Colares</p>
              </div>
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
