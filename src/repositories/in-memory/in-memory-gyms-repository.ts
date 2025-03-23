import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gymsRepository";
import { randomUUID } from "node:crypto";

export class inMemoryGymsRepository implements GymsRepository{
    public items:Gym[] = [];
    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString())
        }

        this.items.push(gym)

        return gym
    }
    async findById(userId: string){
        const gym = this.items.find(item => item.id === userId);

        if(!gym){
            return null
        }

        return gym
    }
}