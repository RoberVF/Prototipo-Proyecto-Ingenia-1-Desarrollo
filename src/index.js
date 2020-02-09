const express= require('express')
const app= express()
const path= require('path')

app.set('port', process.env.PORT || 5000)

app.set('views', path.join(__dirname + '/views'))

app.use(express.static(__dirname + '/public'))

app.use('html', require('ejs').renderFile)

app.use(require('./routes/index.js'))

app.listen(app.get('port'), ()=>{
    console.log("Server on port", app.get('port'))
})