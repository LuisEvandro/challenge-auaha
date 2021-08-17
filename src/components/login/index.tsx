import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

import router from 'next/router';
import styles from './styles.module.scss'

export default function LoginComponent() {
    const { login, user } = useContext(AuthContext)

    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)

    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    async function reqLogin(e: any){
        e.preventDefault()
        
        setIsLoading(true)
        
        await login(email,password)

        setIsLoading(false)
    }

    return (
        <>
            <div className={styles.login_content}>
                <div className={styles.login_title}>
                    <h2>Login</h2>
                </div>
                <form onSubmit={reqLogin} className={styles.form_content}>

                    <div className={styles.form_control}>
                        <div className={styles.form_text_input}>
                            <input
                                className={styles.input_form}
                                type="email"
                                name="email"
                                alt="E-mail"
                                placeholder="E-mail"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className={styles.form_control}>
                        <div className={styles.form_text_input}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="senha"
                                alt="Senha"
                                placeholder="Senha"
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                disabled={isLoading}
                            />
                            <span className="material-icons" onClick={() => setShowPassword(!showPassword)}>{showPassword ? ("visibility"):("visibility_off")}</span>
                        </div>
                    </div>

                    <div className={styles.form_botton_send}>
                        <button
                            type="submit"
                            disabled={isLoading}
                        >
                            Entrar
                        </button>
                    </div>

                    <div className={styles.form_botton_login}>
                        <button
                            onClick={() => router.push('/authentication/register')}
                            type="button"
                            disabled={isLoading}
                        >
                            Ir para o registro
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}