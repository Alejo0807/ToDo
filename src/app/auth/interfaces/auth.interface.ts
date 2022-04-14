export interface AuthResponse {
    ok: boolean,
    email?: string
    token?: string
    authorities? : string[]
}