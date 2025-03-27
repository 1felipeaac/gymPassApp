import { app } from "@/app"
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from "vitest"
import { latitude, longitude } from "@/utils/get-distance-between-coordinates"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"

describe('Search Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search gym', async () => {

        const {token} = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "JS GYM",
                description: "Request.body builder",
                phone: "00999999999",
                latitude: latitude,
                longitude: longitude
            })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: "TS GYM",
            description: "Request.body builder",
            phone: "00999999999",
            latitude: latitude,
            longitude: longitude
        })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                q: "TS"
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        // console.log(JSON.stringify(response.body))

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "TS GYM"
            })
        ])
    })
})