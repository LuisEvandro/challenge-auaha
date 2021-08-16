import { useContext, useEffect } from 'react';
import router from 'next/router';

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
        <div className="container">
            <div className={styles.register_page_container}>
                <RegisterComponent />
            </div>
        </div>
    )
}