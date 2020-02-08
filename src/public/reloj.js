function mueveReloj(){
    momentoActual = new Date()
    hora = momentoActual.getHours()
    minuto = momentoActual.getMinutes().toString().padStart(2, '00')
    segundo = momentoActual.getSeconds().toString().padStart(2, '00')

    horaImprimible = hora + " : " + minuto + " : " + segundo

    document.form_reloj.reloj.value = horaImprimible

    setTimeout("mueveReloj()",1000)
}