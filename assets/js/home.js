"use strict"

let sidebar=document.querySelector(".navarea");

let closeIcon=document.querySelector(".navarea .close");

let openIcon=document.querySelector(".navarea .open");


openIcon.addEventListener("click",function(){
    sidebar.classList.remove("hide");
    this.classList.add("d-none");
    closeIcon.classList.remove("d-none")
})

closeIcon.addEventListener("click",function(){
    sidebar.classList.add("hide");
    this.classList.add("d-none");
    openIcon.classList.remove("d-none")
})



let basketBtn = document.querySelectorAll(".add-basket");

let basket = [];

if (JSON.parse(localStorage.getItem("basket")) != null) {
    basket=JSON.parse(localStorage.getItem("basket"))
}

basketBtn.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        let productPrice = this.parentNode.previousElementSibling.firstElementChild.innerText;
        let productName = this.parentNode.previousElementSibling.previousElementSibling.firstElementChild.innerText;
        let productImg = this.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.getAttribute("src");
        let productId = parseInt(this.closest(".card").getAttribute("data-id"));

        let existProduct = basket.find(m => m.id == productId);

        if (existProduct != undefined) {
            existProduct.count += 1;
        } else {
            basket.push({
                id: productId,
                name: productName,
                price: productPrice,
                image:productImg,
                count: 1
            })
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        getBasketCount(basket);

        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Added to cart',
            showConfirmButton: false,
            timer: 1500
          })
    })
});


getBasketCount(basket);


function getBasketCount(arr){
    let count=0;
    for (const item of arr) {
        count+=item.count        
    }

    document.querySelector("sup").innerText=count;
}