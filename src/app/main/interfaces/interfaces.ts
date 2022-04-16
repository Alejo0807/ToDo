import { User } from "src/app/auth/interfaces/user.interface"

export interface Label {
    labelsId: number,
    label?:     string
}

export interface Section {
    sectionId?: string,
    name      : string
}

export interface Task {
    taskId        : string,
    title         : string,
    description?  : string,
    dueDate       : Date,
    creationDate? : Date,
    dificulty     : string,
    state         : string,
    labels        : string
}

export interface ResponseMessage {
    ok      : boolean,
    message : string
}

