export interface IEvent {
    _id: string
    title: string
    color: string
    start: string
    end: string
    userId: string
    createdAt: string
    updatedAt: string
}

export interface IEventParams {
    title: string
    color: string
    start: string | Date
    end: string | Date
    userId: string
}