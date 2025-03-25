import { Checkin, Prisma } from "@prisma/client";
import { CheckinsRepository } from "../checkinsRepository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckinsRepository implements CheckinsRepository{
    async create(data: Prisma.CheckinUncheckedCreateInput) {
        const checkin  = await prisma.checkin.create({
            data
        })

        return checkin
    }
    async save(data: Checkin) {
        const checkin = await prisma.checkin.update({
            where:{
                id: data.id
            },
            data
        })
        return checkin
    }
    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkin = await prisma.checkin.findFirst({
            where:{
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })
        
        return checkin
    }
    async findManyByUserId(userId: string, page: number) {
        const checkins = await prisma.checkin.findMany({
            where:{
                user_id : userId
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return checkins
    }
    async countByUserId(userId: string) {
        const count = await prisma.checkin.count({
            where:{
                id: userId
            }
        })

        return count
    }
    async findById(userId: string) {
        const checkin = await prisma.checkin.findUnique({
            where:{
                id: userId
            }
        })

        return checkin
    }
    
}