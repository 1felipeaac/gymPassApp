export class ResourceNotExists extends Error{
    constructor(){
        super("Registro não encontrado!")
    }
}