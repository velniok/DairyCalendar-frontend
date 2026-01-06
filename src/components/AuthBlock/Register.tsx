import { Link } from 'react-router-dom'
import styles from './Auth.module.scss'
import { useAppDispatch } from '../../hooks/hooks'
import { fetchAuthRegister } from '../../store/auth/authSlice'
import { useState, type ChangeEvent } from 'react'

export const Register = () => {

    const dispatch = useAppDispatch()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onSubmit = () => {
        dispatch(fetchAuthRegister({
            username: username,
            email: email,
            password: password,
        }))
    }

    const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    
    return (
        <section className="register">
            <div className={styles.wrapper}>
                <div className="container">
                    <div className={styles.inner}>
                        <h1 className={styles.title}>Создать аккаунт</h1>
                        <form className={styles.form}>
                            <ul className={styles.list}>
                                <li className={styles.item}>
                                    <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 0C11.3261 0 12.5979 0.526784 13.5355 1.46447C14.4732 2.40215 15 3.67392 15 5C15 6.32608 14.4732 7.59785 13.5355 8.53553C12.5979 9.47322 11.3261 10 10 10C8.67392 10 7.40215 9.47322 6.46447 8.53553C5.52678 7.59785 5 6.32608 5 5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0ZM10 12.5C15.525 12.5 20 14.7375 20 17.5V20H0V17.5C0 14.7375 4.475 12.5 10 12.5Z" fill="#212427" />
                                    </svg>
                                    <input className={styles.input} type='text' placeholder='Введите никнейм' value={username} onChange={onChangeUsername} />
                                </li>
                                <li className={styles.item}>
                                    <svg className={styles.icon} width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.5 0H2.5C1.125 0 0.0125 1.125 0.0125 2.5L0 17.5C0 18.875 1.125 20 2.5 20H22.5C23.875 20 25 18.875 25 17.5V2.5C25 1.125 23.875 0 22.5 0ZM22.5 5L12.5 11.25L2.5 5V2.5L12.5 8.75L22.5 2.5V5Z" fill="black" />
                                    </svg>
                                    <input className={styles.input} type='email' placeholder='Введите e-mail' value={email} onChange={onChangeEmail} />
                                </li>
                                <li className={styles.item}>
                                    <svg className={styles.icon} width="20" height="27" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 20C10.663 20 11.2989 19.7366 11.7678 19.2678C12.2366 18.7989 12.5 18.163 12.5 17.5C12.5 16.837 12.2366 16.2011 11.7678 15.7322C11.2989 15.2634 10.663 15 10 15C9.33696 15 8.70107 15.2634 8.23223 15.7322C7.76339 16.2011 7.5 16.837 7.5 17.5C7.5 18.163 7.76339 18.7989 8.23223 19.2678C8.70107 19.7366 9.33696 20 10 20ZM17.5 8.75C18.163 8.75 18.7989 9.01339 19.2678 9.48223C19.7366 9.95107 20 10.587 20 11.25V23.75C20 24.413 19.7366 25.0489 19.2678 25.5178C18.7989 25.9866 18.163 26.25 17.5 26.25H2.5C1.83696 26.25 1.20107 25.9866 0.732233 25.5178C0.263392 25.0489 0 24.413 0 23.75V11.25C0 10.587 0.263392 9.95107 0.732233 9.48223C1.20107 9.01339 1.83696 8.75 2.5 8.75H3.75V6.25C3.75 4.5924 4.40848 3.00269 5.58058 1.83058C6.75269 0.65848 8.3424 0 10 0C10.8208 0 11.6335 0.161661 12.3918 0.475753C13.1501 0.789845 13.8391 1.25022 14.4194 1.83058C14.9998 2.41095 15.4602 3.09994 15.7742 3.85823C16.0883 4.61651 16.25 5.42924 16.25 6.25V8.75H17.5ZM10 2.5C9.00544 2.5 8.05161 2.89509 7.34835 3.59835C6.64509 4.30161 6.25 5.25544 6.25 6.25V8.75H13.75V6.25C13.75 5.25544 13.3549 4.30161 12.6517 3.59835C11.9484 2.89509 10.9946 2.5 10 2.5Z" fill="#212427" />
                                    </svg>
                                    <input className={styles.input} type='password' placeholder='Введите пароль' value={password} onChange={onChangePassword} />
                                </li>
                                <li className={styles.item}>
                                    <svg className={styles.icon} width="20" height="27" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 20C9.33696 20 8.70107 19.7366 8.23223 19.2678C7.76339 18.7989 7.5 18.163 7.5 17.5C7.5 16.1125 8.6125 15 10 15C10.663 15 11.2989 15.2634 11.7678 15.7322C12.2366 16.2011 12.5 16.837 12.5 17.5C12.5 18.163 12.2366 18.7989 11.7678 19.2678C11.2989 19.7366 10.663 20 10 20ZM17.5 23.75V11.25H2.5V23.75H17.5ZM17.5 8.75C18.163 8.75 18.7989 9.01339 19.2678 9.48223C19.7366 9.95107 20 10.587 20 11.25V23.75C20 24.413 19.7366 25.0489 19.2678 25.5178C18.7989 25.9866 18.163 26.25 17.5 26.25H2.5C1.83696 26.25 1.20107 25.9866 0.732233 25.5178C0.263392 25.0489 0 24.413 0 23.75V11.25C0 9.8625 1.1125 8.75 2.5 8.75H3.75V6.25C3.75 4.5924 4.40848 3.00269 5.58058 1.83058C6.75269 0.65848 8.3424 0 10 0C10.8208 0 11.6335 0.161661 12.3918 0.475753C13.1501 0.789845 13.8391 1.25022 14.4194 1.83058C14.9998 2.41095 15.4602 3.09994 15.7742 3.85823C16.0883 4.61651 16.25 5.42924 16.25 6.25V8.75H17.5ZM10 2.5C9.00544 2.5 8.05161 2.89509 7.34835 3.59835C6.64509 4.30161 6.25 5.25544 6.25 6.25V8.75H13.75V6.25C13.75 5.25544 13.3549 4.30161 12.6517 3.59835C11.9484 2.89509 10.9946 2.5 10 2.5Z" fill="black" />
                                    </svg>
                                    <input className={styles.input} type='password' placeholder='Подтвердите пароль' />
                                </li>
                            </ul>
                            <button className={styles.submit} onClick={onSubmit}>Создать</button>
                        </form>
                        <p className={styles.text}>Уже есть аккаунт? <Link to={'/'}>Войти</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}
