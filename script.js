const main = document.querySelectorAll(".main")
const inputs = document.querySelectorAll("input")
const buttons = document.querySelectorAll("button")
const textarea = document.querySelector("textarea")
const nuotrauka = document.querySelector(".nuotrauka")
const listasIgridientu = document.querySelector(".listasIngridientu")
const perspejimas = document.querySelector("h4")
const perspejimas2 = document.querySelector("h5")
const clear = document.querySelector(".clear")


let ingredients = []
let image =""
let item ={}
let recipeList = []
let source =""

function appendHtml(item) {

    main[1].innerHTML = `
    <div class="d-flex">
            <div class="space">
                <img  class="nuotrauka p10" src="${item.image}" alt="">
            </div>
        <div>
            <h2>Title:${item.title}</h2>
            <p>Description: ${item.description}</p>
        </div>
    </div>
    <div class="produktai mt10">Ingredients: 
        <div class="ingredients mt10">${item.ingredient}</div>
    </div>
    <div>Calories: ${item.calories}</div>
    <div class="d-flex flex-column a-center mt10 gap">
        <button class="addRecipe">Add recipe to list</button>
        <button class="clear2">Clear</button>
    </div>
    </div>
    `
    source = item.image

    const clear2 = document.querySelector(".clear2")
    clear2.onclick =()=> {
        window.location.reload()
    }
    const addRecipe = document.querySelector(".addRecipe")

    addRecipe.onclick =()=>{

        if (image !== source){
            perspejimas.style.color = "red"
            perspejimas.innerHTML = `Image wasn't updated. Please choose image and push "Update info" and then "Add recipe to list"`
            return
        }

        if (ingredients.length >= 3 && image){
           perspejimas2.innerHTML = ``
            recipeList.push(item)
            addRecipes(item)
            perspejimas.style.color = "green"
            perspejimas.innerHTML = `SUPER. Added to all recipes`
            main[1].innerHTML = `
             <div class="d-flex">
                <div class="space">
                    <img class="nuotrauka p10" src="https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg" alt="">
                </div>
                <div>
                    <h2>Title: </h2>
                    <p>Description: </p>
                </div>
            </div>
            <div class="produktai mt10">Ingredients:
                <div class="ingredients mt10"></div>
            </div>
            <div>Calories: </div>
            <div class="d-flex flex-column a-center mt10 gap">
                <button>Add recipe to list</button>
                <button class="clear">Clear preview</button>

            </div>
            `
            image =""
            inputs[0].value = ""
            inputs[1].value = ""
            textarea.value = ""
            inputs[2].value = ""
            ingredients = []
            listasIgridientu.innerHTML =``
            console.log(ingredients)




        } else {
            perspejimas.style.color = "red"
            perspejimas.innerHTML = `Ingredients must be at least 3 or missing photo`

        }

    }


}

function addRecipes(obj){
    console.log(obj)

    let localKey = localStorage.getItem("receptas")
    if(localKey) {
        localKey = JSON.parse(localKey)
        if (localKey.find(pav => pav.title === obj.title)) return
        localKey.push(obj)
        console.log(localKey)
        localStorage.setItem("receptas", JSON.stringify(localKey))
    } else {
        localStorage.setItem("receptas", JSON.stringify(recipeList))
    }
}


buttons[0].onclick =()=>{
        ingredient =" " + inputs[1].value
        if (!inputs[1].value) return
        if (ingredients.find(product => product === ingredient)) return
        ingredients.push(ingredient)
        listasIgridientu.innerHTML +=`
            <span>${ingredient}</span>
        `
        inputs[1].value = ""

    }

buttons[1].onclick =(event)=>{
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => res.json())
    .then(data => {
        if (!image) {
            nuotrauka.src = data.meals[0].strMealThumb
            image = data.meals[0].strMealThumb
            source = event.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[0].src
            event.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[0].src = data.meals[0].strMealThumb

        } else {
            event.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[0].src = data.meals[0].strMealThumb
            image = data.meals[0].strMealThumb

        }

    })
}

buttons[2].onclick =()=>{
    item = {
        title: inputs[0].value,
        ingredient: ingredients,
        description: textarea.value,
        calories: Number(inputs[2].value),
        image: image
    }

    if (!item.title || !item.description || !item.calories) {
        perspejimas.style.color = "red"
        perspejimas.innerHTML = `Title, description and calories must be`
        return
    } else {
        perspejimas.innerHTML = ``
        appendHtml(item)
        console.log(ingredients)


    }


}

clear.onclick =()=>{
    window.location.reload()
}



