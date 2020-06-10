/*
*   @author Douglas da Silva e Eduardo 
*   Trabalho Estruturas Avançadas de dados I - Unisinos 2019/02
*/

class No {

    constructor (elemento) {
        this._elemento = elemento
        this._altura = 1
    }

    get elemento() {
        return this._elemento
    }

    set elemento(novaPessoa) {
        this._elemento = novaPessoa
    }

    get noEsquerdo() {
        return this._noEsquerdo
    }

    set noEsquerdo(novoNoEsquerdo) {
        this._noEsquerdo = novoNoEsquerdo
    }

    get noDireito() {
        return this._noDireito
    }

    set noDireito(novoNoDireito) {
        this._noDireito = novoNoDireito
    }

    get altura() {
        return this._altura
    }

    set altura(novaAltura) {
        this._altura = novaAltura
    }
}

export default No