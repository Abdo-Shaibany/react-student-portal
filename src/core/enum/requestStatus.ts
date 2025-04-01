export enum RequestStatus {
    ALL = "all",
    PENDING = "pending",
    IN_PROGRESS = "inProgress",
    COMPLETED = "completed",
}

export const statusColors = {
    all: '',
    pending: 'bg-yellow-100 text-yellow-800',
    inProgress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
}