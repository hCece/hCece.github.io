// This will be filled with your data
let allData = [];

// Fetch API to load data
fetch("https://api.jsonbin.io/v3/b/65eb0f271f5677401f3a4a74/latest", {
  headers: {
    "X-Master-Key": "$2b$10$nptEQV7BQ.JZcnJ0sWwfIOpydX/kY2umc3BeOHriEvvHHBMmG0QB6"
  }
})
.then(response => response.json())
.then(data => {
  allData = data.record;
  updateDisplay(allData); // Function to handle the initial display of items
})
.catch(error => console.error('Error fetching data:', error));

let aside = document.querySelector('aside');
let input = document.querySelector('input');


function goToContent(id) {
    sessionStorage.setItem('selectedID', id);
    window.location.href = "../content/index.html";
}

// Function to update the display based on the filtered data
function updateDisplay(filteredData) {
  aside.innerHTML = ''; // Clear the current content
  let cnt = 0
  filteredData.forEach(element => {
    const words = element.descrizione.split(/\s+/);
    const descrizione = words.length > 15 ? 
                         `${words.slice(0, 15).join(' ')}...` : 
                         element.descrizione;

    const itemHTML = `<div onclick="goToContent(${cnt})">
                        <img src="${element.contenuto}" alt="">
                        <h3>${element.titolo}</h3>
                        <p>${descrizione}</p>
                      </div>`;
    aside.insertAdjacentHTML('beforeend', itemHTML);
    cnt++
  });
  document.cookie = "user=Jogn; ";

}

// Input event listener for filtering
input.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const filteredData = allData.filter(element => 
    element.titolo.toLowerCase().includes(searchTerm) || 
    element.descrizione.toLowerCase().includes(searchTerm) ||
    element.timestamp.includes(searchTerm)
  );
  updateDisplay(filteredData);
});


document.addEventListener('DOMContentLoaded', function() {
  var breadcrumbs = [
      { name: "Home", url: "../index.html" },
      { name: "Gallery", url: "gallery/index.html" },
  ];

  var container = document.getElementById('breadcrumbsNav');
  container.innerHTML = breadcrumbs.map(function(crumb, index) {
      if (index < breadcrumbs.length - 1) {
          return '<a href="' + crumb.url + '">' + crumb.name + '</a> <span> > </span> ';
      } else {
          return '<span>' + crumb.name + '</span>';
      }
  }).join('');
});
