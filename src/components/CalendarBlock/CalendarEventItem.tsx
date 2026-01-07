import { useState, type FC } from 'react'
import type { IEvent } from '../../types/eventTypes'
import styles from './Calendar.module.scss'
import { CalendarInfoEventModal } from './CalendarInfoEventModal'
import type { IUser } from '../../types/userTypes'

interface CalendarEventItemProps {
    event: IEvent
    userId: string | undefined
    AuthData: IUser | null
}

export const CalendarEventItem: FC<CalendarEventItemProps> = ({ event, userId, AuthData }) => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const openModalHundler = () => {
        if (AuthData?._id === userId) {
            setOpenModal(!openModal)
        }
    }

    return (
        <>
            <li className={`${styles.eventItem} ${styles[event.color]}`} onClick={openModalHundler}> 
                <span className={styles.eventTime}>{`${new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`} - {`${new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`}</span>
                <span className={styles.eventTitle}>{event.title}</span>
            </li>
            <CalendarInfoEventModal openModal={openModal} openModalHundler={openModalHundler} event={event} />
        </>
    )
}
