class NegociacaoController {

    constructor() {
        // Criação de variável passando uma função. Foi necessário fazer o bind, 
        //pois document.querySelector estava fora de contexto.
        const $ = document.querySelector.bind(document);

        this._inputData       = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor      = $('#valor');

        // guardando uma referência
        // para a instância de NegociacaoController
        const self = this;

        this._negociacoes     = new Proxy(new Negociacoes(), {

            get(target, prop, receiver){

                if(typeof(target[prop]) == typeof(Function) && ['adiciona', 'esvazia'].includes(prop)) {
 
                    return function() {
                        console.log(`"${prop}" disparou a armadilha`);
                        target[prop].apply(target, arguments);
                        self._negociacoesView.update(target);
                    }

                } else {
                    // realizando um get padrão
                    return target[prop];
                }
            }
        });
        
        this._negociacoesView = new NegociacoesView('#negociacoes');
        this._negociacoesView.update(this._negociacoes);
        
        this._mensagem        = new Mensagem();
        this._mensagemView = new MensagemView('#mensagemView');
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();
        this._negociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._mensagemView.update(this._mensagem);
        this._limpaFormulario();
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateConverter.paraData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    apaga() {
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
    }

}