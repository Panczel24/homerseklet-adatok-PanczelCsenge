import type { Homerseklet } from './Homerseklet';
import './style.css';

const api = "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json";

let adatok: Homerseklet[] = [];

document.addEventListener("DOMContentLoaded", ()=> {

  const homersekletForm = document.getElementById("homersekletForm") as HTMLFormElement;
  const homersekletInput = document.getElementById("homerseklet") as HTMLInputElement;
  const homersekletTabla = document.getElementById("homersekletTabla") as HTMLTableSectionElement;
  const exportButton = document.getElementById("exportButton") as HTMLButtonElement;
  const exportText = document.getElementById("exportText") as HTMLTextAreaElement;


  homersekletForm.addEventListener("submit",  (e)=> {

    e.preventDefault();

    const homerseklet = parseInt(homersekletInput.value);

    const datum = new Date();

    const napok = [
      "Vasárnap",
      "Hétfő",
      "Kedd",
      "Szerda",
      "Csütörtök",
      "Péntek",
      "Szombat"
    ];

    const day = napok[datum.getDay()];

    const ujAdat: Homerseklet = {
      day: day,
      temperature: homerseklet
    };

    adatok.push(ujAdat);

    displayData();

    homersekletForm.reset();
  });


  async function loadData() {

    const response = await fetch(api);
    const data = await response.json();

    adatok = data;

    displayData();
  }


  function displayData() {

    homersekletTabla.innerHTML = "";

    for (let i = 0; i < adatok.length; i++) {

      const sor = document.createElement("tr");

      const napTd = document.createElement("td");
      napTd.textContent = adatok[i].day;

      const homersekletTd = document.createElement("td");
      homersekletTd.textContent = adatok[i].temperature + " °C";

      sor.appendChild(napTd);
      sor.appendChild(homersekletTd);

      if (adatok[i].temperature < 10) {
        sor.classList.add("hideg");
      }

      if (adatok[i].temperature >= 30) {
        sor.classList.add("meleg");
      }

      homersekletTabla.appendChild(sor);
    }
  }


  exportButton.addEventListener("click", ()=> {

    exportText.value = JSON.stringify(adatok, null, 2);

  });


  loadData();

});