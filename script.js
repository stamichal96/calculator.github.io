const numButtons = document.querySelectorAll('[data-number]')
const opeButtons = document.querySelectorAll('[data-ope]')
const equButton = document.querySelector('[data-equ]')
const delButton = document.querySelector('[data-del]')
const cleButton = document.querySelector('[data-clear]')
const preText = document.querySelector('[data-pre-op]')
const curText = document.querySelector('[data-cur-op]')

class Calculator {
  constructor(preText, curText) {
    this.preText = preText
    this.curText = curText
    this.clear()
  }

  clear() {
    this.curOp = ''
    this.preOp = ''
    this.operation = undefined
  }

  delete() {
    this.curOp = this.curOp.toString().slice(0, -1)
  }

  appNumber(number) {
    if (number === '.' && this.curOp.includes('.')) return
    this.curOp = this.curOp.toString() + number.toString()
  }

  choOpe(operation) {
    if (this.curOp === '') return
    if (this.preOp !== '') {
      this.compute()
    }
    this.operation = operation
    this.preOp = this.curOp
    this.curOp = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.preOp)
    const current = parseFloat(this.curOp)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.curOp = computation
    this.operation = undefined
    this.preOp = ''
  }

  getDisNum(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  upDis() {
    this.curText.innerText =
      this.getDisNum(this.curOp)
    if (this.operation != null) {
      this.preText.innerText =
        `${this.getDisNum(this.preOp)} ${this.operation}`
    } else {
      this.preText.innerText = ''
    }
  }
}

const calculator = new Calculator(preText, curText)

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appNumber(button.innerText)
    calculator.upDis()
  })
})

opeButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.choOpe(button.innerText)
    calculator.upDis()
  })
})

equButton.addEventListener('click', button => {
  calculator.compute()
  calculator.upDis()
})

cleButton.addEventListener('click', button => {
  calculator.clear()
  calculator.upDis()
})

delButton.addEventListener('click', button => {
  calculator.delete()
  calculator.upDis()
})