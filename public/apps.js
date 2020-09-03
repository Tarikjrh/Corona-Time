var x = 0;
var y = 10;
var lastClicked ="cases"
var featureWanted= [0,0,0,0,0]
fetch("https://api.ipdata.co/?api-key=test", {
    "method": "GET",
})
.then(response => response.json().then(data => {
    curr_location=data
return data;
    })).catch(err => {
        console.log(err);
    });

fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "dc242f04b2msh7b0cfd3a287e677p1545d0jsn00eab1fcb8c9",

    }
})
    .then(response => response.json().then(data => {

        // SORT ARRAY
        data.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.cases)) - parseInt(fix_numbers(a.cases)) });
        console.log(data.countries_stat)
        //show table on load
        showOther(data.countries_stat,lastClicked);
        document.getElementById("bt1").addEventListener("click", function(){  search(data.countries_stat, document.getElementById("country").value,"table-1"); }); 
    
        var dataArr = data.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.cases)) - parseInt(fix_numbers(a.cases)) });
        document.getElementById("bt2").addEventListener("click",e=>{
            
         
          showOther(dataArr,lastClicked);
        }); 
       
        // document.getElementById("bt3").addEventListener("click", function(){  searchinput(data.countries_stat, document.getElementById("searchbar").value)    ; }); 
        document.getElementById("searchbar").onkeypress = function(event){
            if (event.keyCode == 13 || event.which == 13){
                search(data.countries_stat, jsUcfirst(document.getElementById("searchbar").value),"textsearch") 
              
                ; 
            }
        };   
          

        setTimeout(function() {
   
            search(data.countries_stat,jsUcfirst(curr_location.country_name) ,"table-c"); 
            hidestuff()
        }
        , 1500);



document.getElementById("casesbtn").addEventListener("click", function(){ 
    document.querySelector("#casesbtn").classList.add("clickeds");

    console.log(featureWanted)
     dataArr = data.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.cases)) - parseInt(fix_numbers(a.cases)) });
    lastClicked = "cases"
    featureWanted[0]++
  
    if(featureWanted[0]==1){
       
        d1 = 0;
        d2 = 10;
        count=1;
        document.getElementById("table-2").innerHTML=""
    }

    showOther(dataArr,"cases");
    resetOthers(0)

}); 

// total deaths btn
        document.getElementById("deathsbtn").addEventListener("click", function(){ 
            document.querySelector("#deathsbtn").classList.add("clickeds");
 
            // console.log(featureWanted)
             dataArr = data.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.deaths)) - parseInt(fix_numbers(a.deaths)) });
             lastClicked="deaths"

             featureWanted[1]++
            if(featureWanted[1]==1){
                 d1 = 0;
                 d2 = 10;
                count=1;
                document.getElementById("table-2").innerHTML=""
            }
            showOther(dataArr,"deaths"); 
            resetOthers(1)
        }); 

// new cases btn
        document.getElementById("newcasesbtn").addEventListener("click", function(){ 
            document.querySelector("#newcasesbtn").classList.add("clickeds");
 
            // console.log(featureWanted)
             dataArr = data.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.new_cases)) - parseInt(fix_numbers(a.new_cases)) });
             lastClicked="new_cases"

             featureWanted[2]++
            if(featureWanted[2]==1){
                 d1 = 0;
                 d2 = 10;
                count=1;
                document.getElementById("table-2").innerHTML=""
            }
            showOther(dataArr,"new_cases"); 
            resetOthers(2)
        }); 

// new deaths btn
        document.getElementById("newdeathsbtn").addEventListener("click", function(){ 
            document.querySelector("#newdeathsbtn").classList.add("clickeds");
             dataArr = data.countries_stat.sort(function (a, b) { return parseInt(fix_numbers(b.new_deaths)) - parseInt(fix_numbers(a.new_deaths)) });
             lastClicked="new_deaths"

             featureWanted[3]++
            if(featureWanted[3]==1){
                 d1 = 0;
                 d2 = 10;
                count=1;
                document.getElementById("table-2").innerHTML=""
            }
            showOther(dataArr,"new_deaths"); 
            resetOthers(3)
        }); 
// recovered btn
        document.getElementById("recoveredbtn").addEventListener("click", function(){ 
            document.querySelector("#recoveredbtn").classList.add("clickeds");
         
             dataArr = data.countries_stat.sort(function (a, b) { return  parseInt(fix_numbers(b.total_recovered) )- parseInt(fix_numbers(a.total_recovered)) });
        
             lastClicked="total_recovered"

             featureWanted[4]++
            if(featureWanted[4]==1){
                 d1 = 0;
                 d2 = 10;
                count=1;
                document.getElementById("table-2").innerHTML=""
            }
            showOther(dataArr,"total_recovered"); 
            resetOthers(4)
        }); 






    })).catch(err => {
        console.log(err);
    });

 
function resetOthers(inputname){
    for (i = 0; i < featureWanted.length; i++) {
        if(i!=inputname){
            featureWanted[i]=0;
           if(i==0){
            document.querySelector("#casesbtn").classList.remove("clickeds");

           }
           if(i==1){
            document.querySelector("#deathsbtn").classList.remove("clickeds");

           }
           if(i==2){
            document.querySelector("#newcasesbtn").classList.remove("clickeds");

           }
           if(i==3){
            document.querySelector("#newdeathsbtn").classList.remove("clickeds");

           }
           if(i==4){
            document.querySelector("#recoveredbtn").classList.remove("clickeds");

           }
        }
        
    }
}

function search(array, country_searched,tablename) {
    var rank = 1;
    array.forEach(element => {
    

        if (element.country_name == country_searched) {
            const text2 = document.getElementById("hello");
            if(tablename=="table-c"){
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

            if(tablename=="textsearch"){
                document.getElementById("searchbar").value="";
            
            }
            
        }
        else {
            rank++;
            
        }

    });

}



var count=1;
var d1 = 0;
var d2 = 10;
function showOther(array,featureName) {
    //    console.log(featureName)
    var list2 = array.slice(d1, d2 );
    
    list2.forEach(element => {
        const list = document.getElementById("table-2");
        let infotop
        if(featureName=="cases"){
        infotop=element.cases
        }
        if(featureName=="deaths"){
        infotop=element.deaths
        }
        if(featureName=="new_cases"){
        infotop=element.new_cases
        }
        if(featureName=="new_deaths"){
        infotop=element.new_deaths
        }
        if(featureName=="total_recovered"){
        infotop=element.total_recovered
        }

           
          let info =` 
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


//this removes the commas from the strings
function fix_numbers(num) {
   
    var fixed = num.replace(/,/g, "");
    return fixed
}

function jsUcfirst(string) 
{
    string=string.trim();
    if (string==="usa" || string==="Usa" || string=="United States"){
        return "USA";
    }
    if (string=="United Kingdom"){
        return "UK";
    }

    
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

}
function hidestuff(){
    document.getElementById('spinner').style.marginLeft ='10000px';
    document.getElementById('spinner').style.display='none';
    document.getElementById('spinner').innerHTML='none';
 
}

fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "dc242f04b2msh7b0cfd3a287e677p1545d0jsn00eab1fcb8c9"
    }
})
    .then(response => response.json().then(data => {
        const text = document.getElementById("global");
        let html = `
    <p class="world_stats lead uk-text-left@m uk-text-center">${data.total_cases} Total Cases</p>
    <p class="world_stats lead uk-text-left@m uk-text-center">${data.new_cases}  New Cases</p>
    <p class="world_stats lead uk-text-left@m uk-text-center">${data.total_deaths} Total Deaths</p>
    <p class="world_stats lead uk-text-left@m uk-text-center">${data.total_recovered} Total Recovered</p>
    <p class="world_stats lead uk-text-left@m uk-text-center">${data.new_deaths}  New Deaths</p>
    `;


        text.innerHTML = html;
    }))
    .catch(err => {
        console.log(err);
    });

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
        body.classList.toggle( 'dark');
        if(theme=="dark")
        localStorage.setItem('theme', 'light');
        else{
        localStorage.setItem('theme', 'dark');
        }
     
    
    };



     
