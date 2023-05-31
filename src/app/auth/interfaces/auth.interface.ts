export interface AuthResponse {
    ok: boolean,
    email?: string
    token?: string
    authorities? : string[]
}

export interface Message {
    ok     : boolean,
    message: string
}