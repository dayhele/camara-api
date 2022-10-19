const camaraAPI = "https://dadosabertos.camara.leg.br/api/v2";

const getAllPoliticalParty = () => {
  return fetch(`${camaraAPI}/partidos`)
    .then((response) => response.json())
    .then((response) => setPoliticalPartySelect(response.dados));
};

const setPoliticalPartySelect = (politicalPartyList) => {
  console.log(politicalPartyList);
  const selectElement = document.querySelector("#politicalSelect");

  politicalPartyList.map((party) => {
    const option = document.createElement("option");
    option.textContent = party.sigla;
    option.value = party.id;
    option.onchange = onPoliticalSelectionChange(party.id);

    selectElement.appendChild(option);
  });
};

const onPoliticalSelectionChange = (politicalPartyId) => {
  console.log(politicalPartyId);
};

getAllPoliticalParty();
