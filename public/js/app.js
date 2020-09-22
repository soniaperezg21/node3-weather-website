console.log('Client side javascript file is loaded');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const MessageOne = document.querySelector('#message-1')
const MessageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  //Prevent que se haga el submit
    const location = search.value
    MessageOne.textContent = 'Loading...'
    MessageTwo.textContent = ''

    //para enviar una página y then run this function
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) =>  {
            if (data.error){
                MessageOne.textContent = data.error
            } else {
                MessageOne.textContent = data.location
                MessageTwo.textContent = data.forecast
            }
        })
    })  
})
