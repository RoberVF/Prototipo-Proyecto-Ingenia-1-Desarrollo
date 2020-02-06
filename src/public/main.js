window.addEventListener('load', ()=>{
    let long
    let lat
    let temperatureDegree= document.querySelector(".temperature-degree")
    let windVelocity= document.querySelector(".wind-speed-data")

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

                })
            })
    }

    function setIcons(icon, iconID){
        const skycons= new Skycons({color: "white"})
        const currentIcon= icon.replace(/-/g, "_").toUpperCase() //Reemplazar "-" por "_"
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
})