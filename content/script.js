

// Optionally add a marker to the map

window.onload = () => {
  let req = new XMLHttpRequest();
  var selectedID = sessionStorage.getItem('selectedID');
  var image = document.getElementById('image')
  var title = document.getElementsByTagName('h1')[0]

  var metadata = document.getElementById("ulMetadata")

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      let data = JSON.parse(req.responseText);

      content = data.record[selectedID]
      
      title.innerHTML = content.titolo

      link = content.contenuto
      if(link.includes("youtube")){
        link = link.split("/")[4]
        image.innerHTML = `<iframe  width="100%" height="100%" src="https://www.youtube.com/embed/${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      }else 
        image.innerHTML = '<div><img src="'+link+'"></div>'


      const map = L.map('map').setView(content.coordinate, 15); // Replace with image location coordinates

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Optionally add a marker to the map
      L.marker(content.coordinate).addTo(map); // Replace with image location coordinates
      
      metadata.innerHTML = 
            `<li><b>Tags: </b>${content.tag}</li><br><br>
            <li><b>Data caricamento: </b>${content.timestamp}</li>
            <li><b>Coordinate: </b>${content.coordinate}</li><br><br>
            <li><b>Descrizione: </b>${content.descrizione} </li>`

    }
  };  

  req.open("GET", "https://api.jsonbin.io/v3/b/65eb0f271f5677401f3a4a74/latest", true);
  req.setRequestHeader("X-Master-Key", "$2b$10$nptEQV7BQ.JZcnJ0sWwfIOpydX/kY2umc3BeOHriEvvHHBMmG0QB6");
  req.send();
  
};

