/*
*   @author Douglas da Silva e Eduardo 
*   Trabalho Estruturas Avançadas de dados I - Unisinos 2019/02
*/

import No from './No'
import Pessoa from './Pessoa'

class ArvoreAVL {

    // Construtor recebe uma função para ser utilizada para comparar os dados, pois
    // no trabalho nós devemos buscar por mais que apenas um campo (no caso, CPF, nome da pessoa e data de nascimento)
    constructor(comparar) {
        this._comparar = comparar
    }

    get raiz() {
        return this._raiz
    }

    set raiz(novaRaiz) {
        this._raiz = novaRaiz
    }

    get comparar() {
        return this._comparar
    }

    set comparar(novoComparar) {
        this._comparar = novoComparar
    }

    inserir = (elemento) => {
        if (!this._raiz)
            this._raiz = new No(elemento)
        else
            this._raiz = this._inserir(this._raiz, new No(elemento))
    }

    // Funcao recursiva que insere o elemento de acordo com a funcao de comparacao fornecida no construtor
    _inserir = (noAtual, novoNo) => {
        if (!noAtual) return novoNo

        if (this._comparar(noAtual.elemento, novoNo.elemento) === 1) {
            noAtual.noEsquerdo = this._inserir(noAtual.noEsquerdo, novoNo)
        } else if (this._comparar(noAtual.elemento, novoNo.elemento) === -1) {
            noAtual.noDireito = this._inserir(noAtual.noDireito, novoNo)
        }
        noAtual.altura = this.atualizarAltura(noAtual)
        return this.balancearArvore(noAtual)
    }

    altura = (no) => {
        return no ? no.altura : 0
    }


    obterBalanceamento = (no) => {
        return no ? (this.altura(no.noEsquerdo) - this.altura(no.noDireito)) : 0
    }

    atualizarAltura = (no) => {
        const alturaEsquerda = this.altura(no.noEsquerdo)
        const alturaDireita = this.altura(no.noDireito)
        return Math.max(alturaEsquerda , alturaDireita) + 1
    }

    // Verifica-se se a inclusão ou remoção tornará a árvore desbalanceada
    balancearArvore = (no) => {
        const fatorBalenceamento = this.obterBalanceamento(no)

        /* Caso sim, deve-se efetuar o balenceamento da árvore,
        *  descobre-se qual a operação de rotação a ser executada
        *  e executa a ação
        */
        if (fatorBalenceamento > 1) {
            if (this.altura(no.noEsquerdo.noEsquerdo) >= this.altura(no.noEsquerdo.noDireito)) {
                // Caso de rotação simples a direita
                return this.rotacionarADireita(no)
            } else {
                // Caso de rotação dupla a direita
                no.noEsquerdo = this.rotacionarAEsquerda(no.noEsquerdo)
                return this.rotacionarADireita(no)
            }
        } else if (fatorBalenceamento < -1) {
            if (this.altura(no.noDireito.noDireito) >= this.altura(no.noDireito.noEsquerdo)) {
                // Caso de rotação simples a esquerda
                return this.rotacionarAEsquerda(no)
            } else {
                // Caso de rotação dupla a esquerda
                no.noDireito = this.rotacionarADireita(no.noDireito)
                return this.rotacionarAEsquerda(no)
            }
        }

        return no
    }

    // Rotacao a esquerda
    rotacionarAEsquerda = (no) => {
        const novoNo = no.noDireito
        no.noDireito = no.noDireito.noEsquerdo
        novoNo.noEsquerdo = no
        no.altura = this.atualizarAltura(no)
        novoNo.altura = this.atualizarAltura(novoNo)
        return novoNo
    }

    // Rotacao a direita
    rotacionarADireita = (no) => {
        const novoNo = no.noEsquerdo
        no.noEsquerdo = no.noEsquerdo.noDireito
        novoNo.noDireito = no
        no.altura = this.atualizarAltura(no)
        novoNo.altura = this.atualizarAltura(novoNo)
        return novoNo
    }

    busca = (elemento) => {
        return this._busca(elemento, this._raiz)
    }

    _busca = (elemento, no) => {
        if (!no) return new No(new Object());

        if (this._comparar(no.elemento, elemento) === 1) {
            return this._busca(elemento, no.noEsquerdo)
        } else if (this._comparar(no.elemento, elemento) === -1) {
            return this._busca(elemento, no.noDireito)
        }

        return no
    }

    buscaStartsWith = (string, chave) => {
        let lista = []
        return this._buscaStartsWith(string, this._raiz, lista, chave)
    }

    _buscaStartsWith = (string, no, lista, chave) => {
        if (!no) return lista
        this._buscaStartsWith(string, no.noEsquerdo, lista, chave)
        if (no.elemento[chave].startsWith(string))
            lista.push(no.elemento)
        this._buscaStartsWith(string, no.noDireito, lista, chave)
        return lista
    }

    buscaPorIntervaloData = (chave, dataInicial, dataFinal) => {
        let lista = []
        return this._buscaPorIntervaloData(chave, dataInicial, dataFinal, lista, this._raiz)
    }

    _buscaPorIntervaloData = (chave, dataInicial, dataFinal, lista, no) => {
        if (!no) return lista
        this._buscaPorIntervaloData(chave, dataInicial, dataFinal, lista, no.noEsquerdo)
        if (dataInicial.isSameOrBefore(no.elemento[chave]) && dataFinal.isSameOrAfter(no.elemento[chave])) {
            lista.push(no.elemento)
        }
        this._buscaPorIntervaloData(chave, dataInicial, dataFinal, lista, no.noDireito)
        return lista
    }

}


export default ArvoreAVL