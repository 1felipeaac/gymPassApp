import { CheckinsRepository } from "@/repositories/checkinsRepository"

interface GetUsersMetricsServiceRequest{
    userId:string,
}

interface GetUsersMetricsServiceResponse {
    checkinsCount: number
}

export class GetUsersMetricsService{
    constructor(
        private checkinsRepository: CheckinsRepository,
    ){}

    async execute({
        userId,
    }:GetUsersMetricsServiceRequest):Promise<GetUsersMetricsServiceResponse>{
        const checkinsCount = await this.checkinsRepository.countByUserId(userId)
        
        return {checkinsCount}
    }
}