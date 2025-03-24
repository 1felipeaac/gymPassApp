export class LateCheckinValidateError extends Error{
    constructor(){
        super("Checkin atrasado +20 min!")
    }
}