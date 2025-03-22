import {expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { inMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkIns-repository'
import { CheckinService } from './checkin'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkinRepository : inMemoryCheckInRepository
let gymsRepository: inMemoryGymsRepository
let sut :CheckinService
const latitude = -5.1421768
const longitude = -42.8345395
describe('Checkin service', () => {
    beforeEach(() => {
        checkinRepository = new inMemoryCheckInRepository()
        gymsRepository = new inMemoryGymsRepository()
        sut = new CheckinService(checkinRepository, gymsRepository)

        vi.useFakeTimers()
    })
    afterEach(() =>{
        vi.useRealTimers()
    })
    it('should be able to checkin', async () => {

        const gym = await gymsRepository.items.push({
            id: "gym-id",
            title:"JS Gym",
            description:"",
            phone:"",
            latitude: new Decimal(0),
            longitude: new Decimal(0)
        })
        const {checkIn} = await sut.execute({
            gymId:"gym-01",
            userId:"user-01",
            userLatitude: latitude,
            userLongitude: longitude
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to checkin twice in the same day', async () => {
        vi.setSystemTime(new Date(2025,2,22, 8,0,0))
        await sut.execute({
            gymId:"gym-01",
            userId:"user-01",
            userLatitude: latitude,
            userLongitude: longitude
        })

        await expect(() =>
            sut.execute({
                gymId:"gym-01",
                userId:"user-01",
                userLatitude: latitude,
                userLongitude: longitude
            })
        ).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to checkin twice but in different days', async () => {
        vi.setSystemTime(new Date(2025,2,22, 8,0,0))
        await sut.execute({
            gymId:"gym-01",
            userId:"user-01",
            userLatitude: latitude,
            userLongitude: longitude
        })

        vi.setSystemTime(new Date(2025,2,23, 8,0,0))
        const {checkIn} = await sut.execute({
                gymId:"gym-01",
                userId:"user-01",
                userLatitude: latitude,
                userLongitude: longitude
            })
        expect(checkIn.id).toEqual(expect.any(String))
    })


})