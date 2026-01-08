import type { FC, Ref } from "react"
import type { IUser } from "../../types/userTypes"
import styles from './Header.module.scss'
import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks/hooks"

interface HeaderSearchItemProps {
    user: IUser
    userLinkRef: Ref<HTMLAnchorElement>
}

export const HeaderSearchItem: FC<HeaderSearchItemProps> = ({ user, userLinkRef }) => {

    const AuthData = useAppSelector((state) => state.auth.data)

    return (
        <li className={styles.usersItem}>
            <Link to={`/profile/${user._id}`} className={styles.usersLink} ref={userLinkRef}>
                <div className={styles.usersAvatar}></div>
                <span className={styles.usersUsername}>{user.username}</span>
                {
                    AuthData?._id === user._id && <span className={styles.itsYou}>Это вы</span>
                }
            </Link>
        </li>
    )
}
