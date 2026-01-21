async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  try {
    const response = await fetch("data/user.json");
    const users = await response.json();

    let isValidUser = false;

    for (let user of users) {
      if (user.email === email && user.password === password) {
        isValidUser = true;
        break;
      }
    }

    if (isValidUser) {

      localStorage.setItem("isLoggedIn", true);

      message.innerText = "Login Successful";

      
      window.location.href = "index.html";

    } else {
      message.innerText = "Invalid Email or Password ";
    }

  } catch (error) {
    message.innerText = "Error loading user data ";
    console.error(error);
  }
}
