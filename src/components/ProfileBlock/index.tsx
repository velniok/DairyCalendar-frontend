import type { FC } from "react"
import type { IUser } from "../../types/userTypes"
import styles from './Profile.module.scss'
import { Link } from "react-router-dom"

interface ProfileBlockProps {
    user: IUser | null
}

export const ProfileBlock: FC<ProfileBlockProps> = ({ user }) => {
    return (
        <section className={styles.profile}>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.avatar}></div>
                    <div className={styles.bio}>
                        <h2 className={styles.username}>{user?.username}
                                {
                                    user?.role === 'admin' ?
                                    <span className={`${styles.role} ${styles.red}`}>Админ</span>
                                    :
                                    <span className={`${styles.role}`}>Пользователь</span>
                                }
                        </h2>
                        <Link to={`/calendar/${user?._id}`} className={styles.link}>Календарь пользователя</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
