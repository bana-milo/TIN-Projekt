const offers = [
    {
        title: "Adaś",
        price: "30,5 zł",
        content: "Przemiły chomik",
        image: "https://picsum.photos/seed/adas/400/300.jpg"
    },
    {
        title: "Czażysty", 
        price: "32,5 zł",
        content: "Pełen miłości i włosów",
        image: "https://picsum.photos/seed/czazysty/400/300.jpg"
    },
    {
        title: "Belzefer Korneliusz VII",
        price: "4431,0 zł",
        content: "Pochodzący z szlacheckiego rodu chomików Roborowskiego",
        image: "https://picsum.photos/seed/belzefer/400/300.jpg"
    },
    {
        title: "Patrycja",
        price: "22,5 zł",
        content: "Kochana pchełka miłości",
        image: "https://picsum.photos/seed/patrycja/400/300.jpg"
    },
    {
        title: "Vin Disel",
        price: "35,5 zł",
        content: "Ciężko znaleźć chomika bardziej pałnego zamiłowania do biegania w kole.",
        image: "https://picsum.photos/seed/vindisel/400/300.jpg"
    }
];

const offersContainer = document.getElementById("offers");
const form = document.getElementById("form");
const Btn = document.getElementById("button");
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const contentInput = document.getElementById("content");
const imageInput = document.getElementById("image");

// Podgląd zdjęcia w formularzu
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
    offerContainer.innerHTML = "";

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

    // Obsługa zdjęcia (asynchronicznie)
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
        // Bez zdjęcia
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

