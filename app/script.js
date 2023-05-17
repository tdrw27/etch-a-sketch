const body = document.querySelector('body');
const selectedClass = 'grid-black'


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

  // create initial 16 x 16 divs
  body.appendChild(container);

  let grid = size * size;



  for (let i = 1; i <= grid; i++) {
    const div = document.createElement('div');
    div.classList.add(`grid-areax${size}`)
    div.setAttribute('id', `grid${i}`)
    container.appendChild(div);
  }
}



// eventTarget -> ___
//change color of grid area by adding new class
function setColor(e) {
  let target = e.target
  if (target.nodeName == 'DIV') {
    target.classList.add(selectedClass)
  }
}

createGrid(16);
