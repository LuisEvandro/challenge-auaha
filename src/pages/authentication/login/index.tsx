import { useContext, useEffect } from 'react';
import router from 'next/router';

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
        <div className="container">
            <div className={styles.login_page_container}>
                <LoginComponent />
            </div>
        </div>
    )
}