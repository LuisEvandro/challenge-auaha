import Head from 'next/head'
import { GetStaticProps } from 'next'

import { MainCarrosel } from '../components/sliders/carroselMain'
import { CardFreghtAndParcel } from '../components/cardFreghtAndParcel'
import { PromotionsCarrosel } from '../components/sliders/carroselPromotions'

import firebase from 'firebase/app'

import styles from '../styles/home.module.scss'
import { ClientsFeedback } from '../components/clientsFeedback'
import { Newsletter } from '../components/newsletter'
import { Product } from '../lib/interfaces'

export default function Home(products: Product[]) {
  return (
    <>
      <Head>
        <title>Home | Challenge-Auaha</title>
      </Head>
      
      <div className={styles.slider_main_content}>

        <MainCarrosel />
        
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
            <PromotionsCarrosel products={products} />
          </div>
        
          <div className={styles.banners_news_and_highlights_content}>
            <div className={styles.banner_news}>
              <img src={'/images/banner_news.png'} alt="Banner de novidades" />
              <p>Novidades</p>
            </div>

            <div className={styles.banner_highlights}>
              <img src={'/images/banner_highlights.png'} alt="Banner de destaques" />
              <p>Destaques</p>
            </div>
          </div>
        
          <div className={styles.feedback_component_div}>
            <ClientsFeedback />
          </div>

          <div className={styles.newsletter_component_div}>
            <Newsletter />
          </div>
        </div>
      </div>
    
      <div className={styles.whatsapp_floating} onClick={() => window.open('https://api.whatsapp.com/send?phone=5514999999999&text=Olá, poderia me ajuda ?')}>
        <div className={styles.whatsapp_icon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
              viewBox="0 0 15.219 15.292">
              <path
                  d="M13.251,2.222A7.579,7.579,0,0,0,1.325,11.365L.25,15.292l4.017-1.054a7.569,7.569,0,0,0,3.621.922h0a7.581,7.581,0,0,0,5.36-12.938ZM7.891,13.881h0A6.29,6.29,0,0,1,4.683,13l-.23-.137-2.384.625.636-2.324-.15-.238a6.3,6.3,0,1,1,5.335,2.952Zm3.455-4.717c-.189-.095-1.12-.553-1.294-.616s-.3-.095-.426.095-.489.616-.6.742-.221.142-.41.047a5.171,5.171,0,0,1-1.523-.94A5.711,5.711,0,0,1,6.04,7.181c-.11-.19,0-.282.083-.386A5.356,5.356,0,0,0,6.6,6.147a.348.348,0,0,0-.016-.332C6.534,5.72,6.155,4.789,6,4.409s-.31-.319-.426-.325-.237-.007-.363-.007a.7.7,0,0,0-.5.237,2.124,2.124,0,0,0-.663,1.579,3.683,3.683,0,0,0,.773,1.959,8.44,8.44,0,0,0,3.234,2.859,10.837,10.837,0,0,0,1.079.4,2.6,2.6,0,0,0,1.193.075,1.951,1.951,0,0,0,1.278-.9,1.582,1.582,0,0,0,.11-.9C11.661,9.306,11.535,9.259,11.346,9.164Zm0,0"
                  transform="translate(-0.25)" fillRule="evenodd" />
          </svg>
        </div>
        <p>Precisa de ajuda?</p>
      </div>
    </>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const products: Product[] = []
  try {
    const querySnapshot = await firebase
                                .firestore()
                                .collection('products')
                                .orderBy('name', 'desc')
                                .get();
    
    querySnapshot.forEach(function (doc: any) {
      products.push({
        id: doc.id,
        ... doc.data(),
      })
    })
  } catch(error) {
    console.log('Error: ', error)
  }

  return {
      props: {
        products
      }
  }
}