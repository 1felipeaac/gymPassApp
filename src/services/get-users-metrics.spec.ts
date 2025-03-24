import { beforeEach, describe, expect, it } from "vitest"
import { GetUsersMetricsService } from "./get-users-metrics"
import { inMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIns-repository"

let checkinRepository : inMemoryCheckInRepository
let sut : GetUsersMetricsService
describe('Get user metrics service', () => {
    beforeEach(async () => {
        checkinRepository = new inMemoryCheckInRepository()
        sut = new GetUsersMetricsService(checkinRepository)

        })
    it('should be able to get chekin counts from metrics ', async () => {

        await checkinRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        })

        await checkinRepository.create({
            gym_id: "gym-02",
            user_id: "user-01",
        })


        const {checkinsCount} = await sut.execute({
            userId:"user-01",
        })

        expect(checkinsCount).toEqual(2)
    })


})
