import { app } from "@/app"
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from "vitest"
import { latitude, longitude } from "@/utils/get-distance-between-coordinates"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"

describe('History (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to list history of checkin', async () => {

        const {token} = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data:{
                title: "JS GYM",
                description: "Request.body builder",
                phone: "00999999999",
                latitude: latitude,
                longitude: longitude
            }
        })

        await prisma.checkin.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
            ]
        })

        const response = await request(app.server)
            .get('/checkins/history')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.checkins).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                    user_id: user.id
            }),
            expect.objectContaining({
                gym_id: gym.id,
                    user_id: user.id
            }),
        ])
    })
})