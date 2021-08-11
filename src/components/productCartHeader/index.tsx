import styles from './styles.module.scss'

import Image from 'next/image'

export function ProductCartHeader({product}: any) {
    return (
        <>
            <article className={styles.product_item_cart}>
                    <figure className={styles.product_item_image}>
                        <Image
                            width={90}
                            height={90}
                            alt={product.name}
                            src={product.imagePath}
                            objectFit="cover"
                        />
                    </figure>
                    <div className={styles.product_item_descriptions_box}>
                        <div className={styles.product_item_descriptions}>
                            <p className={styles.product_item_name}>{product.name}</p>
                            <p className={styles.product_item_quantity_and_price}>
                                Qtd. {product.quantity} <span>{(product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                            </p>
                        </div>
                        <div className={styles.product_item_remove}>
                            <Image
                                width={14}
                                height={14}
                                alt="Remover produto"
                                src={"/images/close-line.svg"}
                                objectFit="cover"
                            />
                        </div>
                    </div>
            </article>
        </>
    )
}