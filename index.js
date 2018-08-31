let pageNumber = 1

document.addEventListener("DOMContentLoaded", function(){
  getFiftyFetch(),
  document.querySelector('#forward').addEventListener('click', handleForward),
  document.querySelector('#back').addEventListener('click', handleBack),
  document.querySelector('#monster-form').addEventListener('submit', handleSubmit)
})

//1.When the page loads, make a GET fetch request and render 50 monsters to the page.
function getFiftyFetch() {
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(monster => render(monster))
  })
}

function render(monster) {
  let divElement = document.createElement('div')
  let h2Element = document.createElement('h2')
  let h4Element = document.createElement('h4')
  let pElement = document.createElement('p')
  divElement.appendChild(h2Element)
  divElement.appendChild(h4Element)
  divElement.appendChild(pElement)
  h2Element.innerHTML = monster.name
  h4Element.innerHTML = `Age: ${monster.age}`
  pElement.innerHTML = `Bio: ${monster.description}`
  document.querySelector('#monster-container').appendChild(divElement)
}

//2.When the user clicks the forward arrow, make a GET fetch request and show next 50 monsters.
function handleForward() {
  pageNumber++
  document.querySelector('#monster-container').innerHTML = ""
  getFiftyFetch()
}

//3. When the user clicks the back arrow, make a GET fetch request and show pervious 50 monsters.
function handleBack() {
  pageNumber--
  document.querySelector('#monster-container').innerHTML = ""
  getFiftyFetch()
}

//4. When the user submits the new monster form, make a POST fetch request and render the monster to the page.
function handleSubmit(event){
  event.preventDefault()
  postFetch()
  event.currentTarget.reset()
}

function postFetch(){
  let monsterName = document.querySelector('#name').value
  let monsterAge = document.querySelector('#age').value
  let monsterDescription = document.querySelector('#description').value
  let data = {name: monsterName, age: monsterAge, description: monsterDescription}
  fetch('http://localhost:3000/monsters', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(jsonData => {
    render(jsonData)
  })
}
