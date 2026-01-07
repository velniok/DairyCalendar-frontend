import { useState, type FC } from "react"
import styles from './Calendar.module.scss'
import type { IEvent } from "../../types/eventTypes"
import { CalendarEventItem } from "./CalendarEventItem"
import { CalendarAddEventModal } from "./CalendarAddEventModal"
import { useAppSelector } from "../../hooks/hooks"

interface CalendarDayProps {
    day: Date
    isHidden: boolean
    eventsOnDay: IEvent[]
    userId: string | undefined
}

export const CalendarDay: FC<CalendarDayProps> = ({ day, isHidden, eventsOnDay, userId }) => {

    const AuthData = useAppSelector((state) => state.auth.data)

    const [isShowAdd, setIsShowAdd] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const onMouseEnterHundler = () => {
        if (!isHidden && AuthData?._id === userId) {
            setIsShowAdd(true)
        }
    }

    const onMouseLeaveHundler = () => {
        setIsShowAdd(false)
    }

    const openModalHundler = () => {
        if (AuthData?._id === userId) {
            setOpenModal(!openModal)
        }
    }

    return (
        <li className={`${styles.item} ${isHidden ? styles.isHidden : ''}`} onMouseEnter={onMouseEnterHundler} onMouseLeave={onMouseLeaveHundler}>
            <div className={styles.itemTop}>
                <span className={styles.day}>{day.getDate()}</span>
                <svg className={`${styles.add} ${isShowAdd ? styles.isShow : ''}`} onClick={openModalHundler} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5.6167" width="2.53657" height="13.7699" rx="1.26828" fill="#646464" />
                    <rect y="8.15326" width="2.53657" height="13.7699" rx="1.26828" transform="rotate(-90 0 8.15326)" fill="#646464" />
                </svg>
            </div>
            <ul className={styles.eventList}>
            {
                eventsOnDay.map(event => {
                    return <CalendarEventItem key={event._id} event={event} userId={userId} AuthData={AuthData} />
                })
            }
            </ul>
            <CalendarAddEventModal openModal={openModal} openModalHundler={openModalHundler} day={day} />
        </li>
    )
}
