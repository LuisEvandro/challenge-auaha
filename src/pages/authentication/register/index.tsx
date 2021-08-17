import { useContext, useEffect } from 'react';
import router from 'next/router';
import Head from 'next/head'
import styles from './styles.module.scss'
import { AuthContext } from '../../../contexts/AuthContext';

import RegisterComponent from "../../../components/register";

export default function Register() {

    const { isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        const dataUser = sessionStorage.getItem('user')
        
        if(dataUser)
            router.push('/authentication/myaccount')
            
    },[isAuthenticated])

    return (
        <>
            <Head>
                <title>Cadastro | Challenge-Auaha</title>
            </Head>
            <div className="container">
                <div className={styles.register_page_container}>
                    <RegisterComponent />
                </div>
            </div>
        </>
    )
}