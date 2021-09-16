class NegociacaoController {

    constructor() {
        // Criação de variável passando uma função. Foi necessário fazer o bind, 
        //pois document.querySelector estava fora de contexto.
        let $ = document.querySelector.bind(document);

        this._inputData       = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor      = $('#valor');
        this._negociacoes     = new Negociacoes();
    }

    adiciona(event) {
        
        event.preventDefault();

        let negociacao = new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
        this._negociacoes.adiciona(negociacao);
        console.log(this._negociacoes.paraArray());
    }
}