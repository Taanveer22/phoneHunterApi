// step 01 : load phones data from api-------------------------
const loadPhones = async (status, searchText) => {
  // step 08 : implement status into loadPhones()------------
  console.log(status, searchText);
  console.log("3 seconds later loadPhones function call...");
  // step 04 : hide the spinner------------------------------
  document.getElementById("spinner").style.display = "none";
  // step 05 : fetch data from api----------------------------
  //   step 10: dynamic api call--------------------
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchText ? searchText : "iphone"
    }`
  );
  const data = await response.json();
  const phones = data.data;
  //   console.log(data.data);

  //   step 09 : validation for status---------------------------
  if (status === true) {
    displayPhones(phones);
  } else {
    displayPhones(phones.slice(0, 6));
  }
};

//step 06 : display phones data in the ui--------------------------
const displayPhones = (phones) => {
  console.log(phones);
  if (phones.length === 0) {
    console.log("no phones");
  } else {
    console.log("many phones");
  }
  // step 13 : clear the loaded phone card
  document.getElementById("phones-container").innerHTML = "";
  const phonesContainer = document.getElementById("phones-container");
  phones.forEach((phone) => {
    // console.log(phone);
    // destructuring object
    const { brand, phone_name, slug, image } = phone;
    const phoneCard = document.createElement("div");
    phoneCard.innerHTML = `
            <div class="card bg-gray-300 shadow-sm m-2">
                    <figure class="px-10 pt-10">
                            <img src="${image}" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${brand}</h2>
                        <p class="text-lg">${phone_name}</p>
                        <div class="card-actions">
                            <button 
                                    onclick = handleDetails('${slug}')
                                    class="btn btn-primary">
                                          Details
                            </button>
                        </div>
                    </div>
            </div>
        `;
    phonesContainer.appendChild(phoneCard);
  });
};

// step 02 : onclick handler for search button-----------------------------
const handleSearch = () => {
  console.log("search button clicked");
  //   step 11 : search function implementation-----------------
  const searchValue = document.getElementById("search-box").value;
  //   step 04 : show the spinner------------------------
  document.getElementById("spinner").style.display = "block";
  //step 03 : invoke loadPhones() inside setTimeout-------------------------
  setTimeout(function () {
    loadPhones(false, searchValue);
  }, 3000);
};

// step 07 : onclick handler for showAll button----------------------
const handleShowAll = () => {
  console.log("show all btn clicked");
  // step 08 : invoke loadPhones() with status inside handleShowAll()
  loadPhones(true);
};

// step 12 : show modal for details button
const handleDetails = async (slug) => {
  // console.log(slug);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  // console.log(response);
  const data = await response.json();
  // console.log(data.data.mainFeatures);
  const features = data.data.mainFeatures;
  // console.log(features);
  const { storage, displaySize, memory, chipSet } = features;
  // console.log(storage, displaySize, memory, chipSet);
  // dynamic data pass
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
        <dialog id="features_modal" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">${chipSet}</h3>
            <p class="py-4">${memory}</p>
            <p class="py-4">${storage}</p>
            <p class="py-4">${displaySize}</p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
                            `;
  // modal show
  features_modal.showModal();
};
// final function invocation
loadPhones(false, "iphone");
