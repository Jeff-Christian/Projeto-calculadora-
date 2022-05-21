// criando classe, basicamente é um objeto com propriedades a serem usadas no restante do código
class Calculator {

    constructor(){
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }

    // metodo de limpar a tela para continuar as operações matematicas 

    clearValues(){
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
    }


    // metodo de checagem do ultimo digito, assim outras operações não serão adicionadas uma após a outra
    checkLastDigit(input, upperValue, reg){
        if((
            !reg.test(input) &&
            !reg.test(upperValue.substr(upperValue.length - 1))
        )) {
            return true;
        } else {
            return false;
        }
    }

    // metodo de soma
    sum(n1, n2){
        return parseFloat(n1) + parseFloat(n2);
    }

    // metodo de subtração
    subtraction(n1, n2){
        return parseFloat(n1) - parseFloat(n2);
    }

    // metodo de multiplicação
    multiplication(n1, n2){
        return parseFloat(n1) * parseFloat(n2);
    }

    // metodo de divisão
    division(n1, n2){
        return parseFloat(n1) / parseFloat(n2);
    }

    // metodo de atualização dos valores

    refreshValues(total){
        this.upperValue.textContent = total;
        this.resultValue.textContent = total;
    }

    // metodo de resolução das operações matematicas 

    resolution(){
        
        // transformar as strings em array's

        let upperValueArray = (this.upperValue.textContent).split(' ');

        // resultado das operações
        let result = 0;

        for(let i = 0; i <= upperValueArray.length; i++){

            //  variavel para indentificar se há um novo operador 
            let operation = 0;

            let actualItem = upperValueArray[i];

            if(actualItem == 'x'){
                result = calc.multiplication(upperValueArray[i - 1], upperValueArray[i + 1]);
                operation = 1;
            } else if(actualItem == '/'){
                result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
                operation = 1;
                // verificar a ordem matemática a ser feita, se não houver (!) multiplicação e divisão
            } else if(!upperValueArray.includes('x') && !upperValueArray.includes('/')){
                if(actualItem == '+'){
                    result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
                    operation = 1;
                } else if(actualItem == '-'){
                    result = calc.subtraction(upperValueArray[i - 1], upperValueArray[i + 1]);
                    operation = 1;
                }
            }

            // metodo de atualizaçao dos valores do array para a proxima resolução

            if(operation){
                upperValueArray[i - 1] = result;

                //  remover do array os itens ja utilizados

                upperValueArray.splice(i, 2);

                i = 0;
            }

        }

        if(result){
            calc.reset = 1;
        }

        calc.refreshValues(result);

    }

    pressBtn(){

        // adicionar o textContent para pegar o retorno dos valores clicados
       let input = this.textContent;
       let upperValue = calc.upperValue.textContent;

        //    adicionando RegExp para saber se o que foi adicionado foram números

        var reg = new RegExp('^\\d+$');

        // metodo de resetar após uma equação

        if(calc.reset && reg.test(input)){
            upperValue = '0';
        }

        calc.reset = 0;

        // utilizado para apagar o conteudo já inserido nas operações

        if(input == 'AC'){ 

           calc.clearValues();

        } else if (input == '='){

            calc.resolution();

        } else {

            //  checar se precisa adicionar ou não o item, evitando sinais duplicados

            if(calc.checkLastDigit(input, upperValue, reg)){
                return false;
            }

            // adiciona espaços entre os operadores

            if(!reg.test(input)){
                input = ` ${input} `;
            }

            // aqui adicionamos o conteudo dos botões no visor de números, input, tratando de uma condição para que não seja inseridos os zeros a frente

            if(upperValue == '0'){

                // resolve o bug do NaN, fazendo com quê seja impossivel adicionar um  operador antes de um número

                if(reg.test(input)){
                    calc.upperValue.textContent = input;
                }

            } else {
                calc.upperValue.textContent += input;
            }
        }
        
    }
}

// instanciar a classe/objeto 
let calc = new Calculator;

// criar um loop para verificar todos os botões da calculadora

let buttons = document.querySelectorAll('.btn'); 

for(let i = 0; buttons.length > i; i++){
    buttons[i].addEventListener('click', calc.pressBtn);
}





