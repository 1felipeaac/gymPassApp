import request from 'supertest'
import { app } from '@/app';
import { beforeAll,describe, expect, it, afterAll } from "vitest";
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Profile (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to profile', async () => {

        const {token} = await createAndAuthenticateUser(app, true)    

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: 'felipe@gmail.com'
            })
        )
    })
})