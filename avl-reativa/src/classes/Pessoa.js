/*
*   @author Douglas da Silva e Eduardo 
*   Trabalho Estruturas Avançadas de dados I - Unisinos 2019/02
*/

class Pessoa {

    constructor(cpf, rg, nome, dataNascimento, cidadeNascimento, id) {
        this._cpf = cpf
        this._rg = rg
        this._nome = nome
        this._dataNascimento = dataNascimento
        this._cidadeNascimento = cidadeNascimento
        this._id = id
    }

    get id() {
        return this._id
    }

    set id(novoId) {
        this._id = novoId
    }

    get cpf() {
        return this._cpf
    }

    set cpf(novoCpf) {
        this._cpf = novoCpf
    }
    
    get rg() {
        return this._rg
    }
    
    set rg(novoRg) {
        this._rg = novoRg
    }
    
    get nome() {
        return this._nome
    }

    set nome(novoNome) {
        this._nome = novoNome
    }

    get dataNascimento() {
        return this._dataNascimento
    }

    set dataNascimento(novaDataNascimento) {
        this._dataNascimento = novaDataNascimento
    }

    get cidadeNascimento() {
        return this._cidadeNascimento
    }

    set cidadeNascimento(novaCidadeNascimento) {
        this._cidadeNascimento = novaCidadeNascimento
    }
}

export default Pessoa