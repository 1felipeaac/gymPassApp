import { inMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetUserProfileService } from "./get_user_profile"
import { ResourceNotExists } from "./errors/resource-not-exists"

let userRepository : inMemoryUserRepository
let sut : GetUserProfileService
describe('get user profile service', () => {
    beforeEach(() => {
         userRepository = new inMemoryUserRepository()
         sut = new GetUserProfileService(userRepository)
    })
    it('should be able to get user profile', async () => {
        
        const createdUser = await userRepository.create({
            name: "Felipe",
            email:"felipe@email.com",
            password_hash: "123456"
        })

        const {user} = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual("Felipe")
    })

    it('should be able to get user profile with wrong id', async () => {

        await expect(()=>
            sut.execute({
                userId: "id-not-found"
            })
        ).rejects.toBeInstanceOf(ResourceNotExists)
    })

})