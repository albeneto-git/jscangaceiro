class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }A

    paraArray() {
        return this._negociacoes;
    }
}