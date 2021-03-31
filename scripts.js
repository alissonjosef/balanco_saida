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
//Eu preciso somar as entradas
//depois eu preciso somar as saidas e
//remover das entrars o valor da saidas
//assim eu terei o total

const Storage = {
  get () {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  },

    set (transactions) {
      localStorage.setItem("dev.finances:transactions",
      JSON.stringify(transactions))
}


}

const Transaction = {
  all: Storage.get(),
  add(transaction){
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  incomes(){
    let income = 0;

    Transaction.all.forEach(transaction => {
      if( transaction.amount > 0 ) {
        income = income + transaction.amount;
      }
    })
    //Somar as entradas
    return income;
  },

  expenses(){
    let expenses = 0;

    Transaction.all.forEach(transaction => {
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
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)

  },
  innerHTMLTransaction(transaction, index){

    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
          <td class="description">${transaction.description}</td>
          <td class="${CSSclass}">${amount}</td>
          <td class="date">${transaction.date}</td>
          <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transação">
          </td>
    `
    return html
  },
  
  updateBalance() {
    document
    .getElementById('incomeDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
    .getElementById('expenseDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
    .getElementById('totalDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.total())
  },
  clearTransactions(){
    DOM.transactionsContainer.innerHTML = ""
  }
}

const Utils = {
  formatAmout(value){
    value = Number(value) * 100

    return value
  },

  formatDate(date){
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

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

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues(){
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value

    }
  },
  validateFields(){
    const {description, amount, date} = Form.getValues()
    if(
      description.trim() ==="" ||
    amount.trim() ==="" ||
    date.trim() ==="" ){
        throw new Error("Por favor, preencha todos os campos")
    }
  },

  formatValues(){
    let {description, amount, date} = Form.getValues()

    amount = Utils.formatAmout(amount)

    date = Utils.formatDate(date)

    console.log(date)

    return {
      description,
      amount,
      date
    }
  },

  saveTransaction(transaction){
    Transaction.add(transaction)
  },

  clearFileds(){
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },

  submit(event){
    event.preventDefault()


    try {
      Form.validateFields()

      const transaction = Form.formatValues()

      Form.saveTransaction(transaction)

      Form.clearFileds()

      Modal.close()

    } catch (error) {
      alert(error.message)
    }

  }
}


const App = {
  init(){

    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index)
    })
    
    DOM.updateBalance()

    Storage.set(Transaction.all)
    
  },
  reload(){
    DOM.clearTransactions()
    App.init()
  },
}

App.init()

