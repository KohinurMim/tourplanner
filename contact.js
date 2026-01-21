const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function(e){
  e.preventDefault(); // prevent page refresh

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if(name === "" || email === "" || subject === "" || message === "") {
    formMessage.style.color = "red";
    formMessage.innerText = "Please fill in all fields.";
    return;
  }

  
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if(!email.match(emailPattern)) {
    formMessage.style.color = "red";
    formMessage.innerText = "Please enter a valid email address.";
    return;
  }

  
  formMessage.style.color = "green";
  formMessage.innerText = "Thank you! Your message has been sent.";

  form.reset();
});
