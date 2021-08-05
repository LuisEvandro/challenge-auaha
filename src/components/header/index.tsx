import { useState } from 'react';

import styles from './styles.module.scss'
import Image from "next/image"
import Link from 'next/link'

export function Header() {
    const [ search, setSearch ] = useState<string>('')
    const [ totalProductsCart, setTotalProductsCart ] = useState<number>(0)

    const searchProduct = (stringSearch: string) => {
        console.log('Procurar por :', stringSearch);
    }

    const handleEnterKey = (event: any) => {
		if(event.key === 'Enter'){
            searchProduct(search);
        }
	};

    const logout = (event: any) => {
		event.preventDefault();

        console.log("SAIR");
	};

    return (
        <>
            <header>
                <div className={'container ' + styles.header_content}>
                    <div className={styles.header_search}>
                        <div className={styles.header_input_search}>
                            <input
                                type="text"
                                id="searchMenu"
                                name="searchMenu"
                                placeholder="O que deseja encontrar?"
                                alt="O que deseja encontrar?"
                                value={search}
                                onKeyPress={(e) => handleEnterKey(e)}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Image
                                width={18}
                                height={18}
                                alt="icone procurar"
                                src={'/images/search.svg'}
                                objectFit="cover"
                                onClick={() => searchProduct(search)}
                            />
                        </div>
                        <div className={styles.pop_over_search}>
                            <div className={styles.pop_descriptions}>
                                <p>Sugestões</p>
                                <div className={styles.description_variations}>
                                    <p>Brinco</p>
                                    <p>Brinco Prata</p>
                                    <p>Brinco Ouro</p>
                                </div>
                            </div>
                            <div className={styles.pop_products}>
                                <article className={styles.pop_product}>
                                    <figure className={styles.pop_product_image}>
                                        <Image
                                            width={90}
                                            height={90}
                                            alt="icone procurar"
                                            src={'/images/products/busca1.png'}
                                            objectFit="cover"
                                        />
                                    </figure>
                                    <p className={styles.pop_product_name}>Anel Banhado Ouro Reto Com Zirconia</p>
                                </article>
                                <article className={styles.pop_product}>
                                    <figure className={styles.pop_product_image}>
                                        <Image
                                            width={90}
                                            height={90}
                                            alt="icone procurar"
                                            src={'/images/products/busca2.png'}
                                            objectFit="cover"
                                        />
                                    </figure>
                                    <p className={styles.pop_product_name}>Anel Banhado Ouro Reto Com Zirconia</p>
                                </article>
                            </div>
                        </div>
                    </div>
                    <div className={styles.header_logo}>
                        <Link href={'/'}>
                            <a>
                                <Image
                                    width={150}
                                    height={88}
                                    alt="Auaha front-end"
                                    src={'/images/logo_front-end.png'}
                                    objectFit="contain"
                                />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.header_menu_items}>
                        <div className={styles.header_menu_content}>
                            <div className={styles.header_menu_item}>
                                <Image
                                    width={20}
                                    height={20}
                                    alt="Icone usuário"
                                    src={'/images/user.svg'}
                                    objectFit="contain"
                                />
                                <p>Minha Conta</p>
                            </div>

                            <div className={styles.pop_over_myaccount}>
                                <div className={styles.pop_myaccount_auth}>
                                    <Link href={'/login'}>
                                        <a>Entrar</a>
                                    </Link>

                                    <Link href={'/register'}>
                                        <a>Cadastrar</a>
                                    </Link>
                                </div>
                                <div className={styles.pop_myaccount_others}>
                                    <Link href={'/authentication/orders'}>
                                        <a>Meus pedidos</a>
                                    </Link>

                                    <Link href={'/authentication/account'}>
                                        <a>Minha conta</a>
                                    </Link>

                                    <a onClick={(event) => logout(event)}>Sair</a>
                                </div>
                            </div>
                        </div>

                        <div className={styles.header_menu_item} onClick={() => window.open('tel:+5599999999999', '_self')}>
                            <Image
                                width={20}
                                height={20}
                                alt="Icone telefone"
                                src={'/images/telephone.svg'}
                                objectFit="contain"
                            />
                            <p>(99) 99999-9999</p>
                        </div>

                        <div className={styles.header_menu_content}>
                            <div className={styles.header_menu_item}>
                                <Image
                                    width={20}
                                    height={20}
                                    alt="Icone carrinho"
                                    src={'/images/cart.svg'}
                                    objectFit="contain"
                                />
                                <span className={styles.header_count_cart}>{totalProductsCart}</span>
                            </div>
                            <div className={styles.pop_over_cart}>
                                <div className={styles.pop_cart_products}>

                                </div>

                                <div className={styles.pop_cart_footer}>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}