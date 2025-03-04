import { prisma } from "@/lib/prisma"
import { UserRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"

interface RegisterServiceRequest{
    name: string,
    email: string
    password: string
}

interface RegisterServiceResponse{
    user: User
}

export class RegisterService{
    
    constructor(private userRepository: UserRepository){}

    async execute({
        name, 
        email, 
        password
    }: RegisterServiceRequest):Promise<RegisterServiceResponse>{
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if (userWithSameEmail){
            throw new UserAlreadyExistsError()
        }

        const user = await this.userRepository.create({name, email, password_hash})

        return {user}
    }
}