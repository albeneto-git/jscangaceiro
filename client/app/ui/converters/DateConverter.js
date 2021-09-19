class DateConverter {

    constructor() {
        throw new Error('Esta classe não deve ser instanciada.')
    }

    static paraTexto( data ){

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;

    }
    
    static paraData( texto ) {

        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto))
            throw new Error('A data deve estar no formato dd/mm/aaa');
        
        return new Date(...texto.split('-').map((item,indice) =>
                        item - indice % 2));
    }
}