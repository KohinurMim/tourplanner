
fetch("data/about.json") 
  .then(res => res.json())
  .then(data => {
    loadStats(data.stats);
    loadFeatures(data.features);
    startTestimonials(data.testimonials);
  })
  .catch(err => console.error("Error loading JSON:", err));

function loadStats(stats) {
  const container = document.getElementById("statsContainer");
  stats.forEach(stat => {
    const box = document.createElement("div");
    box.classList.add("stat-box");
    box.innerHTML = `
      <h3 class="counter" data-target="${stat.value}">0</h3>
      <p>${stat.label}</p>
    `;
    container.appendChild(box);
  });
  animateCounters();
}

function animateCounters() {
  document.querySelectorAll(".counter").forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;
    const step = target / 100;

    const update = () => {
      if (count < target) {
        count += step;
        counter.innerText = Math.ceil(count);
        setTimeout(update, 25);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}


function loadFeatures(features) {
  const container = document.getElementById("featureContainer");
  features.forEach(f => {
    const div = document.createElement("div");
    div.className = "feature";
    div.innerText = "✔ " + f;
    container.appendChild(div);
  });
}


let index = 0;
function startTestimonials(testimonials) {
  const box = document.getElementById("testimonialBox");

  function show() {
    box.innerHTML = `
      <p>"${testimonials[index].message}"</p>
      <h4>- ${testimonials[index].name}</h4>
    `;
    index = (index + 1) % testimonials.length;
  }

  show();
  setInterval(show, 3000);
}
