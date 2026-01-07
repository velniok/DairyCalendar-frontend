import { useParams } from "react-router-dom"
import type { IUser } from "../types/userTypes"
import { useEffect, useState, type FC } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { fetchGetUser } from "../store/user/userSlice"
import { ProfileEditBlock } from "../components/ProfileEditBlock"

interface ProfileEditPageProps {
    AuthData: IUser | null
}

export const ProfileEditPage: FC<ProfileEditPageProps> = ({ AuthData }) => {

    const dispatch = useAppDispatch()

    const UserRes = useAppSelector((state) => state.user)

    const id = useParams().id

    const [noAccess, setNoAccess] = useState<boolean>(true)

    useEffect(() => {
        if (AuthData?._id === id && id) {
            dispatch(fetchGetUser({ id }))
        } else {
            setNoAccess(false)
        }
    }, [])

    return (
        <>
        {
            noAccess ?
            <>
            {
                UserRes.status === 'loaded' ?
                <ProfileEditBlock user={UserRes.data} />
                :
                <div className="container">Загрузка...</div>
            }
            </>
            :
            <div className="container">Нет доступа</div>
        }
        </>
    )
}
