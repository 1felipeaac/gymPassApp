import { Checkin, Prisma } from "@prisma/client";
import { CheckinsRepository } from "../checkinsRepository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class inMemoryCheckInRepository implements CheckinsRepository{
    public items:Checkin[] = [];

    async countByUserId(userId: string){
        return this.items.filter(item => item.user_id === userId)
            .length

    }
    async findManyByUserId(userId: string, page: number){
        return this.items
        .filter(item => item.user_id === userId)
        .slice((page - 1) * 20, page * 20)
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')
        const checkInOnSameDate = this.items.find(checkin => {
            const checkinInDate = dayjs(checkin.created_at)
            const inOnSameDate = 
                checkinInDate.isAfter(startOfTheDay) && checkinInDate.isBefore(endOfTheDay)

            
            return checkin.user_id === userId && inOnSameDate
        })

        if (!checkInOnSameDate){
            return null
        }

        return checkInOnSameDate
    }

    async create(data:Prisma.CheckinUncheckedCreateInput) {
    
        const checkIn ={
            id:randomUUID(),
            user_id:data.user_id,
            gym_id:data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,       
            created_at: new Date()
        }

        this.items.push(checkIn);
    
        return checkIn;
    }

    async findById(userId: string){
        const checkIn = this.items.find((item) => item.id === userId)

        if(!checkIn){
            return null
        }

        return checkIn
    }

    async save(checkIn: Checkin){
        const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

        if(checkInIndex >= 0){
            this.items[checkInIndex] = checkIn
        }

        return checkIn
    }

}