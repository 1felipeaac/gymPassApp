export class ResourceNotExistsError extends Error{
    constructor(){
        super("Registro não encontrado!")
    }
}