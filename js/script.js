const blocks = document.querySelectorAll('.section'),
      arrows = document.querySelectorAll('.section-arrow'),
      importBtn = document.querySelector('.inform-detailed_btn-import'),
      modal = document.querySelector('.modal'),
      mask = document.querySelector('.mask'),
      topModalClose = document.querySelector('.modal-top-close'),
      bottomModalClose = document.querySelector('.modal-bottom-close'),
      body = document.querySelector('body');

arrows.forEach((item, i) => {
    item.addEventListener('click', () => {
        let children = blocks[i].children;
        if(blocks[i].classList.contains('collapsed')) {
            blocks[i].classList.toggle('collapsed');
            setTimeout(() => {
                for(let j = 1; j < children.length; j++) {
                    children[j].classList.toggle('d-none');
                }
            }, 100);
        } else {
            for(let j = 1; j < children.length; j++) {
                children[j].classList.toggle('d-none');
            }
            setTimeout(() => {
                blocks[i].classList.toggle('collapsed');
            }, 100);
        }
    });
});

importBtn.addEventListener('click', () => {
    mask.classList.remove('d-none');
    modal.classList.remove('d-none');
    body.style.overflow = 'hidden';
});

topModalClose.addEventListener('click', () => {
    mask.classList.add('d-none');
    modal.classList.add('d-none');
    body.style.overflow = 'visible';
});
bottomModalClose.addEventListener('click', () => {
    mask.classList.add('d-none');
    modal.classList.add('d-none');
    body.style.overflow = 'visible';
});
mask.addEventListener('click', () => {
    mask.classList.add('d-none');
    modal.classList.add('d-none');
    body.style.overflow = 'visible';
});
const sortButtons = document.querySelectorAll('.inform-detailed_list-title-sort');

const handleSortClick = (button, sortBy) => {
  const sortOrder = button.classList.toggle('asc') ? 'asc' : 'desc';
  const tableWrapper = button.closest('.inform-detailed_list-wrapper');
  const tableRows = Array.from(tableWrapper.querySelectorAll('.inform-detailed_list-item'));
  
  tableRows.sort((a, b) => {
    const textA = a.querySelector(sortBy).textContent;
    const textB = b.querySelector(sortBy).textContent;
    
    const valueA = sortBy === '.inform-detailed_list-item-klient' ? extractNumber(textA) : convertToDate(textA);
    const valueB = sortBy === '.inform-detailed_list-item-klient' ? extractNumber(textB) : convertToDate(textB);
    
    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  });
  
  tableRows.forEach((row) => row.remove());
  tableRows.forEach((row) => tableWrapper.appendChild(row));
};

sortButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const sortBy = index === 0 ? '.inform-detailed_list-item-klient' : (index === 1 ? '.inform-detailed_list-item-from' : '.inform-detailed_list-item-to');
    handleSortClick(button, sortBy);
  });
});

function extractNumber(text) {
  const matches = text.match(/\d+/);
  return matches ? parseInt(matches[0]) : 0;
}

function convertToDate(dateString) {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);

  return new Date(year, month - 1, day, hour, minute);
}

  
