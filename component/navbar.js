const navRight = document.getElementById("navRight");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

// Get login and cart info from localStorage
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

// Function to update navbar dynamically
function updateNav() {
  if (isLoggedIn) {
    navRight.innerHTML = `
      <button class="nav-btn">Cart (<span id="cartCount">${cartCount}</span>)</button>
      <button class="nav-btn" onclick="logout()">Logout</button>
    `;
  } else {
    navRight.innerHTML = `
      <a href="/component/login.html" class="nav-btn">Login</a>
    `;
  }
}

// Logout function
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "/component/login.html";
}

// Call once to initialize navbar
updateNav();

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navRight.classList.toggle("active");
});

/* ===== Function to add a package to cart ===== */
function addToCart() {
  if (!isLoggedIn) {
    // If user is not logged in, redirect to login page
    alert("Please login first to book a package.");
    window.location.href = "/component/login.html";
    return;
  }

  // Increment cart count
  cartCount++;
  localStorage.setItem("cartCount", cartCount);

  // Update cart number in navbar
  const cartSpan = document.getElementById("cartCount");
  if (cartSpan) cartSpan.innerText = cartCount;

  alert(`Package added to cart! Total items: ${cartCount}`);
}
