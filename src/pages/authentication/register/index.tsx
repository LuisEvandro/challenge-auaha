import styles from './styles.module.scss'
import RegisterComponent from "../../../components/register";

export default function Register() {
    return (
        <div className="container">
            <div className={styles.register_page_container}>
                <RegisterComponent />
            </div>
        </div>
    )
}