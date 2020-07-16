const version = "v1";
repsCleaned = []

function abbrState(input, to){
    
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }    
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }    
    }
}
// var url = "https://api.propublica.org/congress/${version}&X-API-Key=apiKey/"

// console.log(url);
$.ajax({
    url: "https://api.propublica.org/congress/v1/116/house/members.json",
    type: "GET",
    dataType: "json",
    headers: { "X-API-Key": apiKey }
}).done(function (data) {
    // console.log(data);

    members = data.results[0].members;
    // console.log(members);

    memberList = d3.select("#member-list");
    memberList.append("div");

    repsCleaned = []
    for (i = 0; i < members.length; i++) {
        repsCleaned.push({
            "fullName": members[i].first_name + ' ' + members[i].last_name,
            "firstName": members[i].first_name,
            "lastName": members[i].last_name,
            "title": members[i].title,
            "state": members[i].state,
            "district": members[i].district,
            "apiURL" : members[i].api_url,
            "party": members[i].party,
            "url":members[i].url,
            "inOffice": members[i].in_office,
            "missedVotes":members[i].missed_votes,
            "missedPCT": members[i].missed_votes_pct
        })
    };

    console.log(repsCleaned);
    function inOffice(inav){
        if(inav){
            return ""
        }
        else{
            return `<p style="color:red">Inactive</p>`
        }
    }

        // d3.select("#member-list")
        //     .selectAll("div")
        //     .data(repsCleaned)
        //     .enter()          
        //     .append("div")
        //     // .classed("col-md-12 thumbnail", true) // sets the class of the new div
        //     .html(function (d) {
        //         return `
        //       <div class="col-4">
        //       <div class="card" style="width: 20rem;">
        //       <div class="card-body">
        //       <div class="card-header">
        //       <h5 class="card-title">${d.fullName} <p class="party-id">(${d.party})</p>`
        //       + inOffice(d.inOffice) +`</div> </h5><br>
        //       <h6 class="card-subtitle mb-2 text-muted">${d.title}, ${d.state}- District ${d.district}</h6>
        //       <p class="card-text">
        //         <ul class="list-group list-group-flush">
        //             <li class="list-group-item">Missed Votes: ${d.missedVotes}</li>
        //             <li class="list-group-item"> Missed Votes %: ${d.missedPCT}
        //             </li>
        //         </ul>
        //       </p>
        //       <a href="#" class="card-link">Card link</a>
        //       <a href="${d.url}" target = "_blank" class="card-link">Official Site</a>
        //       <button class="btn btn-primary btn-sm" type="submit">More Info</button>
        //       </div>
        //       </div>
        //       <br>
        //       `;

        //     }


            // )
    var background_color;

    $.ajax({
        url: "https://api.propublica.org/congress/v1/members/A000374.json",
        type: "GET",
        dataType: "json",
        headers: { "X-API-Key": apiKey }
    }).done(function (data) {
        // console.log(data)
    });
    

    // d3.selectAll("div").classed("card-text", true).on("mouseover", function(d){
    //     // background_color = this.getElementByIDs('background-color')
    //     console.log(d)
    //     d3.select(d).style(
    //         "background-color", function(d){
    //             console.log(d)
    //             // party = this.selectAll("p").selectAll(".party-id")
    //             party = d.party;
    //             console.log(d.party)
    //             if(party == 'R'){
    //                 return "red"
    //             }
    //             else if(party == 'D'){
    //                 return "blue"
    //             }
    //             else{
    //                 return "green"
    //             }

    //         })
        //   });

    // } ).on("mouseout", function(d){
    //     d3.select(this).style(
    //         "background-color", "white"
    //       );
    //     })
    
})

