export type CreateUserParams = {
    username: string
    email: string
    password: string,
}

export type UpdateUserParams = {
    username: string
    email: string
    password: string
}

export type ResetPasswordParams = {
    password : string
    confirmPassword : string
}

export type CreatePostParams = {
    userId  : number
    title : string
    body : string
}

export type UpdatePostParams = {
    id :number
    title : string
    body : string
}

export type CreatePaymentParams = {
    email : string
    price : number  
}