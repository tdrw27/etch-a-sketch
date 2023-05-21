const body = document.querySelector('body');
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
let selectedColor = 'black';
let specialEffect = 'false';

// Buttons for changing grid size
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('buttonContainer');

const x16button = document.createElement('button');
x16button.innerText = "16 x 16";


const x32button = document.createElement('button');
x32button.innerText = "32 x 32";


const x64button = document.createElement('button');
x64button.innerText = "64 x 64";

const x100button = document.createElement('button');
x100button.innerText = "100 x 100";

// Buttons for grid sizing
const buttonArr = [x16button, x32button, x64button, x100button];
buttonArr.forEach(button => buttonContainer.appendChild(button))
body.appendChild(buttonContainer);

// Adding event listeners to buttons
x16button.addEventListener('click', () => createGrid(16));
x32button.addEventListener('click', () => createGrid(32));
x64button.addEventListener('click', () => createGrid(64));
x100button.addEventListener('click', () => createGrid(100));

// Set color of grid-area and add special effect if selected
function setColor(e) {
  let target = e.target
  root.style.setProperty('--color', selectedColor);
  if (target.nodeName == 'DIV') {
    if (specialEffect != "false") {
      target.style.background = null;
      selectedColor = specialEffect;
      target.classList.add(specialEffect)
    }

    // remove existing special effects
    if (target.classList.length > 3) {
      let options = specialOptions.slice(1);
      options.forEach(option => {
        option = option.toLowerCase();
        if (option == specialEffect) {
          return
        }
        else {
          target.classList.remove(option);
        }
      })
    }
    if (selectedColor && selectedColor != 'random') {
      target.style.background = selectedColor;
      target.classList.add('set');
    }
    // random color
    else if (selectedColor == 'random') {
      if (target.classList.contains('set')) {
        let currentColor = getComputedStyle(target).background;
        // extract number values
        const rgbRegex = /\d+/g;
        let colors = [...currentColor.matchAll(rgbRegex)];
        let newRed = Number(colors[0]) - 25;
        let newGreen = Number(colors[1]) - 25;
        let newBlue = Number(colors[2]) - 25;
        target.style.background = `rgb(${newRed},${newGreen},${newBlue})`;
      }
      else {
        let random255 = () =>  Math.round(Math.random() * 256);
        let randomRed = random255();
        let randomGreen = random255();
        let randomBlue = random255();
        let randomRGB = `rgb(${randomRed},${randomGreen},${randomBlue})`;
        target.style.background = randomRGB;
        target.classList.add('set');
      }
    }
  }
}



// Create grid of size[16,32,64,100];
function createGrid(size) {
  const oldContainer = document.querySelector('section')
  const container = document.createElement('section');
  container.classList.add('grid-container');

  // add event listener for mouseover to change grid-area color
  container.addEventListener('mouseover', setColor)

  // clear any existing grids
  if (body.contains(oldContainer)) {
    body.removeChild(oldContainer);
  }

  body.appendChild(container);

  let grid = size * size;



  for (let i = 1; i <= grid; i++) {
    const div = document.createElement('div');
    div.classList.add(`grid-areax${size}`)
    // div.setAttribute('id', `grid${i}`)
    container.appendChild(div);
  }
  selectedColor = "#000000"
}


// Code to change background of grid
// root.style.setProperty('--background-color', 'blue')


// Buttons for customization
const customButtons = document.createElement('div');
customButtons.classList.add('buttonContainer');

const inputContainer = document.createElement('div');
inputContainer.classList.add('inputContainer');
body.appendChild(inputContainer);
// Line Color Section
const colorInputSection = document.createElement('div');
colorInputSection.classList.add('inputSection');

const colorInputLabel = document.createElement('label')
colorInputLabel.innerText = "Line Color: ";
colorInputLabel.setAttribute('for', 'color');

const colorPicker = document.createElement('input');
colorPicker.setAttribute('type', 'color');
colorPicker.setAttribute('id', 'color');
colorPicker.setAttribute('value', '#000000');

colorInputSection.appendChild(colorInputLabel);
colorInputSection.appendChild(colorPicker);
// Background Color Section
const backgroundInputSetion = document.createElement('div');
backgroundInputSetion.classList.add('inputSection');

const backgroundInputLabel = document.createElement('label');
backgroundInputLabel.innerText = "Background Color: ";
backgroundInputLabel.setAttribute('for', 'bg-color')

const backgroundColorPicker = document.createElement('input');
backgroundColorPicker.setAttribute('type', 'color');
backgroundColorPicker.setAttribute('id', 'bg-color');
backgroundColorPicker.setAttribute('value', '#AAAAAA')

backgroundInputSetion.appendChild(backgroundInputLabel);
backgroundInputSetion.appendChild(backgroundColorPicker);
// Special Section
const specialInputSection = document.createElement('div');
specialInputSection.classList.add('inputSection');

const specialInputLabel = document.createElement('label');
specialInputLabel.innerText = "Special Effects: ";
specialInputLabel.setAttribute('for', 'special');

const specialInputPicker = document.createElement('select');
specialInputPicker.setAttribute('id','special');
// first option blank
const specialOptions = ['','Random', 'Rainbow-Line', 'Rainbow-Reveal', 'Redraw', 'Pulse'];
specialOptions.forEach(opt => {
  // added for false value on empty option
  if (opt == '') {
    const option = document.createElement('option');
    option.setAttribute('value', 'false');
    option.innerText = opt;
    specialInputPicker.appendChild(option);
  }
  else {
    const option = document.createElement('option');
    option.setAttribute('value', opt.toLowerCase());
    option.innerText = opt;
    specialInputPicker.appendChild(option);
  }
})
specialInputSection.appendChild(specialInputLabel);
specialInputSection.appendChild(specialInputPicker);

// Appending Sections
inputContainer.appendChild(colorInputSection);
inputContainer.appendChild(backgroundInputSetion);
inputContainer.appendChild(specialInputSection);

// Listeners for customization
colorInputSection.addEventListener('input', e => {
  let target = e.target
  selectedColor = target.value;
})

backgroundInputSetion.addEventListener('input', e => {
  let target = e.target
  root.style.setProperty('--background-color', target.value);
})

specialInputSection.addEventListener('change', e => {
  let target = e.target

  target.value == 'random' ? selectedColor = 'random' : specialEffect = target.value;
})







// Initial Grid
createGrid(16);
