import { useContext, useEffect } from 'react';
import router from 'next/router';
import Image from "next/image";
import Head from 'next/head'
import styles from './styles.module.scss'

import { AuthContext } from '../../../contexts/AuthContext';

export default function MyAccount() {

    const { isAuthenticated, user } = useContext(AuthContext)

    useEffect(() => {
        const dataUser = sessionStorage.getItem('user')
        
        if(!dataUser)
            router.push('/authentication/login')
            
    },[isAuthenticated])

    return (
        <>
            <Head>
                <title>Minha conta | Challenge-Auaha</title>
            </Head>
            <div className="container">
                <div className={styles.myaccount_page_container}>
                    <div className={styles.account_info_content}>
                        <div className={styles.info_item_image}>
                            <Image
                                width={90}
                                height={90}
                                src={'/images/avatar_icon.svg'}
                                objectFit={'cover'}
                            />
                        </div>

                        <div className={styles.info_items}>
                            <div className={styles.info_item}>
                                <p className={styles.info_item_title}>Nome:</p>
                                <p className={styles.info_item_text}>{user?.firstName +' '+ user?.lastName}</p>
                            </div>

                            <div className={styles.info_item}>
                                <p className={styles.info_item_title}>E-mail:</p>
                                <p className={styles.info_item_text}>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}