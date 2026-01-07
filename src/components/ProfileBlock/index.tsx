import type { FC } from "react"
import type { IUser } from "../../types/userTypes"
import styles from './Profile.module.scss'

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
                        <h2 className={styles.username}>{user?.username}</h2>
                        <span className={styles.role}>admin</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
