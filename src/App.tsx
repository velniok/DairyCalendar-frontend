import { Route, Routes } from "react-router-dom"
import { CalendarBlock } from "./components/CalendarBlock"
import { HeaderBlock } from "./components/HeaderBlock"
import { MenuBlock } from "./components/MenuBlock"
import './styles/main.scss'
import { Register } from "./components/AuthBlock/Register"
import { Login } from "./components/AuthBlock/Login"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/hooks"
import { fetchAuthMe } from "./store/auth/authSlice"

function App() {

    const dispatch = useAppDispatch()
    const authStatus = useAppSelector((state) => state.auth.status)

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

    return (
        <>
        {
            authStatus === 'loaded'
            ?
                <>
                    <HeaderBlock />
                    <main>
                        <MenuBlock />
                        <Routes>
                            <Route path='/' element={<CalendarBlock />} />
                        </Routes>
                    </main>
                </>
            :
            authStatus === 'error'
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