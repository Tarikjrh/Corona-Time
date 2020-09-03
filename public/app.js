const navForm = document.querySelector("#navForm")
const selectForm = document.querySelector("#selectForm")
const categoryWanted = document.querySelector(".categoryWanted")
var count = 1;
var d1 = 0;
var d2 = 10;
var lastClicked = "cases"
var featureWanted = [0, 0, 0, 0, 0]
var btnNames = ["cases", "deaths", "new_cases", "new_deaths", "total_recovered"]


//fetch covid data
const getCovidInfo = async () => {
    console.log("index.html 10 | Processing...");
    const request = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "dc242f04b2msh7b0cfd3a287e677p1545d0jsn00eab1fcb8c9",

        }
    })
    const data = await request.json();
    return data;
};

//fetch user data
const getUserLocation = async () => {
    const request = await fetch("https://api.ipdata.co/?api-key=test", {
        "method": "GET",
    })
    const data = await request.json();
    return data;
}
//fetch global data
const getGlobalInfo = async () => {
    const request = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "dc242f04b2msh7b0cfd3a287e677p1545d0jsn00eab1fcb8c9"
        }
    })
    const data = await request.json();
    return data;
}






//main
getCovidInfo().then(covidData => {

    //sort Array
    covidData.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.cases)) - parseInt(fix_numbers(a.cases)) });

    //Grab Country name from the NAVBAR and search for it
    navForm.addEventListener("submit", e => {
        e.preventDefault()
        search(covidData.countries_stat, jsUcfirst(navForm["navText"].value), "table-c");
        navForm.reset()
    })


    //Grab Country name from the SELECTOR and search for it
    selectForm.addEventListener("change", e => {
        e.preventDefault()
        search(covidData.countries_stat, jsUcfirst(selectForm["country"].value), "table-c");
        selectForm.reset()
    })

    //initial fill of  main table
    showOther(covidData.countries_stat, "cases")


    //Update the main table
    categoryWanted.addEventListener("click", e => {
        if (e.target.getAttribute("btnCategory") != null) {
            console.log(featureWanted)
            document.querySelector(`#${(e.target.getAttribute("id"))}`).classList.add("clickeds");


            dataArr = sortBy(e.target.getAttribute("btnCategory"))
            lastClicked = e.target.getAttribute("btnCategory")

            featureWanted[btnNames.indexOf(e.target.getAttribute("btnCategory"))]++
            if (featureWanted[btnNames.indexOf(e.target.getAttribute("btnCategory"))] == 1) {
                d1 = 0;
                d2 = 10;
                count = 1;
                document.getElementById("table-2").innerHTML = ""
            }

            showOther(covidData.countries_stat, e.target.getAttribute("btnCategory"))
            resetOthers(btnNames.indexOf(e.target.getAttribute("btnCategory")))

        }
    })



    //view more btn
    const viewMorebtn = document.querySelector("#viewMoreBtn")
    viewMorebtn.addEventListener("click",e =>{
        e.preventDefault()
        showOther(covidData.countries_stat, lastClicked)
    })




    function sortBy(featureName) {
        if (featureName == "cases") {
            return covidData.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.cases)) - parseInt(fix_numbers(a.cases)) });
        }
        if (featureName == "deaths") {
            return covidData.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.deaths)) - parseInt(fix_numbers(a.deaths)) });
        }
        if (featureName == "new_cases") {
            return covidData.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.new_cases)) - parseInt(fix_numbers(a.new_cases)) });
        }
        if (featureName == "new_deaths") {
            return covidData.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.new_deaths)) - parseInt(fix_numbers(a.new_deaths)) });
        }
        if (featureName == "total_recovered") {
            return covidData.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.total_recovered)) - parseInt(fix_numbers(a.total_recovered)) });
        }
    }





    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //get user location
    getUserLocation(covidData).then(userData => {
        search(covidData.countries_stat, jsUcfirst(userData.country_name), "table-c");
        hidestuff()



    }).catch(err => {
        console.log(err)
    })//user catch

}).catch(err => {
    console.log(err)
});//covid catch



function resetOthers(inputname) {
    for (i = 0; i < featureWanted.length; i++) {
        if (i != inputname) {
            featureWanted[i] = 0;
            if (i == 0) {
                document.querySelector("#casesBtn").classList.remove("clickeds");

            }
            if (i == 1) {
                document.querySelector("#deathsBtn").classList.remove("clickeds");

            }
            if (i == 2) {
                document.querySelector("#newCasesBtn").classList.remove("clickeds");

            }
            if (i == 3) {
                document.querySelector("#newDeathsBtn").classList.remove("clickeds");

            }
            if (i == 4) {
                document.querySelector("#recoveredBtn").classList.remove("clickeds");

            }
        }

    }
}





function showOther(array, featureName) {

    var list2 = array.slice(d1, d2);

    list2.forEach(element => {
        const list = document.getElementById("table-2");
        
        if (featureName == "cases") {
            infotop = element.cases
        }
        if (featureName == "deaths") {
            infotop = element.deaths
        }
        if (featureName == "new_cases") {
            infotop = element.new_cases
        }
        if (featureName == "new_deaths") {
            infotop = element.new_deaths
        }
        if (featureName == "total_recovered") {
            infotop = element.total_recovered
        }

        let info = ` 
          <div uk-accordion  >
          <div class="">
              <a class="uk-accordion-title  uk-text-light uk-text-left@m uk-text-center tc " " onclick="document.getElementById('${element.country_name}').focus(); 
              return false;"><span style="float: left;padding-right:10px">${count} </span><span style="float: left;"> ${element.country_name}</span><span style="float: right;">${infotop}</span></a>
             
            <div class="uk-accordion-content" style="padding-bottom: 0px;margin-top:0">

            <table role="table " class="uk-width-expand@m  ">
                                        <thead role="rowgroup" class="uk-background-muted  uk-padding-remove uk-text-secondary" id="${element.country_name}">
                                        <tr role="row" class="" >
                                            <th class="uk-padding-small-left" role="columnheader">#</th>
                                            <th class="uk-padding-small" role="columnheader">Country Name</th>
                                            <th class="uk-padding-small" role="columnheader">Total Cases</th>
                                            <th class="uk-padding-small" role="columnheader">New Cases</th>
                                            <th class="uk-padding-small" role="columnheader">Total Deaths</th>
                                            <th class="uk-padding-small" role="columnheader">New Deaths</th>
                                            <th class="uk-padding-small" role="columnheader">Total recovered</th>
                                        
                                        </tr>
                                        </thead>
                                         <tbody>
    <tr role="row">
            <tr role="row"  class="uk-text-center hovers">
            <td role="cell" class=" " >${count}</td>
            <td role="cell" class=" " >${element.country_name}</td>
            <td role="cell" class=" " >${element.cases} </td>
            <td role="cell" class=" " >${element.new_cases} </td>
            <td role="cell" class=" " >${element.deaths} </td>
            <td role="cell" class=" " >${element.new_deaths} </td>
            <td role="cell" class=" " >${element.total_recovered} </td> 
            </tr>
            </tbody>   
           
                 
                </div>
            </div>
        </div>
    </div>
                     `;

        list.innerHTML += info;
        count++;

    });


    d1 += 10;
    d2 += 10;

}



function search(array, country_searched, tablename) {
    found=false
    var rank = 1;
    array.forEach(element => {

       
        if (element.country_name == country_searched) {
            found=true
            const text2 = document.getElementById("hello");
            if (tablename == "table-c") {
                let html2 = `      
                <span style="float: left;padding-right:10px">${rank} </span><span style="float: left;"> ${element.country_name}</span><span style="float: right;">${element.cases}</span></a>`;
                text2.innerHTML = html2;
            }


            const text = document.getElementById(tablename);
            let html = `
                <thead > <tr >
                            <th class="uk-padding-small">#</th>
                            <th class="uk-padding-small">Country Name</th>
                            <th class="uk-padding-small">Total Cases</th>
                            <th class="uk-padding-small">New Cases</th>  
                            <th class="uk-padding-small">Total Deaths </th> 
                            <th class="uk-padding-small">New Deaths</th>     
                            <th class="uk-padding-small">Recovered</th> 
                        </tr> </thead> <tbody>
                    <tr role="row">
                            <tr role="row" class="uk-text-center@m hovers">
                            <td role="cell" class=" " >${rank}</td>
                            <td role="cell" class=" " >${element.country_name}</td>
                            <td role="cell" class=" " >${element.cases} </td>
                            <td role="cell" class=" " >${element.new_cases} </td>
                            <td role="cell" class=" " >${element.deaths} </td>
                            <td role="cell" class=" " >${element.new_deaths} </td>
                            <td role="cell" class=" " >${element.total_recovered} </td> 
                            </tr>
                            </tbody>   
                                `
            // console.log(element.country_name,rank)
            text.innerHTML = html;

          

        }
        else {
            rank++;

        }
        
        if(rank == array.length && found==false){
            console.log("here")
            const text = document.getElementById("table-c");
            text.innerHTML=``
        }
        

    });

}


//this removes the commas from the strings
function fix_numbers(num) {
    var fixed = num.replace(/,/g, "");
    return fixed
}
//fix String
function jsUcfirst(string) {
    string = string.trim();
    if (string === "usa" || string === "Usa" || string == "United States") {
        return "USA";
    }
    if (string == "United Kingdom") {
        return "UK";
    }


    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

}
function hidestuff() {
    document.getElementById('spinner').style.marginLeft = '10000px';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('spinner').innerHTML = 'none';

}



//get global information
getGlobalInfo().then(globalData => {
    const text = document.getElementById("global");
        let html = `
            <p class="world_stats lead uk-text-left@m uk-text-center">${globalData.total_cases} Total Cases</p>
            <p class="world_stats lead uk-text-left@m uk-text-center">${globalData.new_cases}  New Cases</p>
            <p class="world_stats lead uk-text-left@m uk-text-center">${globalData.total_deaths} Total Deaths</p>
            <p class="world_stats lead uk-text-left@m uk-text-center">${globalData.total_recovered} Total Recovered</p>
            <p class="world_stats lead uk-text-left@m uk-text-center">${globalData.new_deaths}  New Deaths</p>
    `;

        text.innerHTML = html;
})
.catch(err=>{
    console.log(err)
})
  


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//code for the dark mode
const nightmodebtn = document.getElementById('nightmode');
const body = document.body;

// Apply the cached theme on reload
const theme = localStorage.getItem('theme');

if (theme) {
    body.classList.add(theme);

}

// Button Event Handlers

nightmodebtn.onclick = () => {
    body.classList.toggle('dark');
    if (theme == "dark")
        localStorage.setItem('theme', 'light');
    else {
        localStorage.setItem('theme', 'dark');
    }


};


