import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"
import { GetUsersMetricsService } from "../get-users-metrics"

export function makeGetUsersMetricsService(){
    const repository = new PrismaCheckinsRepository()
            
    const service = new GetUsersMetricsService(repository)

    return service
}