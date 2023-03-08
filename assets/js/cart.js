"use strict"
let sidebar = document.querySelector(".navarea");
let closeIcon = document.querySelector(".navarea .close");
let openIcon = document.querySelector(".navarea .open");


openIcon.addEventListener("click", function () {
    sidebar.classList.remove("hide");
    this.classList.add("d-none");
    closeIcon.classList.remove("d-none")
})

closeIcon.addEventListener("click", function () {
    sidebar.classList.add("hide");
    this.classList.add("d-none");
    openIcon.classList.remove("d-none")
})



let tableBody = document.querySelector("tbody");
let productAlert = document.querySelector(".alert-primary");
let totalPrice = document.querySelector(".total-price");
let products = JSON.parse(localStorage.getItem("basket"));




if (products != null) {
    products.forEach(product => {
        tableBody.innerHTML += `<tr>
        <td><img src="${product.image}" alt=""></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td class="product-count" data-id = ${product.id}>
    <span class="decrease" data-id="${product.id}">-</span>
    <span class="sync-count" data-id=${product.id}>${product.count}</span>
    <span class="increase" data-id="${product.id}">+</span>
    </td>
        <td><i data-id="${product.id}" class="remove fa-solid fa-trash-can"></i></td> 
        </tr>`
    });

}
else {
    tableBody.parentNode.classList.add("d-none");
    productAlert.classList.remove("d-none");
}


if (products != null) {
    getBasketCount(products);
}


function getBasketCount(arr) {
    let count = 0;
    for (const item of arr) {
        count += item.count
    }

    document.querySelector("sup").innerText = count;
}


let deleteButtons = document.querySelectorAll(".fa-trash-can");
for (const btn of deleteButtons) {
    btn.addEventListener("click", function () {
        this.parentNode.parentNode.remove()

        let deleteProduct = products.find(m => m.id == btn.getAttribute("data-id"))

        let deleteIndex = products.indexOf(deleteProduct)

        if (deleteIndex > -1) {
            products.splice(deleteIndex, 1)
        }

        localStorage.setItem("basket", JSON.stringify(products))

        totalPrice.innerText = `${getPrice(JSON.parse(localStorage.getItem("basker")))} $`

        productCount.innerText = getCartCount(JSON.parse(localStorage.getItem("basket")))
    })
}
















