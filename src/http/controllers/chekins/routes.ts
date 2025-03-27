import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/hooks/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";
import { verifyUserRole } from "@/http/hooks/verify-user-role";

export async function checkinsRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJWT)

    app.get('/checkins/history', history)
    app.get('/checkins/metrics', metrics)
    app.post('/gyms/:gymId/checkins', create)
    app.patch('/checkins/:checkinId/validate', {onRequest: [verifyUserRole('ADMIN')]},validate)

    
}