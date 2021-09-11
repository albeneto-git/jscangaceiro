class NegociacaoController {

    constructor() {
        // Criação de variável passando uma função. Foi necessário fazer o bind, 
        //pois document.querySelector estava fora de contexto.
        let $ = document.querySelector.bind(document);

        this._inputData       = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor      = $('#valor');
    }

    adiciona(event) {
        event.preventDefault();

        let data = new Date(...
            this._inputData.value.split('-')
            .map((item, indice) => item - indice % 2)
        );

        let negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        let diaDoMes = negociacao.data.getDate() + '/' + (negociacao.data.getMonth() + 1) + '/' + negociacao.data.getFullYear();
        console.log(diaDoMes);
    }
}