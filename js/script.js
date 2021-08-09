(function () {
  'use strict'

  const calc = document.getElementById('calculator')
  const calcScreen = document.getElementById('src')
  calcScreen.value = 0
  let n1 = ['0']
  let n2 = 0
  let op = null
  let lastop = null
  let result = 0

  const add = (n, o) => n + o
  const sub = (n, o) => n - o
  const div = (n, o) => n / o
  const mul = (n, o) => n * o
  const res = n => n

  const cal = (num1, num2, calback) => {
    if (typeof calback === 'function') {
      return calback(num1, num2)
    }
  }

  const cals = {
    '/': div,
    '*': mul,
    '+': add,
    '-': sub,
    '=': res
  }

  const btn = e => {
    if (
      !e.target.matches('input') ||
            e.target.id === 'src' ||
            e.target.id === 'esound'
    ) {
      return false
    }

    if (e.target.dataset.num) {
      (n1[0] === '0' && n1[1] !== '.' && !!(n1.length = 0)) ||
            n1.push(e.target.value)
    }

    op = null

    if (e.target.dataset.fun) {
      op = e.target.value
    }

    if (op === '⌫') {
      n1 = result
        .toString(10)
        .substring(0, 15)
        .replace(/[^0-9]/g, '.')
        .split('')
      result = 0
      lastop = null
      n1.pop()
    }

    if (!n1.length) {
      n1 = ['0']
    }

    if (op === ',' && !n1.includes('.')) {
      n1.push('.')
    }

    result = n1.join('')

    if (
      op === '/' ||
            op === '*' ||
            op === '+' ||
            op === '-' ||
            op === '='
    ) {
      n1.length = 0

      if (n2 && lastop) {
        result = ((parseFloat(n2) % 1 !== 0) && (parseFloat(result) % 1 !== 0)) ? (cal((parseFloat(n2) % 1 !== 0) ? parseFloat(n2) * 10 : parseFloat(n2), (parseFloat(result) % 1 !== 0) ? parseFloat(result) * 10 : parseFloat(result), cals[lastop]) / 10) : cal(parseFloat(n2), parseFloat(result), cals[lastop])
      }

      n2 = result
      lastop = res(op)
    }

    if (!isFinite(result)) {
      calcScreen.value = 'Ooops!'
      return
    }

    if (op === 'C') {
      n1.length = 0
      n2 = 0
      result = 0
      calcScreen.value = '0'
    }

    calcScreen.value = result

    if (document.getElementById('esound').checked) {
      sound()
    }
  }

  calc.addEventListener('click', btn, true)
  const snd = new window.Audio(
    'data:audio/mp3;base64,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'
  )

  function sound () {
    snd.play()
    window.navigator.vibrate(30)
  }
})()
