// step 01 : load phones data from api-------------------------
const loadPhones = async () => {
  console.log("3 seconds later loadPhones function call...");
  // step 04 : hide the spinner------------------------------
  document.getElementById("spinner").style.display = "none";
  // step 05 : fetch data from api----------------------------
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones);
  //   console.log(data.data);
};

//step 06 : display phones data in the ui--------------------------
const displayPhones = (phones) => {
  //   console.log(phones);
  const phoneContainer = document.getElementById("phones-container");
  phones.forEach((phone) => {
    // destructuring object
    // console.log(phone);
    const { brand, phone_name, slug, image } = phone;
    const phoneCard = document.createElement("div");
    phoneCard.innerHTML = `
            <div class="card bg-gray-300 shadow-sm m-2">
                    <figure class="px-10 pt-10">
                            <img src="${image}" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${brand}</h2>
                        <p>${phone_name}</p>
                        <p>${slug}</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">
                                    Show Details
                            </button>
                        </div>
                    </div>
            </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
};

// step 02 : onclick handler for search button-----------------------------
const handleSearch = () => {
  console.log("search button clicked");
  //   step 04 : show the spinner------------------------
  document.getElementById("spinner").style.display = "block";
  //step 03 : invoke loadPhones() inside setTimeout-------------------------
  setTimeout(function () {
    loadPhones();
  }, 3000);
};

// final function invocation
// loadPhones();
