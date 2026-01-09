import { useState, type ChangeEvent, type FC } from "react"
import type { IUser } from "../../types/userTypes"
import styles from './ProfileEdit.module.scss'
import { useAppDispatch } from "../../hooks/hooks"
import { fetchEditUser } from "../../store/user/userSlice"

interface ProfileEditBlockProps {
    user: IUser | null
}

export const ProfileEditBlock: FC<ProfileEditBlockProps> = ({ user }) => {

    const dispatch = useAppDispatch()

    const [newUsername, setNewUsername] = useState<string>(`${user?.username}`)

    const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUsername(event.target.value)
    }

    const onSubmit = () => {
        if (user) {
            dispatch(fetchEditUser({
                userId: user._id,
                req: {
                    username: newUsername
                }
            }))
        }
    }

    return (
        <section className={styles.profileEdit}>
            <div className="container">
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Редактировать профиль</h2>
                    <div className={styles.profile}>
                        <div className={styles.avatar}></div>
                        <div className={styles.bio}>
                            <h3 className={styles.username}>{user?.username}</h3>
                            <h4 className={styles.email}>{user?.email}</h4>
                        </div>
                    </div>
                    <form className={styles.form}>
                        <ul className={styles.formList}>
                            <li className={styles.formItem}>
                                <label className={styles.label}>Изменить никнейм</label>
                                <input type="text" className={styles.input} value={newUsername} onChange={onChangeUsername} />
                            </li>
                        </ul>
                        <button className={styles.submit} onClick={onSubmit}>Принять изменения</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
