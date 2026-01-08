import { useParams } from "react-router-dom"
import { ProfileBlock } from "../components/ProfileBlock"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { fetchGetUser } from "../store/user/userSlice"

export const ProfilePage = () => {
    
    const dispatch = useAppDispatch()

    const UserRes = useAppSelector((state) => state.user)

    const id = useParams().id

    useEffect(() => {
        if (id) {
            dispatch(fetchGetUser({ id }))
        }
    }, [id])

    return (
        <>
        {
            UserRes.status === 'loaded' ?
            <ProfileBlock user={UserRes.data} />
            :
            <div className="container">
                Загрузка...
            </div>
        }
        </>
    )
}
