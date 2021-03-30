const Modal = {
  open(){
    // Abrir modal para
    // adicionar a class active ao modal
    document.querySelector('.modal-orvelay')
    .classList
    .add('active')
  },
  close(){
    //fechar o modal para
    //remocer a class active do madal

    //função javascript toggle para pesquisar
    document.querySelector('.modal-orvelay')
    .classList
    .remove('active')
  }
}

const transactions = [
  {
    id:1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021',
},
  {
    id:2,
    description: 'Crianção',
    amount: 500000,
    date: '23/01/2021',
},
  {
    id:3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021',
},
]

//Eu preciso somar as entradas
//depois eu preciso somar as saidas e
//remover das entrars o valor da saidas
//assim eu terei o total
const Transaction = {
  incomes(){
    let income = 0;

    transactions.forEach(transaction => {
      if( transaction.amount > 0 ) {
        income = income + transaction.amount;
      }
    })
    //Somar as entradas
    return income;
  },
  expenses(){
    let expenses = 0;

    transactions.forEach(transaction => {
      if( transaction.amount < 0 ) {
        expenses = expenses + transaction.amount;
      }
    })
    
    return expenses;
  },
  total(){
    // entradas - saidas
    return Transaction.incomes() + Transaction.expenses();
  }
}

// Eu preciso pegar as minha transação do meu
// objetos aqui no javascript
//e colocar la no HTML

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index){
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction){

    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
          <td class="description">${transaction.description}</td>
          <td class="${CSSclass}">${amount}</td>
          <td class="date">${transaction.date}</td>
          <td>
            <img src="./assets/minus.svg" alt="Remover Transação">
          </td>
    `
    return html
  },
  
  updateBalance() {
    document
    .getElementById('incomeDisplay')
    .innerHTML = Transaction.incomes()
    document
    .getElementById('expenseDisplay')
    .innerHTML = Transaction.expenses()
    document
    .getElementById('totalDisplay')
    .innerHTML = Transaction.total()
  }
}

const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-" : ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency:"BRL"
    })

    return signal + value
  }
}

transactions.forEach(function(transaction) {
  DOM.addTransaction(transaction)
})

DOM.updateBalance()