console.log("Client side javascript file is loaded!")

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const img = document.querySelector('img')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    
    const location = search.value
    img.src="../img/loader.gif"
    messageOne.textContent = ""
    messageTwo.textContent =""
    messageThree.textContent =""
    messageFour.textContent =""

    fetch('http://localhost:3000/weather?address='+location).then((response) =>
    {
        response.json().then((data) =>{
            if(data.error)
            {
                img.src=""
                messageOne.textContent=data.error
                //console.log(data.error)
            }
            else {
                img.src=""
                messageOne.textContent="Location: " + data.location
                messageTwo.textContent="Weather Description: " + data.weather_description
                messageThree.textContent="Temperature  :" + data.temp
                messageFour.textContent="It feels like : " + data.feelslike
                // console.log(data.location)
                // console.log(data.weather_description)
            }
            
        })
    })
    console.log(location)
})




