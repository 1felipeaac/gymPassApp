import { UserRepository } from "@/repositories/usersRepository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateServiceRequest{
    email:string,
    password:string
}

interface AuthenticateServiceResponse {
    user: User
}

export class AuthenticateService{
    constructor(
        private usersRepository: UserRepository
    ){}

    async execute({email, password}:AuthenticateServiceRequest):Promise<AuthenticateServiceResponse>{
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatchs = await compare(password, user.password_hash)

        if(!doesPasswordMatchs){
            throw new InvalidCredentialsError()
        }

        return {user}
    }
}