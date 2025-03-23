import { Checkin } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/checkinsRepository";
import { GymsRepository } from "@/repositories/gymsRepository";
import { ResourceNotExists } from "./errors/resource-not-exists";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checkin-error";

interface CheckinServiceRequest{
    userId:string,
    gymId:string,
    userLatitude:number,
    userLongitude:number
}

interface CheckinServiceResponse {
    checkIn: Checkin
}

export class CheckinService{
    constructor(
        private checkinRepository: CheckinsRepository,
        private gymsRepository: GymsRepository
    ){}

    async execute({
        userId,
        gymId, 
        userLatitude,
        userLongitude
    }:CheckinServiceRequest):Promise<CheckinServiceResponse>{
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotExists()
        }

        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()})

        const MAX_DISTANCE_IN_KM = 0.1

        if (distance > MAX_DISTANCE_IN_KM){
            throw new MaxDistanceError()
        }


        const checkInOnSameDate = await this.checkinRepository.findByUserIdOnDate(userId, new Date());

        if (checkInOnSameDate){
            throw new MaxNumberOfCheckinsError()
        }
        const checkIn = await this.checkinRepository.create({
            gym_id:gymId,
            user_id:userId
        })

        return {checkIn}
    }
}