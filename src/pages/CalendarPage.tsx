import { useParams } from "react-router-dom"
import { CalendarBlock } from "../components/CalendarBlock"

export const CalendarPage = () => {

    const userId = useParams().userId

    return (
        <CalendarBlock userId={userId} />
    )
}
