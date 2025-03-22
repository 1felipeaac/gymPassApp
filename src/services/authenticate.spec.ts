import {expect, describe, it, beforeEach} from 'vitest'
import { compare, hash } from 'bcryptjs'
import { inMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { RegisterService } from './register'

let userRepository : inMemoryUserRepository
let sut :AuthenticateService
describe('authenticate service', () => {

    beforeEach(() => {
        userRepository = new inMemoryUserRepository()
        sut = new AuthenticateService(userRepository)
   })
    it('should not be able to authenticate', async () => {

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
    

        await userRepository.create({
            name: 'Felipe',
            email: 'felipe@email.com',
            password_hash: await hash('123456', 6)
        })

       
        await expect(()=>
            sut.execute({
                email: "felipe@email.com",
                password:"123132"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong email', async () => {
     
        await expect(()=>
            sut.execute({
                email: "felipe@prisma.com",
                password:"123456"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    
})