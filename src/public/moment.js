const moment= require('moment')

let time= document.querySelector(".timer-date")

time.textContent= moment().format()

