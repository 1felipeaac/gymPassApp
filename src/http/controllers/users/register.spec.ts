import request from 'supertest'
import { app } from '@/app';
import { beforeAll,describe, expect, it, afterAll } from "vitest";

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to resgister', async () => {
        const response = await request(app.server)
            .post('/users')
            .send({
                name: 'Felipe',
                email:'feelipe@gmail.com',
                password: '123456'
            })
        expect(response.statusCode).toEqual(201)
    })
})