import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { User, Order, Product } from "../lib/interfaces";

import firebase from 'firebase/app'

interface AuthContextInterface{
    user: User | undefined,
    isAuthenticated: boolean,
    login: (paramEmail: string, paramPass: string, page?: string) => void,
    createUser: (paramUser: User, page?: string) => void,
    createOrder: (paramOrder: Order) => void,
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
            sessionStorage.setItem('user', userResult)
            setUser(JSON.parse(userResult))
            setIsAuthenticated(true)
        }
    }, [])

    async function getUserByEmail(email: string){
        try {
            var result: User = {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            };

            const querySnapshot = await firebase
                                        .firestore()
                                        .collection('users')
                                        .where('email', '==', email)
                                        .get();
            
            console.log(querySnapshot);
            if(!querySnapshot.empty){
                querySnapshot.forEach(function (doc: any) {
                    result = {
                        id: doc.id,
                        ... doc.data(),
                    }
                })
            }
            

            return result;
        } catch (error) {
            console.log(error);
            return []
        }
    }

    async function login(paramEmail: string, paramPass: string, page?: string){
        if(!paramEmail || !paramPass){
            toast.error('Erro ao tentar logar, tente novamente !', {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return false
        }else{
            try {
                const userResult = await getUserByEmail(paramEmail);

                if(userResult.id != ''){

                    if(userResult.password === paramPass){

                        sessionStorage.setItem('user', JSON.stringify(userResult))
                        setUser(userResult)
                        setIsAuthenticated(true)

                        toast.success('Login realizado com sucesso !', {
                            autoClose: 4000,
                            position: toast.POSITION.BOTTOM_RIGHT
                        });

                        router.push('/')
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

                if(isExist.id){
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
                        router.push('/')
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

    function createOrder(paramOrder: Order){
        // try {
        //     if(!paramOrder){
        //         toast.error('Erro ao tentar criar pedido !', {
        //             autoClose: 4000,
        //             position: toast.POSITION.BOTTOM_RIGHT
        //         });
        //         return false
        //     }else{
        //         let sessionUsers = JSON.parse(sessionStorage.getItem('users'));
        //         let status = false;
        //         sessionUsers.map((user: User) => {
        //             if(user.guid == tokenState){
        //                 status = true
        //                 user.orders.push(paramOrder)

        //                 setUser(user);
        //             }
        //         })

        //         if(status){
        //             sessionStorage.setItem('users', JSON.stringify(sessionUsers))
                    
        //             toast.success('Pedido gerado com sucesso !', {
        //                 autoClose: 4000,
        //                 position: toast.POSITION.BOTTOM_RIGHT
        //             });

        //             router.push('/authentication/orders');
        //         }else{
        //             toast.error('Problema ao tentar gerar pedido !!', {
        //                 autoClose: 4000,
        //                 position: toast.POSITION.BOTTOM_RIGHT
        //             });
        //         }
        //     }
        // } catch (error) {
        //     console.log(error);
        //     toast.error(error, {
        //         autoClose: 4000,
        //         position: toast.POSITION.BOTTOM_RIGHT
        //     });
        //     return false
        // }
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