
import { app } from "@/app"
import { latitude, longitude } from "@/utils/get-distance-between-coordinates"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from "vitest"
describe('Nearby Gyms (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list nearby gym', async () => {

        const {token} = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Near Gym",
                description: "",
                phone: "",
                latitude: latitude,
                longitude: longitude
            })
        
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Far Gym",
                description: "",
                phone: "",
                latitude: -5.0819789,
                longitude: -42.7637889
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: latitude,
                longitude: longitude
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        // console.log(JSON.stringify(response.body))

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({title: "Near Gym"})
        ])
    })
})