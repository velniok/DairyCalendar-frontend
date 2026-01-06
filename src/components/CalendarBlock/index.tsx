import { useEffect, useState } from "react"
import styles from './Calendar.module.scss'
import { CalendarDay } from "./CalendarDay"
import type { IEvent } from "../../types/eventTypes"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchGetEvent } from "../../store/event/eventSlice"

export const CalendarBlock = () => {

    const dispatch = useAppDispatch()
    const EventRes = useAppSelector((state) => state.event)
    const UserData = useAppSelector((state) => state.auth.data)

    const [monthTitle, setMonthTitle] = useState<string>('Загрузка...')
    const [yearNum, setYearNum] = useState<number>(0)
    const [monthDays, setMonthDays] = useState<Date[]>([])
    const [monthNum, setMonthNum] = useState(0)
    const daysString = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

    useEffect(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        getMonth(today)

        if (UserData) {
            dispatch(fetchGetEvent({ userId: UserData._id }))
        }
    }, [])

    const getMonth = (today: Date) => {
        setMonthDays([])

        const todayMonth = today.getMonth()
        const todayYear = today.getFullYear()

        setYearNum(todayYear)
        setMonthNum(todayMonth)
        
        const monthString = today.toLocaleString('ru-RU', { month: 'long' })
        setMonthTitle(monthString.charAt(0).toUpperCase() + monthString.slice(1))

        const firstDay = new Date(todayYear, todayMonth, 1)
        const daysOfMonth = new Date(todayYear, todayMonth + 1, 0).getDate()
        const lastDay = new Date(todayYear, todayMonth, daysOfMonth)

        for (let i = 0; i < daysOfMonth; i++) {
            const day = new Date(firstDay)
            day.setDate(firstDay.getDate() + i);
            setMonthDays((prev) => [...prev, day])
        }

        let beforeDays = firstDay.getDay()

        if (beforeDays === 0) {
            beforeDays = 7
        }

        if (beforeDays !== 1) {
            for (let i = 1; i < beforeDays; i++) {
                const day = new Date(firstDay)
                day.setDate(firstDay.getDate() - i);
                setMonthDays((prev) => [day, ...prev])
            }
        }

        let afterDays = 7 - lastDay.getDay()

        if (afterDays === 0) {
            afterDays = 1
        }

        if (afterDays !== 7) {
            for (let i = 1; i < afterDays + 1; i++) {
                const day = new Date(lastDay)
                day.setDate(lastDay.getDate() + i);
                setMonthDays((prev) => [...prev, day])
            }
        }
    }

    const nextWeekHundler = () => {
        getMonth(new Date(yearNum, monthNum + 1, 1))
    }

    return (
        <section className="calendar">
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.top}>
                        <h2 className={styles.year}>{yearNum}г.</h2>
                        <h2 className={styles.month}>{monthTitle}</h2>
                        <span className="spa" onClick={nextWeekHundler}>Далее</span>
                    </div>
                    <div className={styles.daysName}>
                        {
                            daysString.map(day => {
                                return <span className={styles.dayName} key={day}>{day}</span>
                            })
                        }
                    </div>
                    <ul className={styles.list}>
                        
                        {
                            EventRes.status === 'loaded' ?
                            monthDays.map((day, index) => {
                                let isHidden = false
                                if (day.getMonth() !== monthNum) {
                                    isHidden = true
                                }
                                
                                let eventsOnDay: IEvent[] = []
                                EventRes.data?.map(event => {
                                    const eventStart = new Date(event.start)
                                    if (eventStart.getDate() === day.getDate() && eventStart.getMonth() === day.getMonth() && eventStart.getFullYear() === day.getFullYear()) {
                                        eventsOnDay.push(event)
                                    }
                                })
                                return <CalendarDay day={day} key={index} isHidden={isHidden} eventsOnDay={eventsOnDay} />
                            }) : <span>Загрузка...</span>
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}
