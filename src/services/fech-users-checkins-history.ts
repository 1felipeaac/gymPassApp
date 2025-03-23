import { CheckinsRepository } from "@/repositories/checkinsRepository"
import { Checkin } from "@prisma/client"

interface FetchUsersChcekinsHistoryServiceRequest{
    userId:string,
    page:number
}

interface FetchUsersChcekinsHistoryServiceResponse {
    checkins: Checkin[]
}

export class FetchUsersChcekinsHistoryService{
    constructor(
        private checkinsRepository: CheckinsRepository,
    ){}

    async execute({
        userId,
        page
    }:FetchUsersChcekinsHistoryServiceRequest):Promise<FetchUsersChcekinsHistoryServiceResponse>{
        const checkins = await this.checkinsRepository.findManyByUserId(userId, page)
        
        return {checkins}
    }
}