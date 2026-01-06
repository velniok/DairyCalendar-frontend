export interface IUser {
    _id: string,
    username: string,
    email: string,
    password: string,
}

export interface IUserRes {
    user: IUser,
    token: string
}

export interface IRegisterParams {
    email: string,
    username: string,
    password: string,
}

export interface ILoginParams {
    email: string,
    password: string,
}