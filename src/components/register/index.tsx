import { useState } from 'react';
import styles from './styles.module.scss'

import router from 'next/router';

export default function RegisterComponent() {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)

    const [ firstName, setFirstName ] = useState<string>('')
    const [ lastName, setLastName ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')


    function reqRegister(e: any){
        e.preventDefault()
    }

    return (
        <>
            <div className={styles.register_content}>

                <h2>Registrar-se</h2>
                <form onSubmit={reqRegister}>
                    
                </form>
            </div>
        </>
    )
}