const inputField = document.querySelector("[name=name]");

function renderCards(response) {
  const cardArray = response.cards;
  let htmlTemplate = "";
  for (let card of cardArray) {
    htmlTemplate += `
      <div class="card">
        <h4>${card.name}</h4>
        <img src="${card.imageUrl}" alt="${card.name}" />
      </div>
    `;
  }
  const cardsContainer = document.querySelector(".js-cards-container");
  cardsContainer.innerHTML = htmlTemplate;
}

function loadCards(event) {
  event.preventDefault();
  const searchExpression = inputField.value;
  inputField.value = "";
  let API_URL = `https://api.magicthegathering.io/v1/cards`;

  if (searchExpression.length > 0) {
    API_URL += `?name=${searchExpression}`;
  }
  fetch(API_URL)
    .then((data) => data.json())
    .then(renderCards);
}

const form = document.querySelector(".js-search-form");
form.addEventListener("submit", loadCards);