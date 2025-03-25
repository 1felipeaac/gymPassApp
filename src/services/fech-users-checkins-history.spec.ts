import { inMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-checkIns-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { FetchUsersChcekinsHistoryService } from "./fech-users-checkins-history"

let checkinRepository : inMemoryCheckInRepository
let sut : FetchUsersChcekinsHistoryService
describe('fetch user checkins history service', () => {
    beforeEach(async () => {
        checkinRepository = new inMemoryCheckInRepository()
        sut = new FetchUsersChcekinsHistoryService(checkinRepository)

        })
    it('should be able to fetch checkin history', async () => {

        await checkinRepository.create({
            gym_id: "gym-01",
            user_id: "user-01",
        })

        await checkinRepository.create({
            gym_id: "gym-02",
            user_id: "user-01",
        })


        const {checkins} = await sut.execute({
            userId:"user-01",
            page: 1
        })

        expect(checkins).toHaveLength(2)
        expect(checkins).toEqual([
            expect.objectContaining({gym_id: "gym-01"}),
            expect.objectContaining({gym_id: "gym-02"}),
        ])
    })

    it('should be able to fetch paginated checkin history', async () => {

        for(let i = 0; i <= 22; i++){
            await checkinRepository.create({
                gym_id: `gym-${i}`,
                user_id: "user-01",
            })
        }

        const {checkins} = await sut.execute({
            userId:"user-01",
            page: 2,
        })

        expect(checkins).toHaveLength(3)
        expect(checkins).toEqual([
            expect.objectContaining({gym_id: "gym-20"}),
            expect.objectContaining({gym_id: "gym-21"}),
            expect.objectContaining({gym_id: "gym-22"}),
        ])
    })
})

