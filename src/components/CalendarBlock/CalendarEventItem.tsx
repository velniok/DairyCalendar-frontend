import { useState, type FC } from 'react'
import type { IEvent } from '../../types/eventTypes'
import styles from './Calendar.module.scss'
import { CalendarInfoEventModal } from './CalendarInfoEventModal'

interface CalendarEventItemProps {
    event: IEvent
}

export const CalendarEventItem: FC<CalendarEventItemProps> = ({ event }) => {

    const [openModal, setOpenModal] = useState<boolean>(false)

    const openModalHundler = () => {
        setOpenModal(!openModal)
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
