const container = document.getElementById("packagesContainer");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("bookingModal");
let currentBooking = null;  

let allPackages = [];

/* FETCH PACKAGES */
fetch("/data/package.json")
  .then(res => res.json())
  .then(data => {
    allPackages = data.packages;
    displayPackages(allPackages);
  });

/* DISPLAY PACKAGES */
function displayPackages(packages) {
  container.innerHTML = "";

  packages.forEach(pkg => {
    const card = document.createElement("div");
    card.className = "package-card";

    card.innerHTML = `
      <img src="${pkg.image}">
      <div class="package-content">
        <h3>${pkg.title}</h3>
        <p>${pkg.description}</p>
        <div class="price">${pkg.price}</div>
        <button onclick="openBooking('${pkg.title}','${pkg.price}')">
          Book Now
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}


searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = allPackages.filter(pkg =>
    pkg.title.toLowerCase().includes(value)
  );
  displayPackages(filtered);
});

function openBooking(title, price) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    alert("Please login first to book a package.");
    window.location.href = "/component/login.html";
    return;
  }

  currentBooking = { title, price }; // Store current booking
  modal.style.display = "flex";
  document.getElementById("pkgName").value = title;
  document.getElementById("pkgPrice").value = price;
}


document.getElementById("closeModal").onclick = () => {
  modal.style.display = "none";
  currentBooking = null; // Reset current booking
};


document.getElementById("cancelBooking").addEventListener("click", () => {
  modal.style.display = "none";

  if (!currentBooking) return;

  // Decrement cart count if cart is not empty
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  if (cartCount > 0) {
    cartCount--;
    localStorage.setItem("cartCount", cartCount);

    // Remove the package from cartItems
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter(
      item => !(item.title === currentBooking.title && item.price === currentBooking.price)
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update navbar cart count
    const cartSpan = document.getElementById("cartCount");
    if (cartSpan) cartSpan.innerText = cartCount;
  }

  alert(`Booking for "${currentBooking.title}" canceled.`);
  currentBooking = null;
});

/* FORM SUBMIT */
document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();

  if (!currentBooking) return;

  const pkgName = document.getElementById("pkgName").value;
  const pkgPrice = document.getElementById("pkgPrice").value;


  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  cartCount++;
  localStorage.setItem("cartCount", cartCount);

 
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push({ title: pkgName, price: pkgPrice });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  
  const cartSpan = document.getElementById("cartCount");
  if (cartSpan) cartSpan.innerText = cartCount;

  alert(` "${pkgName}" booked successfully! Total items in cart: ${cartCount}`);
  modal.style.display = "none";

 
  document.getElementById("bookingForm").reset();
  currentBooking = null;
});
