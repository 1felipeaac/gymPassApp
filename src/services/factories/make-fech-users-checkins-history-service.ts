import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository"
import { FetchUsersChcekinsHistoryService } from "../fech-users-checkins-history"

export function makeFetchUsersChcekinsHistoryService(){
    const repository = new PrismaCheckinsRepository()
            
    const service = new FetchUsersChcekinsHistoryService(repository)

    return service
}