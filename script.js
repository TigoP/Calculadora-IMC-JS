const form = document.querySelector('.form'); //busca a classe form no documento html, a seleciona e armazena aqui

form.addEventListener ('submit', function (evento) { // com o form armazenado, passa a ouvir tudo o que é feito dentro do formulário no botao de tipo submit e cria uma função chamada evento para ele. A partir disto, começa um novo evento
    evento.preventDefault(); // ele armazena as informações e prevent a pagina de atualizar e zerar tudo.

    const inputPeso = evento.target.querySelector('#peso');// cria uma variavel setando um target(alvo) no seletor id peso
    const inputAltura = evento.target.querySelector('#altura');// cria uma variavel setando um target(alvo) no seletor id altura

    const peso = Number(inputPeso.value);// cria uma variavel capturando o que foi selecionado no input e o transforma em um numero
    const altura = Number(inputAltura.value)

    if (!peso) { //verifica se o valor é um peso e se for não peso e se nao for valido, entra abaixo. se for valido, pula pro proximo
        setResultado('Peso Inválido', false);// chama uma função la de baixo que estiliza a mensagem
        return;
    }

    if (!altura) {
        setResultado('Altura Inválida', false);
        return;
    } 

    const imc = getImc(peso, altura);// sendo válido, cria uma constante chamando uma função que pega os valores encontrados no digitado pelo usuário e já convertido em number e os seta na função que está sendo amarrada 
    const nivelImc = getNivelImc(imc);// cria uma variavel que chama uma funçao que captura qual posição do array está o resultado do calculo  

    const msg = `Seu IMC é ${imc} (${nivelImc})`;// cria uma função que apresenta os resultados das duas funções

    setResultado(msg, true);// se valor for válido, chama a função de estilo e seta a mensagem acima
});

function getNivelImc(imc) {// esta função pega o nivel do imc capturado pelo parametro imc que está armazenado a informação e indica qual posição do array ele se encontra
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau I', 'Obedidade grau II', 'Obesidade grau III'];

    if(imc >= 39.9) {
        return nivel [5]
    };

    if(imc >= 34.9) {
        return nivel [4]
    };

    if(imc >= 29.9) {
        return nivel [3]        
    };

    if(imc >= 24.9) {
        return nivel [2]
    };

    if(imc >= 18.5) {
        return nivel [1]        
    };

    if(imc < 18.5) {
        return nivel [0]        
    };
}

function getImc (peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

function setResultado (msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    const p = document.createElement ('p');

    if(isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
}
