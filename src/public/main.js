window.addEventListener('load', ()=>{
    
    let long
    let lat
    let temperatureDegree= document.querySelector(".temperature-degree")
    let windVelocity= document.querySelector(".wind-speed-data")
    let body= document.getElementById('body')
    let debugTemperature = 0


    
    // 'linear-gradient(rgb(47,150,163), rgb(48,62,143))';

    
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lat= position.coords.latitude
            long= position.coords.longitude
            
            const proxy= 'https://cors-anywhere.herokuapp.com/'
            const api= `${proxy}https://api.darksky.net/forecast/ee47675ad544ee50e609340bdd9c337d/${lat},${long}`
            
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    const {temperature, icon, windSpeed} = data.currently //data.currently.temperature
                    
                    //Elementos del API
                    let celcius= (temperature - 32)*5/9
                    
                    temperatureDegree.textContent = Math.round(celcius)
                    windVelocity.textContent= Math.round(windSpeed)


                    //Iconos
                    setIcons(icon, document.querySelector(".icon"))

                    //Debug
                    function handleSlider(){
                        debugTemperature= slider.value 
                        updateStatus()
                        console.log(debugTemperature)
                    }
                    function updateStatus(){
                        let buenTiempoVerde= '#42A93C'
                        let medioTiempoCalorNaranja= '#C49420'
                        let malTiempoCalorRojo= '#D0441A'
                        let muyMalTiempoCalorVioleta= '#410F88'
                        let medioTiempoFrioGris= '#7E7676'
                        if(debugTemperature <= 9){
                            body.style.backgroundColor= medioTiempoFrioGris
                        } else if(debugTemperature <= 17 ){
                            body.style.backgroundColor= buenTiempoVerde
                        } else if(debugTemperature <= 23){
                            body.style.backgroundColor= medioTiempoCalorNaranja
                        } else if(debugTemperature <= 30){
                            body.style.backgroundColor= malTiempoCalorRojo
                        } else if(debugTemperature >= 31){
                            body.style.backgroundColor= muyMalTiempoCalorVioleta
                        }

                    }
                    let slider= document.querySelector('#slider')
                    slider.addEventListener('input', handleSlider)



                    //Background
                    /*
                    let buenTiempoVerde= '#42A93C'
                    let medioTiempoCalorNaranja= '#C49420'
                    let malTiempoCalorRojo= '#D0441A'
                    let muyMalTiempoCalorVioleta= '#410F88'
                    let medioTiempoFrioGris= '#7E7676'
                    if(celcius <= 9){
                        body.style.backgroundColor= medioTiempoFrioGris
                    } else if(celcius <= 17 ){
                        body.style.backgroundColor= buenTiempoVerde
                    } else if(celcius <= 23){
                        body.style.backgroundColor= medioTiempoCalorNaranja
                    } else if(celcius <= 30){
                        body.style.backgroundColor= malTiempoCalorRojo
                    } else if(celcius >= 31){
                        body.style.backgroundColor= muyMalTiempoCalorVioleta
                    }
                    */
                })
            })
    }

    function setIcons(icon, iconID){
        const skycons= new Skycons({color: "white"})
        const iconoActual= icon.replace(/-/g, "_").toUpperCase() //Reemplazar "-" por "_"
        skycons.play()
        return skycons.set(iconID, Skycons[iconoActual])
    }
})