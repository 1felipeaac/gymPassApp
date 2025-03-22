import { Checkin } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/checkinsRepository";
import { GymsRepository } from "@/repositories/gymsRepository";
import { ResourceNotExists } from "./errors/resource-not-exists";

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
        gymId
    }:CheckinServiceRequest):Promise<CheckinServiceResponse>{
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotExists()
        }


        const checkInOnSameDate = await this.checkinRepository.findByUserIdOnDate(userId, new Date());

        if (checkInOnSameDate){
            throw new Error
        }
        const checkIn = await this.checkinRepository.create({
            gym_id:gymId,
            user_id:userId
        })

        return {checkIn}
    }
}