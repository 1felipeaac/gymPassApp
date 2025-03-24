import { Checkin, Prisma } from "@prisma/client";

export interface CheckinsRepository{
    create(data: Prisma.CheckinUncheckedCreateInput):Promise<Checkin>
    save(checkIn: Checkin):Promise<Checkin>
    findByUserIdOnDate(userId: string, date:Date): Promise<Checkin | null>
    findManyByUserId(userId: string, page: number): Promise<Checkin[]>
    countByUserId(userId: string): Promise<number>
    findById(userId: string): Promise<Checkin | null>
}