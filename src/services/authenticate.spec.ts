import {expect, describe, it} from 'vitest'
import { compare, hash } from 'bcryptjs'
import { inMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('authenticate service', () => {
    it('should not be able to authenticate', async () => {
        const userRepository = new inMemoryUserRepository()
        const sut = new AuthenticateService(userRepository)

        await userRepository.create({
            name: 'Felipe',
            email: 'felipe@email.com',
            password_hash: await hash('123456', 6)
        })

        const {user} = await sut.execute({
            email: "felipe@email.com",
            password:"123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong password', async () => {
        const userRepository = new inMemoryUserRepository()
        const sut = new AuthenticateService(userRepository)

        await userRepository.create({
            name: 'Felipe',
            email: 'felipe@email.com',
            password_hash: await hash('123456', 6)
        })

       
        expect(()=>
            sut.execute({
                email: "felipe@email.com",
                password:"123132"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong email', async () => {
        const userRepository = new inMemoryUserRepository()
        const sut = new AuthenticateService(userRepository)
     
        expect(()=>
            sut.execute({
                email: "felipe@prisma.com",
                password:"123456"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    
})