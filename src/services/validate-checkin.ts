import { CheckinsRepository } from "@/repositories/checkinsRepository"
import { GymsRepository } from "@/repositories/gymsRepository"
import { Checkin } from "@prisma/client"
import { ResourceNotExists } from "./errors/resource-not-exists"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates"
import { MaxDistanceError } from "./errors/max-distance-error"
import { MaxNumberOfCheckinsError } from "./errors/max-number-of-checkin-error"

interface ValidateCheckinServiceRequest{
    checkinId:string
}

interface ValidateCheckinServiceResponse {
    checkIn: Checkin
}

export class ValidateCheckinService{
    constructor(
        private checkinRepository: CheckinsRepository
    ){}

    async execute({
        checkinId
    }:ValidateCheckinServiceRequest):Promise<ValidateCheckinServiceResponse>{
        const checkIn = await this.checkinRepository.findById(checkinId)

        if(!checkIn){
            throw new ResourceNotExists()
        }

        checkIn.validated_at = new Date()

        await this.checkinRepository.save(checkIn)
        
        return {checkIn}
    }
}