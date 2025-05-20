const apiKey = "ec992a6acfbe48fdb4e80411242510";
const baseUrl =
  "http://api.weatherapi.com/v1/current.json?key=ec992a6acfbe48fdb4e80411242510&q=";
const requestParameter = "q";

function getInputValue() {
  let inputValue = document.getElementById("inputCity").value;
  let requestURL = baseUrl + inputValue;
  return requestURL;
}

function getWeatherDataForCitiy() {
  let requestURL = getInputValue();

  fetch(requestURL, {
    method: "GET",
    headers: {
      /*  Authorization: `Bearer ${apiKey}`, */
      "Content-Type": `application/json`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.location.name);
      let dataContainer = document.getElementById("dataContainer");
      let card = document.createElement("div");
      let cardHeader = document.createElement("div");
      let cardBody = document.createElement("div");

      const tailwindClassesCard = [
        "bg-blue-200",
        "shadow-md",
        "rounded-md",
        "p-10",
        "flex",
        "flex-col",
        "gap-2",
        "justify-start",
        "transition-colors",
        "duration-[500ms]",
        "hover:bg-blue-400",
      ];

      const tailwindClassesBody = ["flex", "flex-row", "justify-between"];

      card.classList.add(...tailwindClassesCard);
      cardBody.classList.add(...tailwindClassesBody);

      cardHeader.innerHTML = `<p class='text-3xl mb-2'>${data.location.name}</p>`;
      cardBody.innerHTML = `<div>
                            <p class='font-bold'>${data.current.temp_c}</p>
                            <p class='text-gray-800'>${data.current.condition.text}</p>
                            </div>
                            <div>
                            <img src='//cdn.weatherapi.com/weather/64x64/day/176.png'/>
                            </div>`;

      card.appendChild(cardHeader);
      card.appendChild(cardBody);

      dataContainer.appendChild(card);
    })
    .catch((error) => {
      console.error("API-Fehler:", error);
    });
}
