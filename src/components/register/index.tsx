import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import router from 'next/router';
import { User } from "../../lib/interfaces";
import styles from './styles.module.scss'

export default function RegisterComponent() {
    const { createUser, user } = useContext(AuthContext)

    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPassword, setShowPassword ] = useState(false)

    const [ firstName, setFirstName ] = useState<string>('')
    const [ lastName, setLastName ] = useState<string>('')
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    async function reqRegister(e: any){
        e.preventDefault()
        
        setIsLoading(true)
        if(password.length < 6){
            toast.warning('Senha deve conter no minimo 6 caracteres !', {
                autoClose: 4000,
                position: toast.POSITION.BOTTOM_LEFT
            });
        }else{
            const user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
            
            await createUser(user);
        }
        setIsLoading(false)
    }

    return (
        <>
            <div className={styles.register_content}>
                <div className={styles.register_title}>
                    <h2>Registrar-se</h2>
                </div>
                <form onSubmit={reqRegister} className={styles.form_content}>
                    <div className={styles.form_control}>
                        <label htmlFor="primeiro_nome"></label>
                        <div className={styles.form_text_input}>
                            <input
                                type="text"
                                name="primeiro_nome"
                                alt="Primeiro Nome"
                                placeholder="Primeiro Nome"
                                required
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className={styles.form_control}>
                        <div className={styles.form_text_input}>
                            <input
                                type="text"
                                name="ultimo_nome"
                                alt="Último Nome"
                                placeholder="Último Nome"
                                required
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

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
                            Cadastrar
                        </button>
                    </div>

                    <div className={styles.form_botton_login}>
                        <button
                            onClick={() => router.push('/authentication/login')}
                            type="button"
                            disabled={isLoading}
                        >
                            Ir para login
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}