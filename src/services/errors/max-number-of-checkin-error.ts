export class MaxNumberOfCheckinsError extends Error {
    constructor(){
        super("Mais de um checkin feito no dia")
    }
}