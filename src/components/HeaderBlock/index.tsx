import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { HeaderSearch } from './HeaderSearch'
import { HeaderRight } from './HeaderRight'

export const HeaderBlock = () => {

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Link to={'/'}>
                        <h1 className={styles.logo}><span className={styles.logoPrimary}>Dairy</span>Calendar</h1>
                    </Link>
                    <HeaderSearch />
                    <HeaderRight />
                </div>
            </div>
        </header>
    )
}
