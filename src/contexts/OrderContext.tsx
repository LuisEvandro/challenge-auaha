import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext} from 'react';
import { toast } from 'react-toastify';
import { User, Order, Product } from "../lib/interfaces";

import firebase from 'firebase/app'
import { AuthContext } from './AuthContext';
import { CartContext } from './CartContext';

interface OderContextInterface{
    createOrder: (orderProducts: Product[], orderPrice: number) => void
}

interface OrderProviderProps {
	children: ReactNode;
}

export const OrderContext = createContext({} as OderContextInterface);

export function OrderProvider({ children }:OrderProviderProps){
    const { isAuthenticated, user } = useContext(AuthContext)
    const { cleanCart } = useContext(CartContext)
    
    const router = useRouter()

    async function createOrder(orderProducts: Product[], orderPrice: number){
        try {
            if(!orderProducts || orderProducts.length <= 0 || orderPrice <= 0){
                toast.error('Problema ao tentar gerar pedido !!', {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }else if(isAuthenticated){
                const dateNow = new Date();

                const order: Order = {
                    idUser: user?.id,
                    products: orderProducts,
                    finalPrice: orderPrice,
                    createdAt: dateNow.toISOString()
                }
                
                firebase
                .firestore()
                .collection('orders')
                .add(order)
                .then((resp) => {
                    toast.success('Pedido gerado com sucesso !', {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });

                    cleanCart()
                    router.push('/authentication/orders');
                    return null
                })
            }else{
                router.push('/authentication/login')
                toast.warning('Para gerar um pedido requer login !', {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }

	return(
		<OrderContext.Provider 
            value={{
                createOrder
            }}
        >
			{children}
		</OrderContext.Provider>
	);
}