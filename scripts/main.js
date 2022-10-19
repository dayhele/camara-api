const loadingElement = document.querySelector("#loading");
const selectElement = document.querySelector("#politicalSelect");
const lawmakersListElement = document.querySelector("#lawmakers-list");

const camaraAPI = "https://dadosabertos.camara.leg.br/api/v2";

const getAllPoliticalParty = () => {
  toggleLoading(true);

  return fetch(`${camaraAPI}/partidos`)
    .then((response) => response.json())
    .then((response) => {
      toggleLoading(false);
      setPoliticalPartySelect(response.dados);
    });
};

const setPoliticalPartySelect = (politicalPartyList) => {
  politicalPartyList.map((party) => {
    const option = document.createElement("option");
    option.textContent = party.sigla;
    option.value = party.id;

    selectElement.appendChild(option);
  });
};

const getLawmakers = (politicalPartyId) => {
  toggleLoading(true);

  return fetch(`${camaraAPI}/partidos/${politicalPartyId}/membros`)
    .then((response) => response.json())
    .then((response) => {
      toggleLoading(false);
      renderLawmakersList(response.dados);
    });
};

const renderLawmakersList = (laymakersList) => {
  lawmakersListElement.innerHTML = "";

  laymakersList.map((laymaker) => {
    lawmakersListElement.innerHTML += getLawmakerCardElement(laymaker);
  });
};

const onPoliticalSelectionChange = (politicalPartyId) => {
  getLawmakers(politicalPartyId.value);
};

const toggleLoading = (status) => {
  const displayStatus = status ? "flex" : "none";

  loadingElement.style.display = displayStatus;
};

const getLawmakerCardElement = (cardData) => {
  return `
    <div class="member-card">
      <h3 class="member-name">${cardData.nome}</h3>
      <p>${cardData.siglaPartido}<p/>
      <img src="${cardData.urlFoto}" alt="Foto do parlamentar">
    </div>
  `;
};

getAllPoliticalParty();