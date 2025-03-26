import { app } from "@/app"
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from "vitest"
import { latitude, longitude } from "@/utils/get-distance-between-coordinates"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe('Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create gym', async () => {

        const {token} = await createAndAuthenticateUser(app)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "JS GYM",
                description: "Request.body builder",
                phone: "00999999999",
                latitude: latitude,
                longitude: longitude
            })

        expect(response.statusCode).toEqual(201)
    })
})