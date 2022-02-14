
//Here's our output
let request = new XMLHttpRequest()
let reqfail = new XMLHttpRequest()
reqfail.open('POST', '/fail', true)
reqfail.setRequestHeader('Content-Type', 'application/json')

request.open('POST', '/log', true)
request.setRequestHeader('Content-Type', 'application/json')

const output = document.querySelector('output') 
const equat = document.querySelectorAll('output')
//Creating a keyboard using a script
const div = document.createElement('div')
div.classList.add('keyboard')
document.querySelector('.calculator').appendChild(div)

//An array of buttons for the keyboard
'C CE % / 7 8 9 * 4 5 6 - 1 2 3 + 0 ( ) ='.split(' ')
//i split them and use this for create a button
    .map(symbol =>{
        div.insertAdjacentHTML('beforeend', `<button value="${symbol}">${symbol}</button>`)
    })
//------------------------------------
//Add event for click on button
document.querySelectorAll('button').forEach(button =>{
    button.addEventListener('click', function(){
        calc(this.value)
    })
})
//-------------------------------------

//Add keyboard input
document.addEventListener('keydown', event =>{
    if((event.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Enter/)) calc(event.key)
})
//-------------------------------------

function calc(value){
    if(value.match(/=|Enter/)){
        try{
            equat.item(1).textContent = output.textContent +'='
            //calculation
            console.log("inputed value: "+output.textContent)
            output.textContent = math.evaluate(output.textContent)
            request.open('POST', '/log', true)
            request.setRequestHeader('Content-Type', 'application/json')
            request.send(JSON.stringify({data: equat.item(1).textContent, value: equat.item(0).textContent}))
        }
        catch{ 
            reqfail.open('POST', '/fail', true)    
            reqfail.setRequestHeader('Content-Type', 'application/json')
            reqfail.send(JSON.stringify({data: equat.item(1).textContent, value: 'fail'}))
            let oldVal = output.textContent
            let newVal = 'Invalid data'
            output.textContent = newVal
            setTimeout(()=>{
                output.textContent =oldVal
            }, 1500)
           
        }
        
    }else if (value === 'C'){
        output.textContent = ''
        equat.item(1).textContent = ''
    }else if(value.match(/CE|Backspace/)){
        output.textContent = output.textContent.substring(0,output.textContent.length-1)
    }else if(output.textContent == 'NaN'){
        setTimeout(()=>{
            output.textContent =''
        }, 1500)
    }else if(value.match(/F/)){
    
    }else{
        output.textContent+=value
    }
}
