/*
    Premissas:
    O metodo getConnection() sempre retorna a mesma conexão para a aplicação toda.
    Toda conexão tem um metodo close(), porém não pode ser chamado, pois a conexão é única para toda a aplicação.
    Só esta fabrica pode fechar a conexão.
*/

const stores = ['negociacoes'];
let connection = null;
let close = null;
    
export class ConnectionFactory {
    constructor() {
        throw new Error('Não é possível criar instâncias dessa classe');
    }

    static getConnection() {
        
        const stores = ['negociacoes'];
        
        return new Promise((resolve, reject) => {

            if(connection) return resolve(connection);

            const openRequest = indexedDB.open('jscangaceiro', 2);

            openRequest.onupgradeneeded = e => {
                ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {
                connection = e.target.result;

                // GUARDANDO A FUNÇÃO ORIGINAL!
                close = connection.close.bind(connection);

                connection.close = () => {
                    throw new Error('Você não pode fechar diretamente a conexão');
                };
                resolve(e.target.result);
            };

            openRequest.onerror = e => {
                console.log(e.target.error)
                reject(e.target.error.name)
            };
        });
    }

    static _createStores(connection) {
        stores.forEach(store => {
            // if sem bloco, mais sucinto!
            if(connection.objectStoreNames.contains(store))
                connection.deleteObjectStore(store);

            connection.createObjectStore(store, { autoIncrement: true });
        });
    }

    static closeConnection() {
        if(connection) {
            close();
        }
    }
}
