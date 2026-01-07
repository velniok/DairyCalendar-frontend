import type { FC } from "react"
import type { IUser } from "../../types/userTypes"

interface ProfileEditBlockProps {
    user: IUser | null
}

export const ProfileEditBlock: FC<ProfileEditBlockProps> = ({ user }) => {
    return (
        <div className="container">{user?.username}</div>
    )
}
