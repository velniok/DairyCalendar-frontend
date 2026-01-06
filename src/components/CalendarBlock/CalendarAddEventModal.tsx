import { useState, type ChangeEvent, type FC } from "react"
import styles from './Calendar.module.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchCreateEvent } from "../../store/event/eventSlice"

interface CalendarAddEventModalProps {
    openModal: boolean
    openModalHundler: () => void
    day: Date
}

export const CalendarAddEventModal: FC<CalendarAddEventModalProps> = ({ openModal, openModalHundler, day }) => {

    const dispatch = useAppDispatch()
    const UserData = useAppSelector((state) => state.auth.data)

    const monthStr: string[] = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

    const [title, setTitle] = useState<string>('')
    const [start, setStart] = useState<string>('')
    const [end, setEnd] = useState<string>('')
    const [color, setColor] = useState<string>('')

    const onChangeTitleHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const onChangeStartHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setStart(event.target.value)
    }

    const onChangeEndHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnd(event.target.value)
    }

    const onChangeColorHundler = (event: ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value)
    }

    const onSubmit = () => {
        const startTime = new Date(day)
        startTime.setHours(Number(start.slice(0, 2)), Number(start.slice(3, 5)))

        const endTime = new Date(day)
        endTime.setHours(Number(end.slice(0, 2)), Number(end.slice(3, 5)))
        
        if (UserData) {
            dispatch(fetchCreateEvent({
                title: title,
                start: startTime,
                end: endTime,
                color: color,
                userId: UserData._id,
            }))
        }
    }

    return (
        <div className={`modal ${openModal ? 'show' : ''}`}>
            <div className="modal-content">
                <div className="modal-top">
                    <h3 className="modal-name">Создать новую задачу</h3>
                    <span className="modal-close" onClick={openModalHundler}>Назад</span>
                </div>
                <form className={styles.form}>
                    <ul className={styles.formList}>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Название</label>
                            <input type="text" className={styles.input} value={title} onChange={onChangeTitleHundler} />
                        </li>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Дата</label>
                            <span className=""> {day.getDate()} {monthStr[day.getMonth()]} {day.getFullYear()}</span>
                        </li>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Начало</label>
                            <input type="time" className={styles.input} value={start} onChange={onChangeStartHundler} />
                        </li>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Конец</label>
                            <input type="time" className={styles.input} value={end} onChange={onChangeEndHundler} />
                        </li>
                        <li className={styles.formItem}>
                            <label className={styles.label}>Цвет</label>
                            <input type="text" className={styles.input} value={color} onChange={onChangeColorHundler} />
                        </li>
                    </ul>
                </form>
                <div className={styles.bottom}>
                    <button className={styles.formBtn} onClick={onSubmit}>Готово</button>
                </div>
            </div>
        </div>
    )
}
