import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateUser(app: FastifyInstance){
    // await request(app.server)
    //         .post('/users')
    //         .send({
    //             name: 'Felipe',
    //             email:'felipe@gmail.com',
    //             password: '123456'
    //         })

    await prisma.user.create({
        data:{
            name: 'Felipe',
            email:'felipe@gmail.com',
            password_hash: await hash('123456', 6),
        }
    })
        

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email:'felipe@gmail.com',
            password: '123456'
        })

        
    const {token} = authResponse.body

    return {token}
}