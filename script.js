const loadPhones = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones);
  //   console.log(data.data);
};

const displayPhones = (phones) => {
  //   console.log(phones);

  // step:1
  const phoneContainer = document.getElementById("phones-container");

  phones.forEach((phone) => {
    // destructuring object
    console.log(phone);
    const { brand, phone_name, slug, image } = phone;

    // step:2
    const phoneCard = document.createElement("div");

    // step:3
    phoneCard.innerHTML = `
            <div class="card bg-gray-600 shadow-sm m-2">
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

    // step:4
    phoneContainer.appendChild(phoneCard);
  });
};

loadPhones();
