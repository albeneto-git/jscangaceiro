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

        let converter = new DateConverter();

        let data = converter.paraData(this._inputData.value);

        let negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        let diaDoMes = converter.paraTexto(negociacao.data);
        console.log(diaDoMes);
    }
}