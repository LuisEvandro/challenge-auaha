import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { User, Order, Product } from "../lib/interfaces";

import firebase from 'firebase/app'

interface AuthContextInterface{
    user: User | undefined,
    isAuthenticated: boolean,
    login: (paramEmail: string, paramPass: string) => void,
    createUser: (paramUser: User, page?: string) => void,
    createOrder: (orderProducts: Product[], orderPrice: number) => void,
    logout: () => void,
}

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextInterface);

export function AuthProvider({ children }:AuthProviderProps){
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false)
    const [ user, setUser ] = useState<User | undefined>()

    const router = useRouter()

    useEffect(() => {
        let userResult = sessionStorage.getItem('user')

        if(userResult){
            setIsAuthenticated(true)
            setUser(JSON.parse(userResult))
            sessionStorage.setItem('user', userResult)
        }
    }, [])

    async function getUserByEmail(email: string){
        try {
            const querySnapshot = await firebase
                                        .firestore()
                                        .collection('users')
                                        .where('email', '==', email)
                                        .get();
            
            if(!querySnapshot.empty){
                const data = querySnapshot.docs[0].data();
                const userData: User = {
                    id: querySnapshot.docs[0].id,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password
                }
                return userData
            }
            

            return null;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async function login(paramEmail: string, paramPass: string){
        if(!paramEmail || !paramPass){
            toast.error('Erro ao tentar logar, tente novamente !', {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }else{
            try {
                const userResult = await getUserByEmail(paramEmail);
                if(userResult){
                    if(userResult.password === paramPass){

                        sessionStorage.setItem('user', JSON.stringify(userResult))
                        setUser(userResult)
                        setIsAuthenticated(true)

                        toast.success('Login realizado com sucesso !', {
                            autoClose: 4000,
                            position: toast.POSITION.BOTTOM_RIGHT
                        });

                    }else{
                        toast.error('Senha incorreta !', {
                            autoClose: 4000,
                            position: toast.POSITION.BOTTOM_RIGHT
                        });    
                    }
                    
                }else{
                    toast.error('Esse usuário não existe !', {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
                
                return
            } catch (error) {
                console.log(error);
                return
            }
        }
    }    

    async function createUser(paramUser: User, page?: string){
        try {
            if(!paramUser){
                toast.error('Problema ao tentar cadastrar usuário !', {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                return false
            }else{
                var isExist = await getUserByEmail(paramUser.email);

                if(isExist){
                    toast.error(`${paramUser.email}, já está cadastrado !`, {
                        autoClose: 4000,
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                    return false
                }else{
                    firebase
                    .firestore()
                    .collection('users')
                    .add(paramUser)
                    .then(resp => {
                        paramUser.id = resp.id;
                        sessionStorage.setItem('user', JSON.stringify(paramUser))
                        setUser(paramUser)
                        setIsAuthenticated(true)
                        
                        toast.success('Usuário cadastrado com sucesso !', {
                            autoClose: 4000,
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                        return true
                    })
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }
    }

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
                    sessionStorage.setItem('cart', '[]');
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

    function logout(){
        setUser(undefined)
        setIsAuthenticated(false)
        sessionStorage.removeItem('user')

        toast.success('Logout realizado com sucesso !', {
            autoClose: 4000,
            position: toast.POSITION.BOTTOM_RIGHT
        });

        router.push('/')
    }

	return(
		<AuthContext.Provider 
            value={{
                user,
                isAuthenticated,
                login,
                createUser,
                createOrder,
                logout
            }}
        >
			{children}
		</AuthContext.Provider>
	);
}