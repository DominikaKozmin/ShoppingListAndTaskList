let list;
let shoppingTable = [
    "Mleko",
    "Jajka",
    "Sok",
    "Cukier",
    "Winogrono"
];

let productForm;
let inputError;

document.addEventListener('DOMContentLoaded', ()=>{
    list = document.getElementById('shoppingList');
    productForm = document.getElementById('productForm');
    inputError = document.getElementById('inputError');

    productForm.addEventListener('submit', (event)=>{
        event.preventDefault();

        if (event.target.elements[0].value.length > 2 && !event.target.elements[0].value.startsWith(' ')) {
            addItem(event.target.elements[0].value);
            event.target.elements[0].value = "";
            event.target.elements[0].classList.remove('inputDanger');
            inputError.innerText = " ";
        }else {
            inputError.innerText = "Nazwa nie spełnia kryteriów!";
            event.target.elements[0].classList.add('inputDanger');
        }

    })

    for (let product of shoppingTable) {
        addItem(product);
    }
})


function addItem(product) {
    let element = document.createElement('li');
    list.appendChild(element);
    element.innerText = product;
}
