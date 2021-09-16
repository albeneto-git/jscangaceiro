class Negociacoes{
    constructor() {
        this._negociacoes = [];
    }

    adiciona(Negociacao) {
        this._negociacoes.push(Negociacao);
    }A

    paraArray() {
        return this._negociacoes;
    }
}