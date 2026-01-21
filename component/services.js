fetch("/data/services.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("serviceContainer");

    data.forEach(service => {
      container.innerHTML += `
        <div class="service-card">
          <i class="${service.icon} service-icon"></i>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <p class="price">${service.price}</p>
        </div>
      `;
    });
  });
