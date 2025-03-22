import { UserRepository } from "@/repositories/usersRepository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { ResourceNotExists } from "./errors/resource-not-exists";

interface GetUserProfileServiceRequest{
    userId:string,
}

interface GetUserProfileServiceResponse {
    user: User
}

export class GetUserProfileService{
    constructor(
        private usersRepository: UserRepository
    ){}

    async execute({
        userId
    }:GetUserProfileServiceRequest):Promise<GetUserProfileServiceResponse>{
        const user = await this.usersRepository.findById(userId);
        if(!user){
            throw new ResourceNotExists()
        }

        return {user}
    }
}