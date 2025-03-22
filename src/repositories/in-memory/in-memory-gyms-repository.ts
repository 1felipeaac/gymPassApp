import { Gym } from "@prisma/client";
import { GymsRepository } from "../gymsRepository";

export class inMemoryGymsRepository implements GymsRepository{
    public items:Gym[] = [];
    async findById(userId: string){
        const gym = this.items.find(item => item.id === userId);

        if(!gym){
            return null
        }

        return gym
    }
}