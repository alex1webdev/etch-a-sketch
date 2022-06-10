const DEFAULT_COLOR = "#686868";
const mainContainer = document.createElement("div");
mainContainer.className = "main-container";

const body = document.querySelector("body");
body.appendChild(mainContainer);

const elementsContainer = document.createElement("div");
mainContainer.appendChild(elementsContainer);
elementsContainer.className = "elements-container";

function sliderButton() {
  const sliderContainer = document.createElement("div");
  sliderContainer.className = "slider-container";
  mainContainer.appendChild(sliderContainer);

  let sliderCounter = document.createElement("p");
  sliderContainer.appendChild(sliderCounter);
  sliderCounter.className = "slider-counter";

  const slider = document.createElement("input");
  slider.setAttribute("type", "range");
  slider.setAttribute("min", "1");
  slider.setAttribute("max", "64");
  slider.setAttribute("value", "16");
  slider.setAttribute("step", "1");
  sliderContainer.appendChild(slider);
  slider.className = "slider";

  let value = parseFloat(slider.value);

  sliderCounter.textContent = `Grid-size: ${value} x ${value}`;

  let start = parseFloat(slider.min);
  let end = parseFloat(slider.max);
  let step = parseFloat(slider.step);

  slider.addEventListener("input", () => {
    for (let i = start; i < end; i += step) {
      value = parseFloat(slider.value);
      sliderCounter.textContent = `Grid-size: ${value} x ${value}`;
    }
  });
}

function colorPicker() {
  const colorButton = document.createElement("input");
  colorButton.setAttribute("type", "color");
  colorButton.setAttribute("value", `${DEFAULT_COLOR}`);

  colorButton.className = "color-button";
  sliderContainer = document.querySelector(".slider-container");
  sliderContainer.appendChild(colorButton);
}

function generateStartGrid() {
  generateGridElements();
  const selectElement = document.querySelectorAll(".element");
  selectElement.forEach((el) => {
    el.addEventListener("mousemove", () => {
      el.style.backgroundColor = DEFAULT_COLOR;
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
      element.style.height = `${480 / value}px`;
      element.style.width = `${480 / value}px`;
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
  randomButton.textContent = "Random Color";
  randomButton.classList.add("random-button");
  sliderContainer = document.querySelector(".slider-container");
  sliderContainer.appendChild(randomButton);
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
        let randomColor = generateRandomColor();
        el.style.backgroundColor = randomColor;
      });
    });
  });
}

function addEraseButton() {
  const eraseButton = document.createElement("button");
  eraseButton.textContent = "Eraser";
  eraseButton.classList.add("erase-button");
  sliderContainer = document.querySelector(".slider-container");
  sliderContainer.appendChild(eraseButton);
}

function erase() {
  addEraseButton();
  const selectEraseButton = document.querySelector(".erase-button");
  selectEraseButton.addEventListener("click", (e) => {
    selectElement = document.querySelectorAll(".element");
    selectElement.forEach((el) => {
      el.addEventListener("mousemove", () => {
        el.style.backgroundColor = "transparent";
      });
    });
  });
}

function addClearCanvasButton() {
  const clearCanvasButton = document.createElement("button");
  clearCanvasButton.textContent = "Clear canvas";
  clearCanvasButton.classList.add("clear-canvas-button");
  sliderContainer = document.querySelector(".slider-container");
  sliderContainer.appendChild(clearCanvasButton);
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
