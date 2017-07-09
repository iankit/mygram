var loadedData;
var northWards, southWards, eastWards;

function getUsernameParameter(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var phone = getUsernameParameter('username');
document.getElementById("phoneNumber").innerHTML = "+91 " + phone;

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'https://api.myjson.com/bins/keokn', true);
  xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    }
  xobj.send(null);
}

loadJSON(function(response) {
  loadedData = JSON.parse(response);
  northWards = reduceData(loadedData.northDelhi);
  southWards = reduceData(loadedData.southDelhi);
  eastWards = reduceData(loadedData.eastDelhi);
});

function reduceData(data) {
  return data.reduce(function(a,b){
    return a.concat(b.Ward)
  }, []);
}

function changecat(value) {
  var wardsOfDelhi = {
    NorthDelhi: northWards,
    SouthDelhi: southWards,
    EastDelhi: eastWards
  }
  if (value.length == 0) document.getElementById("ward").innerHTML = "<option></option>";
  else {
    var wardOptions = "";
    for (categoryId in wardsOfDelhi[value]) {
      wardOptions += "<option>" + wardsOfDelhi[value][categoryId] + "</option>";
    }
  document.getElementById("ward").innerHTML = wardOptions;
  }
}


function selectId(name) {
  return document.getElementById(name);
}

selectId("onSubmit").onclick = function(e){
  var heading = selectId("heading");
  heading.style.color = "#00764d";
  heading.innerHTML = "पंजीकरण करने के लिए धन्यवाद";
  selectId("areaName").innerHTML = "<p>आपका क्षेत्र:   " + "<strong>" + selectId("area").value + "</strong> </p>";
  selectId("wardName").innerHTML = "<p>आपका वार्ड:   " + "<strong>" + selectId("ward").value + "</strong> </p>";
  selectId("onSubmit").style.display = "none";
  var tert = document.createElement("h2");
  console.log(tert)
  tert.innerHTML = "हम इस मंच के माध्यम से आपके साथ लगातार संपर्क में रहेंगे";
  document.getElementById("contentBox").append(tert);
}
