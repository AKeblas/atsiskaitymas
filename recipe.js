const container = document.querySelector(".container")
const btn = document.querySelectorAll("button")
const inputs = document.querySelectorAll("input")

let recipes = JSON.parse(localStorage.getItem("receptas"))

function getRecipes(arr){
    arr.map(data => {
       container.innerHTML +=`
       <div class="box d-flex flex-column p10 gap">
            <img src="${data.image}" alt="">
            <div>Title: ${data.title}</div>
            <div>Description: ${data.description}</div>
            <div>Ingredients: ${data.ingredient}</div>
            <div>Calories: ${data.calories}</div>
        </div>
        `
    })
}

getRecipes(recipes)

btn[0].onclick =()=>{
    const values = {
        title: inputs[0].value.trim().toLowerCase(),
        ingredients: inputs[1].value.toLowerCase(),
        calories: Number(inputs[2].value)
    }

    container.innerHTML =``
    console.log(recipes)


    let result = recipes

    if(inputs[0].value) result = recipes.filter(item => item.title === values.title)
    if(inputs[1].value) result = result.filter(item => item.ingredient.includes(" " + inputs[1].value.trim().toLowerCase()))
    if(inputs[2].value) result = result.filter(item => item.calories === values.calories)
    getRecipes(result)
}

btn[1].onclick =()=>{
    inputs[0].value = ""
    inputs[1].value = ""
    inputs[2].value = ""
    container.innerHTML =``
    getRecipes(recipes)

}