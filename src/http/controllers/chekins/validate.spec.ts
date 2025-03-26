import { app } from "@/app"
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from "vitest"
import { latitude, longitude } from "@/utils/get-distance-between-coordinates"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"

describe('Validate Checkin (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to validate a checkin', async () => {

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

        let checkin = await prisma.checkin.create({
            data:{
                gym_id: gym.id,
                user_id: user.id
            }
        })

        const response = await request(app.server)
            .patch(`/checkins/${checkin.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(204)

        checkin = await prisma.checkin.findFirstOrThrow({
            where:{
                id: checkin.id
            }
        })

        expect(checkin.validated_at).toEqual(expect.any(Date))
    })
})