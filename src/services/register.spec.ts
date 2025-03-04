import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import {expect, describe, it} from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('register service', () => {
    it('should be able to register', async () => {
        const userRepository = new inMemoryUserRepository()
        const registerService = new RegisterService(userRepository)

        const {user} = await registerService.execute({
            name: "Felipe",
            email: "felipe@prisma.com",
            password:"123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const userRepository = new inMemoryUserRepository()
        const registerService = new RegisterService(userRepository)

        const {user} = await registerService.execute({
            name: "Felipe",
            email: "felipe@prisma.com",
            password:"123456"
        })

        const isPasswordCorrectlyHashed = await compare("123456", user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const userRepository = new inMemoryUserRepository()
        const registerService = new RegisterService(userRepository)

        const email = "felipe@prisma.com"

        await registerService.execute({
            name: "Felipe",
            email,
            password:"123456"
        })


        await expect(() => 
            registerService.execute({
            name: "Felipe",
            email,
            password:"123456"
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})