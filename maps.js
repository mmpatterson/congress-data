filepath = 'state_view.json'

var myMap = L.map("map-obj", {
  center: [39.0473, -95.6752],
  zoom: 4
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

d3.json("static/data/stateview.json").then(function (data) {

  console.log(data);
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function (feature) {
      console.log("Styling")
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        // fillColor: chooseColor(feature.properties.borough),
        fillColor: "red",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function (feature, layer) {
      relevant = []
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (state) is clicked, it is enlarged to fit the screen
        click: function (event) {
          console.log("I clicked!")
          layer = event.target;
          console.log(layer);
          event.target.setStyle({
            fillOpacity: 0.9
          });

          myMap.fitBounds(event.target.getBounds());
          console.log(repsCleaned)

          relevant = repsCleaned.filter(function (data) {
            // console.log(data.state === abbrState(feature.properties.NAME, 'abbr'))
            // console.log(abbrState(feature.properties.NAME, 'abbr'))
            return data.state === abbrState(feature.properties.NAME, 'abbr')

          })
          console.log(relevant);
          tbody = d3.select("tbody");

          new_relevant = relevant;
          for (item in new_relevant) {
            console.log(item)
            delete new_relevant[item].firstName;
            delete new_relevant[item].lastName;
            delete new_relevant[item].title;
            delete new_relevant[item].inOffice;
          }
          console.log(new_relevant);

          function displayData(new_relevant) {
            tbody.text("")
            // new_relevant.forEach(function(row){

            // Object.entries(row).forEach(function([key]){
            //     console.log(row[key])
            //     console.log(row.fullName);
            //     new_td = new_tr.append("td").text(row[key])	
            // });
            Object.keys(relevant).forEach(function (key) {
              console.log(relevant[key])
              // console.log(row.fullName);
              new_tr = tbody.append("tr")
              new_td = new_tr.append("td").text(relevant[key].fullName)
              new_td = new_tr.append("td").text(relevant[key].state)
              new_td = new_tr.append("td").text(relevant[key].district)
              new_td = new_tr.append("td").text(relevant[key].party)
              new_td = new_tr.append("td").text(relevant[key].missedPCT)
              new_td = new_tr.append("td").text(relevant[key].missedVotes)

            });

          }
            
            // )
    // }
            displayData(new_relevant);

    //   setTimeout(function (){
    //     console.log("appending popup")
    //     // Something you want delayed.
    //     event.target.bindPopup(
    //         // event.target.bindPopup(
    //         "<h1>" + relevant[0].fullName + "</h1> <hr> <h2>" + relevant[0].party + "</h2>"
    //       );
    //   }, 5000);
  }
          });



          // Giving each feature a pop-up with information pertinent to it
        //   layer.bindPopup(function(relevant){
        //     "<h1>" + relevant[0].fullName + "</h1> <hr> <h2>" + relevant[0].party + "</h2>";
        //   });
        }
      }).addTo(myMap);
});