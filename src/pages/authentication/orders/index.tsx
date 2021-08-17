import { useContext, useEffect, useState } from 'react';
import Head from 'next/head'
import firebase from 'firebase/app'
import { AuthContext } from '../../../contexts/AuthContext';
import router from 'next/router';
import styles from './styles.module.scss'
import { Order, Product } from '../../../lib/interfaces';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'


export default function Orders() {

    const { isAuthenticated, user } = useContext(AuthContext)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ orders, setOrders ] = useState<Order[]>([])

    async function loadOrders() {
        setIsLoading(true)
        try {
            const ordersTemp: Order[] = []
            const querySnapshot = await firebase
                                        .firestore()
                                        .collection('orders')
                                        .where('idUser', '==', user?.id)
                                        .get();
            
            if(!querySnapshot.empty){
                querySnapshot.forEach(function (doc: any) {
                    ordersTemp.push({
                        id: doc.id,
                        ... doc.data(),
                    })
                })
            }

            setOrders(ordersTemp)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
        
    }

    function toggleItem(id:string | undefined) {
        if(id){
            let element = document.getElementById(id);

            if(element?.getAttribute("data-hidden") == "true"){
                element.setAttribute("data-hidden", "false");
            }else{
                element?.setAttribute("data-hidden", "true");
            }
        }
    }

    useEffect(() => {
        const dataUser = sessionStorage.getItem('user')
        
        if(!dataUser)
            router.push('/authentication/login')
        else
            loadOrders()
            
    },[isAuthenticated])

    return (
        <>
            <Head>
                <title>Meus Pedidos | Challenge-Auaha</title>
            </Head>
            <div className="container">
                <div className={styles.orders_page_container}>
                    {
                        isLoading ? (
                            <div className={styles.loading_box}>
                                <div className="loader_default_page"></div>

                                <p>Carregando ...</p>
                            </div>
                        ) : (
                            <div className={styles.box_list_orders}>
                                {
                                    orders.length > 0 ? (
                                        orders.map((item: Order, index:number) => {
                                            return (
                                                <div className={styles.order_content} key={index}>
                                                    <div className={styles.order_title_toggle} onClick={() => toggleItem(item.id)}>
                                                        <p className={styles.order_id}><span>Pedido: </span> {item.id}</p>
                                                        <p className={styles.order_price}><span>Total: </span> {(item.finalPrice).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                                                        <p className={styles.order_date}><span>Criado em: </span> {format(parseISO(item.createdAt), 'dd/MM/yyyy HH:mm:ss', {locale: ptBR})}</p>
                                                    </div>
                                                    <div className={styles.order_products} id={item.id} data-hidden="true">
                                                            <div className={styles.order_products_items}>
                                                                {
                                                                    item.products.map((product: Product, indexProd:number) => {
                                                                        return(
                                                                            <div className={styles.order_product_item} key={indexProd}>
                                                                                <div className={styles.image_product}>
                                                                                    <img src={product.imagePath} alt={product.name} />
                                                                                </div>

                                                                                <div className={styles.product_details}>
                                                                                    <p className={styles.name}>{product.name}</p>
                                                                                    <p className={styles.quantity_and_price}>Qnt: {product.quantity} - {(product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <h1>Não tem pedidos !</h1>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}