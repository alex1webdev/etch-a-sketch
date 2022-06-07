const mainContainer = document.createElement("div");
mainContainer.className = "main-container";
const body = document.querySelector("body");
body.appendChild(mainContainer);

const elementsContainer = document.createElement("div");
mainContainer.appendChild(elementsContainer);
elementsContainer.className = "elements-container";

for (let i = 0; i < 256; i++) {
  const element = document.createElement("div");
  element.className = "element";
  elementsContainer.appendChild(element);
  element.setAttribute("id", `${i}`);
  element.textContent = `${i}`;
}

const selectElement = document.querySelectorAll(".element");
// console.log(selectElement);
selectElement.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.setAttribute("class", "element-enter");
  });
});

// const gridButton = document.createElement("button");
// mainContainer.appendChild(gridButton);
// gridButton.className = "grid-selection-button";
// gridButton.textContent = "Select the grid size";

const sliderContainer = document.createElement("div");
sliderContainer.className = "slider-container";
mainContainer.appendChild(sliderContainer);

const sliderCounter = document.createElement("p");
sliderContainer.appendChild(sliderCounter);
// sliderCounter.textContent = "Alex";

const slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.setAttribute("min", "1");
slider.setAttribute("max", "64");
slider.setAttribute("value", "16");
sliderContainer.appendChild(slider);
slider.className = "slider";
console.log(slider);

slider.addEventListener("input", () => {
  if (this.value > 0 && this.value < 64) {
    // sliderCounter.textContent = this.value;
    console.log(this.value);
  }
});
