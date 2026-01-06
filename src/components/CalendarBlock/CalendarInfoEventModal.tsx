import { useState, type ChangeEvent, type FC } from "react"
import type { IEvent } from "../../types/eventTypes"
import styles from './Calendar.module.scss'
import { useAppDispatch } from "../../hooks/hooks"
import { fetchEditEvent, fetchRemoveEvent } from "../../store/event/eventSlice"

interface CalendarInfoEventModalProps {
    openModal: boolean
    openModalHundler: () => void
    event: IEvent
}

export const CalendarInfoEventModal: FC<CalendarInfoEventModalProps> = ({ openModal, openModalHundler, event }) => {
     
    const dispatch = useAppDispatch()

    const monthStr: string[] = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

    const [newTitle, setNewTitle] = useState<string>(event.title)
    const [newStart, setNewStart] = useState<string>(new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
    const [newEnd, setNewEnd] = useState<string>(new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
    const [newColor, setNewColor] = useState<string>(event.color)

    const onChangeTitleHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value)
    }

    const onChangeStartHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewStart(event.target.value)
    }

    const onChangeEndHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewEnd(event.target.value)
    }

    const onChangeColorHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewColor(event.target.value)
    }

    const onSubmit = () => {
        const startTime = new Date(event.start)
        startTime.setHours(Number(newStart.slice(0, 2)), Number(newStart.slice(3, 5)))

        const endTime = new Date(event.start)
        endTime.setHours(Number(newEnd.slice(0, 2)), Number(newEnd.slice(3, 5)))

        dispatch(fetchEditEvent({
            id: event._id,
            newEvent: {
                title: newTitle,
                start: startTime,
                end: endTime,
                color: newColor,
                userId: event.userId,
            }
        }))
    }

    const onDelete = () => {
        dispatch(fetchRemoveEvent({ id: event._id }))
    }

    return (
        <div className={`modal ${openModal ? 'show' : ''}`}>
            <div className="modal-content">
                <div className="modal-top">
                    <h3 className="modal-name">{event.title}</h3>
                    <span className="modal-close" onClick={openModalHundler}>Назад</span>
                </div>
                <form className={styles.form}>
                    <ul className={styles.formList}>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Название</label>
                            <input type="text" className={styles.input} value={newTitle} onChange={onChangeTitleHundler} />
                        </li>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Дата</label>
                            <span className="">{`${new Date(event.start).getDate()} ${monthStr[new Date(event.start).getMonth()]} ${new Date(event.start).getFullYear()}`}</span>
                        </li>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Начало</label>
                            <input type="time" className={styles.input} onChange={onChangeStartHundler} value={newStart} />
                        </li>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Конец</label>
                            <input type="time" className={styles.input} onChange={onChangeEndHundler} value={newEnd} />
                        </li>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Цвет</label>
                            <input type="text" className={styles.input} onChange={onChangeColorHundler} value={newColor} />
                        </li>
                    </ul>
                </form>
                <div className={styles.bottom}>
                    <button className={styles.formBtn} onClick={onSubmit}>Готово</button>
                    <button className={styles.formBtn} onClick={onDelete}>Удалить</button>
                </div>
            </div>
        </div>
    )
}
