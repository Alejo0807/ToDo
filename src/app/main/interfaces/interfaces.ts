import { User } from "src/app/auth/interfaces/user.interface"

export interface LabelId {
    labelId?:   number,
    userId  ?:   number
}

export interface Label {
    id    :      LabelId
    labelName?:      string
}

export interface Section {
    sectionId?: string,
    name      : string
}

export interface Task {
    taskId?        : number,
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

