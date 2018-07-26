const list = document.querySelector('#grades-list ul');

// delete grade
list.addEventListener('click', function (e) {
  if (e.target.className == 'delete') {
    const li = e.target.parentElement;

    list.removeChild(li);
  }

  var results = calculateMarksAndWeight();
  
  // display mark and weight
  const displayGrade = document.querySelector('.total-grade');
  const displayWeight = document.querySelector('.total-weight');

  displayGrade.innerHTML = results.totalMark + "%";
  displayWeight.innerHTML = results.totalWeight;
});

// add grade
const addForm = document.forms['add-grade'];

addForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const value = addForm.querySelector('input[type="text"]').value;
  const weight = addForm.querySelector('input[class="weight-input"]').value;
  const grade = addForm.querySelector('input[class="grade-input"]').value;

  // create elements
  const li = document.createElement('li');
  const gradeName = document.createElement('span');
  const deleteBtn = document.createElement('span');
  const weightVal = document.createElement('span');
  const gradeVal = document.createElement('span');

  // add content
  deleteBtn.textContent = 'delete';
  gradeName.textContent = value;
  weightVal.textContent = weight;
  gradeVal.textContent = grade;

  // add classes to the elements
  deleteBtn.classList.add('delete');
  gradeName.classList.add('name');
  weightVal.classList.add('weight');
  gradeVal.classList.add('grade');

  // append to DOM
  li.appendChild(gradeName);
  li.appendChild(weightVal);
  li.appendChild(gradeVal);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  addForm.reset();
});

// event listener for submit button
addForm.addEventListener('submit', function (e) {
  var results = calculateMarksAndWeight();

  // display mark and weight
  const displayGrade = document.querySelector('.total-grade');
  const displayWeight = document.querySelector('.total-weight');

  displayGrade.innerHTML = results.totalMark + "%";
  displayWeight.innerHTML = results.totalWeight;
})

// filter grades
const searchBar = document.forms['search-grades'].querySelector('input');

searchBar.addEventListener('keyup', function (e) {
  const term = e.target.value.toLowerCase();
  const grades = list.getElementsByTagName('li');

  Array.from(grades).forEach(function (grade) {
    const title = grade.firstElementChild.textContent;

    if (title.toLocaleLowerCase().indexOf(term) != -1) {
      grade.style.display = 'block';
    } else {
      grade.style.display = 'none';
    }
  });
});

// calculate mark and weight
function calculateMarksAndWeight() {
  const grades = list.getElementsByTagName('li');
  var totalWeight = 0;
  var totalMark = 0;

  Array.from(grades).forEach(function (grade) {
    totalWeight += +(grade.querySelector('.weight').innerHTML);
    totalMark += (+(grade.querySelector('.weight').innerHTML) * (+(grade.querySelector('.grade').innerHTML) / 100));
  })

  totalWeight = totalWeight.toFixed(1);
  totalMark = totalMark.toFixed(1);

  return {
    totalWeight: totalWeight,
    totalMark: totalMark
  };
};