class NegociacaoController {

    constructor() {
        // Criação de variável passando uma função. Foi necessário fazer o bind, 
        //pois document.querySelector estava fora de contexto.
        const $ = document.querySelector.bind(document);

        this._inputData       = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor      = $('#valor');

        this._negociacoes = new Bind(
            new Negociacoes(),
            new NegociacoesView('#negociacoes'),
            'adiciona', 'esvazia'
        );
        
        this._negociacoesView = new NegociacoesView('#negociacoes');
        this._negociacoesView.update(this._negociacoes);
        
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView('#mensagemView'),
            'texto'
        );

        this._mensagemView = new MensagemView('#mensagemView');
        this._mensagemView.update(this._mensagem);

        this._service = new NogociacaoService();
    }

    adiciona(event) {
        try {
            
            event.preventDefault();
            this._negociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = "Negociação adicionada com sucesso";
            this._limpaFormulario();

        } catch (err) {

            console.log(err);
            console.log(err.stack);

            if(err instanceof DataInvalidaException) {
                this._mensagem.texto = err.message;
            } else {
                // mensagem genérica para qualquer problema que possa acontecer
                this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte';
            }  
        }
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
    }

    importarNegociacoes(){

        // this._service
        // .obtemNegociacoesDoPeriodo()
        // .then(negociacoes => {
        //     negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
        //         this._mensagem.texto = 'Negociações do período importadascom sucesso';
        // }).catch(err => this._mensagem.texto = err);

        this._service
        .obtemNegociacoesDoPeriodo()
        .then(negociacoes => {
            negociacoes.filter(novaNegociacao =>
                    !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente)))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        })
        .catch(err => this._mensagem.texto = err);
    }
}