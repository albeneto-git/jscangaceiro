var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];

console.log(campos);

var tbody = document.querySelector('table tbody');

document.querySelector('.form').addEventListener('submit', function(event){

    // cancelando a submissão do formulário
    event.preventDefault();

    var tr = document.createElement('tr');
    campos.forEach(function(campo){
        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
    });
    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;
    tr.appendChild(tdVolume);
    tbody.appendChild(tr);

    // limpa o campo data
    campos[0].value = '';
    // limpa o campo quantidade
    campos[1].value = 1;
    // limpa o campo valor
    campos[2].value = 0.0;
    // muda o foco para o campo data
    campos[0].focus();
});