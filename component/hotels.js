let hotels = [];
const hotelContainer = document.getElementById("hotelContainer");
const searchInput = document.getElementById("searchInput");

fetch("/data/hotels.json")
  .then(res => res.json())
  .then(data => {
    hotels = data;
    displayHotels(hotels);
  });

function displayHotels(data) {
  hotelContainer.innerHTML = "";
  data.forEach(hotel => {
    hotelContainer.innerHTML += `
      <div class="hotel-card">
        <img src="${hotel.image}">
        <div class="hotel-info">
          <h3>${hotel.name}</h3>
          <p>📍 ${hotel.location}</p>
          <p>💰 BDT ${hotel.price} / night</p>
          <p>⭐ Rating: ${hotel.rating}</p>
          <button onclick="showDetails(${hotel.id})">See More</button>
        </div>
      </div>
    `;
  });
}


searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = hotels.filter(hotel =>
    hotel.location.toLowerCase().includes(value)
  );
  displayHotels(filtered);
});


const modal = document.getElementById("hotelModal");
const closeBtn = document.querySelector(".close");

function showDetails(id) {
  const hotel = hotels.find(h => h.id === id);

  document.getElementById("modalImage").src = hotel.image;
  document.getElementById("modalName").innerText = hotel.name;
  document.getElementById("modalLocation").innerText = "Location: " + hotel.location;
  document.getElementById("modalPrice").innerText = "Price: BDT " + hotel.price;
  document.getElementById("modalRating").innerText = "Rating: " + hotel.rating;

  const facilitiesList = document.getElementById("modalfacilities");
 facilitiesList.innerHTML = "";
  hotel.facilities.forEach(a => {
    facilitiesList.innerHTML += `<li>${a}</li>`;
  });

  modal.style.display = "flex";
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };
