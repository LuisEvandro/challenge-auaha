import { useContext, useEffect, useState } from 'react';
import { ProductCartHeader } from '../productCartHeader'

import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../../lib/interfaces';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
    const [ search, setSearch ] = useState<string>('')
    const [ totalProductsCart, setTotalProductsCart ] = useState<number>(0)
    const [ totalPriceCart, setTotalPriceCart ] = useState<number>(0)
    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    const { products, valueTotal } = useContext(CartContext)
    const { user, isAuthenticated, logout, createOrder } = useContext(AuthContext)

    useEffect(() => {
        let totalPrice = 0
        let totalQuantity = 0
        products.forEach((item: Product) => {
            totalPrice = (((item.price - item.promotinalPrice) * item.quantity) + totalPrice)
            totalQuantity = (item.quantity + totalQuantity)
        })

        setTotalPriceCart(totalPrice)
        setTotalProductsCart(totalQuantity)
    }, [valueTotal])

    const searchProduct = (stringSearch: string) => {
        console.log('Procurar por :', stringSearch);
    }

    const handleEnterKey = (event: any) => {
		if(event.key === 'Enter'){
            searchProduct(search);
        }
	};

    return (
        <div className={styles.id_header}>
            <header className={styles.header_desktop}>
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
                                            src={'/images/products/product01.png'}
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
                                            src={'/images/products/product03.png'}
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
                                    <Link href={isAuthenticated ? '/authentication/myaccount':'/authentication/login'}>
                                        <a>Entrar</a>
                                    </Link>

                                    <Link href={isAuthenticated ? '/authentication/myaccount':'/authentication/register'}>
                                        <a>Cadastrar</a>
                                    </Link>
                                </div>
                                <div className={styles.pop_myaccount_others}>
                                    <Link href={'/authentication/orders'}>
                                        <a>Meus pedidos</a>
                                    </Link>

                                    <Link href={'/authentication/myaccount'}>
                                        <a>Minha conta</a>
                                    </Link>
                                    {
                                        isAuthenticated && (
                                            <a onClick={() => logout()}>Sair</a>
                                        )
                                    }
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
                                    {
                                        products.length > 0 ? (
                                            products.map((productItem: Product) => {
                                                return(
                                                    <ProductCartHeader product={productItem} key={productItem.id} />
                                                )
                                            })
                                        ) : (
                                            <div className={styles.pop_cart_products_empty}>
                                                <span className={"material-icons"}>production_quantity_limits</span>
                                                <p>Carrinho vazio</p>
                                            </div>
                                        )
                                    }
                                </div>

                                <div className={styles.pop_cart_footer}>
                                    <p className={styles.pop_cart_subtotal}>Subtotal <span>{(totalPriceCart).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p>

                                    {
                                        products.length > 0 ? (
                                            <div className={styles.pop_cart_finally_cart} onClick={() => createOrder(products, valueTotal)}>
                                                <p>Finalizar compra</p>
                                            </div>
                                        ) : ( 
                                            <div className={styles.pop_cart_finally_cart} style={{opacity: .5}}>
                                                <p>Finalizar compra</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <header className={styles.header_mobile}>
                <div className={'container ' + styles.header_mobile_content + ' ' + styles.header_content}>
                    <div className={styles.header_mobile_menu}>
                        {isOpen ? (
                            <Image
                                width={30}
                                height={30}
                                src={'/images/close-line.svg'}
                                objectFit="cover"
                                onClick={() => setIsOpen(!isOpen)}
                                className={styles.close}
                            />
                        ): (
                            <Image
                                width={30}
                                height={30}
                                src={'/images/menu_hamburger.svg'}
                                objectFit="cover"
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        )}
                    </div>
                    <div className={styles.header_mobile_logo}>
                        <Link href={'/'}>
                            <a>
                                <Image
                                    width={100}
                                    height={50}
                                    alt="Auaha front-end"
                                    src={'/images/logo_front-end.png'}
                                    objectFit="contain"
                                />
                            </a>
                        </Link>
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
                                {
                                    products.map((productItem: Product) => {
                                        return(
                                            <ProductCartHeader product={productItem} key={productItem.id} />
                                        )
                                    })
                                }
                            </div>

                            <div className={styles.pop_cart_footer}>
                                <p className={styles.pop_cart_subtotal}>Subtotal <span>{(totalPriceCart).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></p>

                                {
                                    products.length > 0 ? (
                                        <div className={styles.pop_cart_finally_cart} onClick={() => createOrder(products, valueTotal)}>
                                            <p>Finalizar compra</p>
                                        </div>
                                    ) : ( 
                                        <div className={styles.pop_cart_finally_cart} style={{opacity: .5}}>
                                            <p>Finalizar compra</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className={styles.header_nav_mobile+' '+(isOpen && styles.open)}>
                <div className={styles.header_nav_account}>
                    {
                        isAuthenticated ? (
                            <>
                                <div>
                                    <Link href={'/authentication/myaccount'}>
                                        <a>Minha conta</a>
                                    </Link>
                                </div>

                                <div>
                                    <a onClick={() => logout()}>Sair</a>
                                </div>
                            </>
                        ):(
                            <>
                                <div>
                                    <Link href={'/authentication/login'}>
                                        <a>Entrar</a>
                                    </Link>
                                </div>
                                <div>
                                    <Link href={'/authentication/register'}>
                                        <a>Cadastrar</a>
                                    </Link>
                                </div>
                            </>
                        )
                    }
                </div>

                <div className={styles.header_nav_options}>
                    <div id="aneis" onClick={() => {
                        let item = document.getElementById('aneis');
                            item?.dataset.showItem == 'true' ? (item.dataset.showItem = "false") : (item.dataset.showItem = "true");
                    }}><span>Anéis</span> <Image width={15} height={15} alt="Ver mais anéis" src={'/images/arrow.png'} objectFit="contain"/></div>
                    
                    <div id="brincos" onClick={() => {
                        let item = document.getElementById('brincos');
                            item?.dataset.showItem == 'true' ? (item.dataset.showItem = "false") : (item.dataset.showItem = "true");
                    }}><span>Brincos</span> <Image width={15} height={15} alt="Ver mais Brincos" src={'/images/arrow.png'} objectFit="contain"/></div>
                    
                    <div id="colares" onClick={() => {
                        let item = document.getElementById('colares');
                            item?.dataset.showItem == 'true' ? (item.dataset.showItem = "false") : (item.dataset.showItem = "true");
                    }}><span>Colares</span> <Image width={15} height={15} alt="Ver mais Colares" src={'/images/arrow.png'} objectFit="contain"/></div>
                    
                    <div id="pingentes" onClick={() => {
                        let item = document.getElementById('pingentes');
                            item?.dataset.showItem == 'true' ? (item.dataset.showItem = "false") : (item.dataset.showItem = "true");
                    }}><span>Pingentes</span> <Image width={15} height={15} alt="Ver mais Pingentes" src={'/images/arrow.png'} objectFit="contain"/></div>
                    
                    <div id="pulseiras" onClick={() => {
                        let item = document.getElementById('pulseiras');
                            item?.dataset.showItem == 'true' ? (item.dataset.showItem = "false") : (item.dataset.showItem = "true");
                    }}><span>Pulseiras</span> <Image width={15} height={15} alt="Ver mais Pulseiras" src={'/images/arrow.png'} objectFit="contain"/></div>
                    
                    <div id="kits" onClick={() => {
                        let item = document.getElementById('kits');
                            item?.dataset.showItem == 'true' ? (item.dataset.showItem = "false") : (item.dataset.showItem = "true");
                    }}><span>Kits</span> <Image width={15} height={15} alt="Ver mais Kits" src={'/images/arrow.png'} objectFit="contain"/></div>
                </div>
            </div>

            <nav className={styles.header_bottom}>
                <div className={styles.header_bottom_content}>
                    <p>Anéis</p>
                    <p>Brincos</p>
                    <p>Colares</p>
                    <p>Pingentes</p>
                    <p>Pulseiras</p>
                    <p>Kits</p>
                </div>

                <div className={styles.pop_over_header_bottom_position}>
                    <div className={styles.pop_over_header_bottom}>
                        <div className={styles.pop_header_bottom_item_category}>
                            <p className={styles.pop_header_bottom_item_category_title}>Folheado</p>

                            <div className={styles.pop_header_bottom_items_subCategory}>
                                <p>Anel</p>
                                <p>Solitária</p>
                                <p>Cristal</p>
                                <p>Pérola</p>
                                <p>Zircônia</p>
                            </div>
                        </div>

                        <div className={styles.pop_header_bottom_item_category}>
                            <p className={styles.pop_header_bottom_item_category_title}>Prata</p>

                            <div className={styles.pop_header_bottom_items_subCategory}>
                                <p>Anel</p>
                                <p>Solitária</p>
                                <p>Cristal</p>
                                <p>Pérola</p>
                                <p>Zircônia</p>
                            </div>
                        </div>

                        <div className={styles.pop_header_bottom_item_category}>
                            <p className={styles.pop_header_bottom_item_category_title}>Ouro</p>

                            <div className={styles.pop_header_bottom_items_subCategory}>
                                <p>Anel</p>
                                <p>Solitária</p>
                                <p>Cristal</p>
                                <p>Pérola</p>
                                <p>Zircônia</p>
                            </div>
                        </div>

                        <div className={styles.pop_header_bottom_item_image}>
                            <a href="/">
                                <Image
                                    width={420} 
                                    height={330} 
                                    alt="Anel" 
                                    src={'/images/banner_categoria.png'} 
                                    objectFit="contain"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}