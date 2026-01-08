import { useEffect, useRef, useState, type ChangeEvent, type FC, type FocusEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import styles from './Header.module.scss'
import { fetchSearchUsers } from '../../store/searchUsers/searchUsersSlice'
import { HeaderSearchItem } from './HeaderSearchItem'
import { useLocation } from 'react-router-dom'

export const HeaderSearch: FC = () => {

    const dispatch = useAppDispatch()

    const SearchUsersRes = useAppSelector((state) => state.searchUsers)

    const pathname = useLocation().pathname

    const [searchValue, setSearchValue] = useState<string>('')
    const [openUsers, setOpenUsers] = useState<boolean>(false)

    const userLinkRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        if (searchValue !== '') {
            dispatch(fetchSearchUsers( {value: searchValue} ))
        }
    }, [searchValue])

    useEffect(() => {
        setOpenUsers(false)
        setSearchValue('')
    }, [pathname])

    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const onFocusOpenUsers = () => {
        setOpenUsers(true)
    }

    const onBlurOpenUsers = (event: FocusEvent<HTMLInputElement>) => {
        if (userLinkRef.current?.className !== event.relatedTarget?.className) {
            setOpenUsers(false)
        }
    }

    return (
        <div className={styles.search}>
            <input 
                type="text"
                className={`${styles.input} ${openUsers ? styles.open : ''}`}
                placeholder='Найти пользователя...'
                value={searchValue}
                onChange={onChangeSearchValue}
                onFocus={onFocusOpenUsers}
                onBlur={onBlurOpenUsers}
            />
            <div className={styles.icon}>
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.31169 0.0176112C5.23016 0.095488 4.18294 0.430874 3.2574 0.995788C2.33185 1.5607 1.55482 2.33876 0.991128 3.26505C0.427438 4.19135 0.0934367 5.23901 0.0169896 6.32064C-0.0594575 7.40227 0.123867 8.48649 0.551667 9.48286C0.979467 10.4792 1.63934 11.3588 2.47623 12.0483C3.31312 12.7378 4.30275 13.2172 5.36257 13.4464C6.42239 13.6756 7.52167 13.648 8.56867 13.366C9.61568 13.084 10.5801 12.5557 11.3814 11.8252L14.505 14.5296C14.666 14.6642 14.8733 14.7301 15.0824 14.7132C15.2915 14.6964 15.4856 14.5981 15.6229 14.4395C15.7602 14.2809 15.8297 14.0747 15.8165 13.8654C15.8033 13.656 15.7083 13.4603 15.5522 13.3202L12.4285 10.6157C13.1449 9.5589 13.5494 8.32173 13.5955 7.04579C13.6416 5.76985 13.3276 4.5067 12.6894 3.40089C12.0512 2.29509 11.1145 1.3913 9.98662 0.792971C8.85873 0.19464 7.58517 -0.0740641 6.31169 0.0176112ZM1.61289 7.17312C1.51396 5.79754 1.96552 4.43901 2.86824 3.39638C3.77096 2.35375 5.05089 1.71242 6.42647 1.61349C7.80204 1.51456 9.16057 1.96612 10.2032 2.86884C11.2458 3.77156 11.8872 5.05149 11.9861 6.42707C12.085 7.80264 11.6335 9.16117 10.7307 10.2038C9.82802 11.2464 8.54809 11.8878 7.17252 11.9867C5.79694 12.0856 4.43841 11.6341 3.39578 10.7313C2.35314 9.82862 1.71182 8.54869 1.61289 7.17312Z" fill="white" />
                </svg>
            </div>
            <ul className={`${styles.usersList} ${openUsers ? styles.open : ''}`}>
                {
                    searchValue === '' ?
                    <span>Начните вводить, чтобы найти пользователя...</span>
                    :
                    <>
                    {
                        SearchUsersRes.status === 'loaded' ?
                        <>
                        {
                            SearchUsersRes.data?.length === 0 ?
                            <span>Ничего не найдено</span>
                            :
                            <>
                            {
                                SearchUsersRes.data?.map((user) => {
                                    return <HeaderSearchItem key={user._id} user={user} userLinkRef={userLinkRef} />
                                })
                            }
                            </>
                        }
                        </>
                        :
                        <span>Загрузка...</span>
                    }
                    </>
                }
            </ul>
        </div>
    )
}
