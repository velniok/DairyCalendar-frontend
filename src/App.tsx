import { Route, Routes } from "react-router-dom"
import { HeaderBlock } from "./components/HeaderBlock"
import { MenuBlock } from "./components/MenuBlock"
import './styles/main.scss'
import { Register } from "./components/AuthBlock/Register"
import { Login } from "./components/AuthBlock/Login"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/hooks"
import { fetchAuthMe } from "./store/auth/authSlice"
import { ProfilePage } from "./pages/ProfilePage"
import { ProfileEditPage } from "./pages/ProfileEditPage"
import { NotFound } from "./pages/NotFound"
import { CalendarPage } from "./pages/CalendarPage"

function App() {

    const dispatch = useAppDispatch()
    const AuthRes = useAppSelector((state) => state.auth)

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

    return (
        <>
        {
            AuthRes.status === 'loaded'
            ?
                <>
                    <HeaderBlock />
                    <main>
                        <MenuBlock />
                        <Routes>
                            <Route path='*' element={<NotFound />} />
                            <Route path='/calendar/:userId' element={<CalendarPage />} />
                            <Route path='/profile/:id' element={<ProfilePage />} />
                            <Route path='/profile/:id/edit' element={<ProfileEditPage AuthData={AuthRes.data} />} />
                        </Routes>
                    </main>
                </>
            :
            AuthRes.status === 'error' || AuthRes.status === 'logout'
            ?
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            :
            <span>Загрузка</span>
        }
        </>
    )
}

export default App