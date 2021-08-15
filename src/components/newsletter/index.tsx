import { useState } from 'react'
import { toast } from 'react-toastify';

import styles from './styles.module.scss'

import { validateEmail } from "../../../utils/functions";

export function Newsletter(){

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ name, setName ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')

    function sendNewsletter(){
        setIsLoading(true)

        if(email.trim() && name.trim() && validateEmail(email.trim())){
            setTimeout(() => {
                toast.success('E-mail cadastrado com sucesso', {
                    autoClose: 4000,
                    position: toast.POSITION.BOTTOM_LEFT
                });
                setIsLoading(false)
                setName('')
                setEmail('')
            }, 3000)
        }else{
            toast.error('Preencha o nome e e-mail corretamente !', {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_LEFT
            });
            setIsLoading(false)
        }
    }

    return(
        <div className={styles.newsletter_content}>
            <div className={styles.newsletter_content_header}>
                <p className={styles.title}>Receba ofertas e novidades</p>
                <p className={styles.sub_title}>Cadastre-se e receba nossas novidades e promoções</p>
            </div>

            <div className={styles.newsletter_content_form}>
                <div className={styles.newsletter_input_name}>
                    <input type="text" name="name" alt="Nome newsletter" placeholder="Seu nome" disabled={isLoading} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className={styles.newsletter_input_email}>
                    <input type="text" name="e-mail" alt="E-mail newsletter" placeholder="Seu e-mail" disabled={isLoading} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className={styles.newsletter_button_send}>
                    <div className={styles.button_send} onClick={() => sendNewsletter()}>
                        {
                            isLoading ? (
                                <div className={'loader_default'}></div>
                            ) : (
                                <p>Enviar</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}