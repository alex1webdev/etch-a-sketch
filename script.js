const default_color = "#868e96";
const mainContainer = document.createElement("div");
mainContainer.className = "main-container";

let draw = false;

const body = document.querySelector("body");
body.appendChild(mainContainer);

const elementsContainer = document.createElement("div");
mainContainer.appendChild(elementsContainer);
elementsContainer.className = "elements-container";

function sliderButton() {
  const sliderContainer = document.createElement("div");
  sliderContainer.className = "slider-container";
  mainContainer.appendChild(sliderContainer);

  const sliderContainerInner = document.createElement("div");
  sliderContainerInner.className = "slider-container-inner";
  sliderContainer.appendChild(sliderContainerInner);

  let sliderCounter = document.createElement("p");
  sliderContainerInner.appendChild(sliderCounter);

  sliderCounter.className = "slider-counter";

  const slider = document.createElement("input");
  slider.setAttribute("type", "range");
  slider.setAttribute("min", "1");
  slider.setAttribute("max", "64");
  slider.setAttribute("value", "16");
  slider.setAttribute("step", "1");
  sliderContainerInner.appendChild(slider);
  slider.className = "slider";

  let value = parseFloat(slider.value);

  sliderCounter.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 6h-6v-6h6v6zm9-6h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6z"/></svg> ${value} x ${value}`;

  let start = parseFloat(slider.min);
  let end = parseFloat(slider.max);
  let step = parseFloat(slider.step);

  slider.addEventListener("input", () => {
    for (let i = start; i < end; i += step) {
      value = parseFloat(slider.value);
      sliderCounter.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 6h-6v-6h6v6zm9-6h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6z"/></svg> ${value} x ${value}`;
    }
  });
}

function colorPicker() {
  const colorContainer = document.createElement("div");
  colorContainer.className = "color-container";
  const colorButton = document.createElement("input");
  colorButton.setAttribute("type", "color");
  colorButton.setAttribute("value", `${default_color}`);
  colorContainer.appendChild(colorButton);

  colorButton.className = "color-button";

  sliderContainer = document.querySelector(".slider-container");
  sliderContainer.appendChild(colorContainer);
}

function generateStartGrid() {
  generateGridElements();
  const selectElement = document.querySelectorAll(".element");
  selectElement.forEach((el) => {
    el.addEventListener("mousemove", () => {
      if (!draw) return;
      el.style.backgroundColor = default_color;
      el.style.backgroundColor = chooseColor;
    });
  });
}

function generateGridElements() {
  slider = document.querySelector("input");
  value = parseFloat(slider.value);
  for (let i = 0; i < value; i++) {
    for (let j = 0; j < value; j++) {
      const element = document.createElement("div");
      element.className = "element";
      elementsContainer.appendChild(element);
      element.setAttribute("id", `${i}`);
      element.style.height = `${580 / value}px`;
      element.style.width = `${580 / value}px`;
    }
  }
}

function grid() {
  const selectGridParent = document.querySelector(".elements-container");
  const selectInitialGrid = document.querySelectorAll(".element");

  selectInitialGrid.forEach((item) => {
    selectGridParent.removeChild(item);
  });
  generateGridElements();

  let selectElement = document.querySelectorAll(".element");
  selectElement.forEach((el) => {
    el.addEventListener("mousemove", () => {
      if (!draw) return;
      el.style.backgroundColor = checkWhatColorNow();
    });
  });
}

function chooseColor() {
  let colorValue;
  const selectColorPicker = document.querySelector(".color-button");
  selectColorPicker.addEventListener("input", (e) => {
    const selectElement = document.querySelectorAll(".element");
    selectElement.forEach((el) => {
      el.addEventListener("mousemove", () => {
        if (!draw) return;
        colorValue = e.target.value;
        el.style.backgroundColor = colorValue;
      });
    });
  });
  return colorValue;
}

function checkWhatColorNow() {
  const selectColorPicker = document.querySelector(".color-button");
  return selectColorPicker.value;
}

function addRandomButton() {
  const randomButton = document.createElement("button");
  const selectColorContainer = document.querySelector(".color-container");
  selectColorContainer.appendChild(randomButton);
  // randomButton.textContent = "Random Color";
  randomButton.classList.add("random-button");
}

function generateRandomColor() {
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    const bit = (Math.random() * 16) | 0;
    randomColor += bit.toString(16);
  }
  return randomColor;
}

function randomizeColoring() {
  addRandomButton();
  const selectRandomButton = document.querySelector(".random-button");
  selectRandomButton.addEventListener("click", (e) => {
    selectElement = document.querySelectorAll(".element");
    selectElement.forEach((el) => {
      el.addEventListener("mousemove", () => {
        if (!draw) return;
        let randomColor = generateRandomColor();
        el.style.backgroundColor = randomColor;
      });
    });
  });
}

function addEraseButton() {
  const createToolsContainer = document.createElement("div");
  createToolsContainer.className = "tools-container";
  const eraseButton = document.createElement("button");
  createToolsContainer.appendChild(eraseButton);
  eraseButton.innerHTML =
    '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.662 23l-5.369-5.365c-.195-.195-.293-.45-.293-.707 0-.256.098-.512.293-.707l14.929-14.928c.195-.194.451-.293.707-.293.255 0 .512.099.707.293l7.071 7.073c.196.195.293.451.293.708 0 .256-.097.511-.293.707l-11.216 11.219h5.514v2h-12.343zm3.657-2l-5.486-5.486-1.419 1.414 4.076 4.072h2.829zm.456-11.429l-4.528 4.528 5.658 5.659 4.527-4.53-5.657-5.657z"/></svg>';
  eraseButton.classList.add("erase-button");

  sliderContainer = document.querySelector(".slider-container");
  sliderContainer.appendChild(createToolsContainer);
}

function erase() {
  addEraseButton();
  const selectEraseButton = document.querySelector(".erase-button");
  selectEraseButton.addEventListener("click", (e) => {
    selectElement = document.querySelectorAll(".element");
    selectElement.forEach((el) => {
      el.addEventListener("mousemove", () => {
        if (!draw) return;
        el.style.backgroundColor = "transparent";
      });
    });
  });
}

function addClearCanvasButton() {
  const clearCanvasButton = document.createElement("button");
  const selectToolsContainer = document.querySelector(".tools-container");
  selectToolsContainer.appendChild(clearCanvasButton);
  clearCanvasButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 6l-3 18h-12l-3-18h2.028l2.666 16h8.611l2.666-16h2.029zm-4.711-4c-.9 0-1.631-1.099-1.631-2h-5.316c0 .901-.73 2-1.631 2h-5.711v2h20v-2h-5.711z"/></svg>';
  clearCanvasButton.classList.add("clear-canvas-button");
  sliderContainer = document.querySelector(".slider-container");
  sliderContainer.appendChild(selectToolsContainer);
}

function clearCanvas() {
  addClearCanvasButton();
  const clearCanvasButton = document.querySelector(".clear-canvas-button");
  clearCanvasButton.addEventListener("click", (e) => {
    selectElement = document.querySelectorAll(".element");
    selectElement.forEach((el) => {
      el.style.backgroundColor = "transparent";
    });
  });
}

function runAll() {
  sliderButton();
  colorPicker();
  generateStartGrid();
  chooseColor();
  randomizeColoring();
  erase();
  clearCanvas();
}

runAll();

slider.addEventListener("input", grid);
window.addEventListener("mousedown", () => {
  draw = true;
});
window.addEventListener("mouseup", () => {
  draw = false;
});
