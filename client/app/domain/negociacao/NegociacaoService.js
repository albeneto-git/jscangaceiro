class NogociacaoService {


    obterNegociacoesDaSemana(cb) {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/negociacoes/semana');

        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    console.log('Obtendo as negociações do servidor.');
                    const negociacoes = JSON
                                        .parse(xhr.responseText)
                                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                      cb(null, negociacoes);

                }else{
                    console.log(xhr.responseText);
                    cb('Não foi possível obter nas negociações da semana', null);
                }
            }
        };
        xhr.send();
    }
}