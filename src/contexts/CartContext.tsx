import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../lib/interfaces';

interface CartContextInterface{
    products: Product[],
    valueTotal: number,
    addItemToCart: (product: Product) => boolean,
    removeItemCart: (id: string) => void,
    sumItemCart: (id: string) => number,
    minItemCart: (id: string) => number,
    cleanCart: () => void
}

interface CartProviderProps {
	children: ReactNode;
}

export const CartContext = createContext({} as CartContextInterface);

export function CartProvider({ children }:CartProviderProps){

    const [ products, setProducts ] = useState<Product[]>([])
    const [ valueTotal, setValueTotal ] = useState<number>(0)

    useEffect(() => {
        const cartRecovered = sessionStorage.getItem('cart')

        if(cartRecovered){
            setProducts(JSON.parse(cartRecovered))
        }

	}, []);

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(products))
        countTotalCart()
    }, [products])

    function countTotalCart(){
        let count = 0
        setValueTotal(0)
        products.forEach((prod: Product) => {
            count = (count + (prod.quantity * (prod.price - prod.promotinalPrice)))
        })
        setValueTotal(count)
    }

    function addItemToCart(product: Product){
        try {
            let newCart = products;
            let productExists = newCart.find(f => f.id == product.id)
            
            if(productExists){
                sumItemCart(productExists.id)
            }else{
                product.quantity = 1;
                newCart.push(product)
                saveCartData(newCart)
            }

            toast.success(`${product.name}, adicionado ao carrinho!`, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            countTotalCart()
            return true
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }

    }

    function removeItemCart(id: string){
        try {
            saveCartData(products.filter(f => f.id != id))

            toast.success(`Produto removido do carrinho com sucesso!`, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    function sumItemCart(id: string){
        let temp = 0;
        products.map((item) => {
            if(item.id == id){
                item.quantity = item.quantity + 1
                temp = item.quantity
            }
        });
        saveCartData(products)
        countTotalCart()
        return temp;
    }

    function minItemCart(id: string){
        let temp = 0;
        products.map((item) => {
            if(item.id == id){
                item.quantity = item.quantity - 1
                temp = item.quantity
            }
                
        });
        saveCartData(products)
        countTotalCart()
        return temp
    }

    function saveCartData(data: Product[]){
        setProducts(data)
        sessionStorage.setItem('cart', JSON.stringify(data))
    }

    function cleanCart(){
        setProducts([])
        setValueTotal(0)
        sessionStorage.setItem("cart", "[]")
    }

	return(
		<CartContext.Provider 
            value={{
                products,
                valueTotal,
                addItemToCart,
                removeItemCart,
                sumItemCart,
                minItemCart,
                cleanCart
            }}
        >
			{children}
		</CartContext.Provider>
	);
}