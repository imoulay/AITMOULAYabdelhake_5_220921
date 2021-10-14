
function panier() {
    let panier = JSON.parse(localStorage.getItem('panier'));
    let totalPrice = 0;
    let totalArticle = 0;
    for(product of panier) {
        let nbArticle = product.nbArticle;
        totalArticle += product.nbArticle;
        const api = "http://localhost:3000/api/products";
        const urlProduct = `${api}/${product.id}`;
        fetch(urlProduct)
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
        })
        .then((values) => {
            totalPrice += Number(nbArticle) * Number(values.price);
            document.querySelector(
            "#cart__items"
            ).innerHTML += `<article class="cart__item" data-id="${values._id}">
                    <div class="cart__item__img">
                    <img src="${values.imageUrl}" alt="${values.altTxt}">
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${values.name}</h2>
                        <p>${values.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${nbArticle}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                    </div>
                </article>`;
                document.querySelector("#totalQuantity").innerHTML = `${totalArticle}`;
                document.querySelector("#totalPrice").innerHTML = `${totalPrice}`;
            
        })
        .catch((err) => {});
    };
}

panier();

const deleteBtn = document.querySelector(
  "#cart__items > article:nth-child(3) > div.cart__item__content > div.cart__item__content__settings > div.cart__item__content__settings__delete > p"
);
console.log(deleteBtn);
//deleteBtn.addEventListener("click", function () {});
