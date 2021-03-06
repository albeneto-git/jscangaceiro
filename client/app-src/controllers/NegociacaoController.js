import { Negociacoes, NegociacaoService, Negociacao} from '../domain/index.js';
import { NegociacoesView, MensagemView, Mensagem, DataInvalidaException, DateConverter } from '../ui/index.js';
import { getNegociacaoDao, Bind, getExceptionMessage} from '../util/index.js';

export class NegociacaoController {

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

        this._service = new NegociacaoService();

        this._init();
    }

    async _init(){
        try {
            const negociacao = this._criaNegociacao();
            const dao = await getNegociacaoDao();
            await dao.adiciona(negociacao);
            this._negociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limpaFormulario();
            } catch(err) {
                this._mensagem.texto = getExceptionMessage(err);
        }
    }

    adiciona(event) {
        try {
            event.preventDefault();
            const negociacao = this._criaNegociacao();
            getNegociacaoDao()
                .then(dao => dao.adiciona(negociacao))
                .then(() => {
                    // só tentará incluir na tabela se conseguiu antes incluir no banco
                    this._negociacoes.adiciona(negociacao);
                    this._mensagem.texto = 'Negociação adicionada com sucesso';
                    this._limpaFormulario();
                })
                .catch(err => this._mensagem.texto = err);
        } catch (err) {
            this._mensagem.texto = getExceptionMessage(err);
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

    async apaga() {
        try {
            const dao = await getNegociacaoDao();
            await dao.apagaTodas();
            this._negociacoes.esvazia();
            this._mensagem.texto = 'Negociações apagadas com sucesso';
            } catch(err) {
                this._mensagem.texto = getExceptionMessage(err);
            }
    }

    async importarNegociacoes(){
        try {
            const negociacoes = await this._service.obtemNegociacoesDoPeriodo();
            console.log(negociacoes);
            negociacoes.filter(novaNegociacao =>
                !this._negociacoes.paraArray().some(negociacaoExistente =>
                    novaNegociacao.equals(negociacaoExistente)))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        } catch(err) {
            this._mensagem.texto = getExceptionMessage(err);
        }
    }
}