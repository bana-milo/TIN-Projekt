const offers = [
    {
        title: "Adaś",
        price: "30,5 zł",
        content: "Przemiły chomik",
        image: "https://www.rvc.ac.uk/Media/Default/Press%20Release/gibby_and_blue_flowers_1_-_Lisa_Haycock-fixed.jpg"
    },
    {
        title: "Czażysty", 
        price: "32,5 zł",
        content: "Pełen miłości i włosów",
        image: "https://supertails.com/cdn/shop/articles/360_f_681163919_71bp2aiyziip3l4j5mbphdxtipdtm2zh_e2c1dbbd-e3b0-4c7d-bc09-1ebff39513ef.jpg?v=1747293323"
    },
    {
        title: "Belzefer Korneliusz VII",
        price: "4431,0 zł",
        content: "Pochodzący z szlacheckiego rodu chomików Roborowskiego",
        image: "https://blog.omlet.us/wp-content/uploads/sites/6/2023/04/Hamster-laying-down-on-the-counter-scaled.jpg"
    },
    {
        title: "Patrycja",
        price: "22,5 zł",
        content: "Kochana pchełka miłości",
        image: "https://pet-health-content-media.chewy.com/wp-content/uploads/2025/10/13224248/Do_Hamsters_Like_to_Be_Picked_Up.jpg"
    },
    {
        title: "Vin Disel",
        price: "35,5 zł",
        content: "Ciężko znaleźć chomika bardziej pałnego zamiłowania do biegania w kole.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hamster.jpg/1280px-Hamster.jpg"
    }
];

const offersContainer = document.getElementById("offers");
const form = document.getElementById("form");
const Btn = document.getElementById("add-offer-button");
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const contentInput = document.getElementById("content");
const imageInput = document.getElementById("image");

const previewImg = document.createElement("img");
previewImg.style.cssText = `
    max-width: 100%; 
    max-height: 200px; 
    border-radius: 6px; 
    margin-top: 10px;
    display: none;
`;
form.appendChild(previewImg);

imageInput.addEventListener("change", function() {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.style.display = "block";
        };
        reader.readAsDataURL(this.files[0]);
    } else {
        previewImg.style.display = "none";
    }
});

function renderOffers() {
    offersContainer.innerHTML = "";

    offers.forEach(offer => {
        const article = document.createElement("article");
        article.classList.add("offer");

        let imageHtml = "";
        if (offer.image) {
            imageHtml = `<img src="${offer.image}" alt="${offer.title}">`;
        }

        article.innerHTML = `
            <div class="offer-header">
                <h2 class="title">${offer.title}</h2>
                <h2 class="price">${offer.price}</h2>
            </div>
            ${imageHtml}
            <p>${offer.content}</p>
            <button class="buy-button" onclick="window.location.href='kup.html'">Kup teraz!</button>
        `;

        offersContainer.appendChild(article);
    });
}

Btn.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
});

form.addEventListener("submit", e => {
    e.preventDefault();

    const newOffer = {
        title: titleInput.value,
        price: priceInput.value,
        content: contentInput.value,
        image: null
    };

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
            newOffer.image = event.target.result;
            offers.unshift(newOffer);
            renderOffers();
            resetForm();
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        offers.unshift(newOffer);
        renderOffers();
        resetForm();
    }
});

function resetForm() {
    titleInput.value = "";
    priceInput.value = "";
    contentInput.value = "";
    imageInput.value = "";
    previewImg.style.display = "none";
    form.style.display = "none";
}

renderOffers();
