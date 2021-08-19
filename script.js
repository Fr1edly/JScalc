//Here's our output
const output = document.querySelector('output') 

//Creating a keyboard using a script
const div = document.createElement('div')
div.classList.add('keyboard')
document.querySelector('.calculator').appendChild(div)

//An array of buttons for the keyboard
'C CE % / 7 8 9 * 4 5 6 - 1 2 3 + 0 ( ) ='.split(' ')
//i split them and use this for create a button
.map(sybol =>{
    div.insertAdjacentHTML('beforeend', `<button value="${symbol}">${symbol}</button>`)
})
//------------------------------------