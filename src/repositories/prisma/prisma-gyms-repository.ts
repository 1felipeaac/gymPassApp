import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { FindManyNearbyParams, GymsRepository } from "../gymsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaGymRepository implements GymsRepository{
    async findById(userId: string){
       const gym = await prisma.gym.findUnique({
            where:{
                id: userId
            }
       })

       return gym
    }
    async create(data: Prisma.GymCreateInput){
        const gym = await prisma.gym.create({
            data
        })

        return gym
    }
    async searchMany(query: string, page: number){
        const gyms = await prisma.gym.findMany({
            where:{
                title:{
                    contains: query
                }
            }
        })

        return gyms
    }
    async findManyNearby({latitude, longitude}: FindManyNearbyParams){
        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms 
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }

}