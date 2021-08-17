import { useContext, useEffect } from 'react';
import router from 'next/router';
import Head from 'next/head'
import styles from './styles.module.scss'

import { AuthContext } from '../../../contexts/AuthContext';

import LoginComponent from "../../../components/login";

export default function Login() {

    const { isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        const dataUser = sessionStorage.getItem('user')
        
        if(dataUser)
            router.push('/authentication/myaccount')
            
    },[isAuthenticated])

    return (
        <>
            <Head>
                <title>Login | Challenge-Auaha</title>
            </Head>

            <div className="container">
                <div className={styles.login_page_container}>
                    <LoginComponent />
                </div>
            </div>
        </>
    )
}