class NogociacaoService {

    constructor(){
        this._http = new HttpService();
    }

    obtemNegociacoesDaSemana() {

        return this._http.get('http://localhost:3000/negociacoes/semana')
                .then(
                    dados => {
                        const negociacoes = dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                        return negociacoes;
                    },
                    err => {
                        throw new Error('Não foi possível obter as negociações');
                    }
                );

    }

    obtemNegociacoesDaSemanaAnterior() {

        return this._http.get('http://localhost:3000/negociacoes/anterior')
                .then(
                    dados => {
                        const negociacoes = dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                        return negociacoes;
                    },
                    err => {
                        throw new Error('Não foi possível obter as negociações da semana anterior');
                    }
                );

    }

    obtemNegociacoesDaSemanaRetrasada() {

        return this._http.get('http://localhost:3000/negociacoes/retrasada')
                .then(
                    dados => {
                        const negociacoes = dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                        return negociacoes;
                    },
                    err => {
                        throw new Error('Não foi possível obter as negociações da semana retrasada');
                    }
                );
    }

    obtemNegociacoesDoPeriodo(){
        
        return Promise.all([
                this.obtemNegociacoesDaSemana(),
                this.obtemNegociacoesDaSemanaAnterior(),
                this.obtemNegociacoesDaSemanaRetrasada()
            ]).then(periodo => {
                return periodo.reduce((novoArray, item) => novoArray.concat(item), []);
            }).catch(err => {
                console.log(err);
                throw new Error('Não foi possível obter as negociações do período');
            });
    }

}
