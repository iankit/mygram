var loadedData;
var northWards, southWards, eastWards, councillor;

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
  xobj.open('GET', 'https://raw.githubusercontent.com/iankit/mygram/master/assets/data/data.json', true);
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

function changeArea(value) {
  var wardsOfDelhi = {
    northDelhi: northWards,
    southDelhi: southWards,
    eastDelhi: eastWards
  }
  if (value.length == 0) document.getElementById("ward").innerHTML = "<option></option>";
  else {
    var wardOptions = "<option value=\"\" disabled selected>Select Ward</option>";
    for (categoryId in wardsOfDelhi[value]) {
      wardOptions += "<option>" + wardsOfDelhi[value][categoryId] + "</option>";
    }
  document.getElementById("ward").innerHTML = wardOptions;
  }
}

function selectId(name) {
  return document.getElementById(name);
}

var options = selectId("area");
options.onchange = function() {
  changeArea(options.value);
}

function fetchWardPerson(area, ward) {
  for(areas in loadedData) {
    if(areas == area) {
      loadedData[areas].filter(function(wards) {
        if(wards.Ward == ward) {
          councillor = wards.Winner;
        }
      })
    }
  }
}

selectId("onSubmit").onclick = function(e){
  var areaValue = selectId("area").value;
  var wardValue = selectId("ward").value;
  if (areaValue && wardValue) {
    var heading = selectId("heading");
    heading.style.color = "#00764d";
    heading.innerHTML = "पंजीकरण करने के लिए धन्यवाद";
    fetchWardPerson(areaValue,wardValue);
    selectId("areaName").innerHTML = `<p>आपका क्षेत्र:<strong class="resultData">${areaValue.replace(/([A-Z])/g, ' $1').trim()}</strong> </p>`;
    selectId("wardName").innerHTML = `<p>आपका वार्ड:<strong class="resultData">${wardValue}</strong> </p>`;
    selectId("onSubmit").style.display = "none";
    selectId("wardPerson").innerHTML =
      `<div class="3u 4u(tablet) 12u(mobile)">
          <p class="wardPerson">वार्ड पार्षद: </p>
        </div>
        <div class="4u 12u(mobile)">
          <img src="images/dummy.jpeg" alt="Ward Councillor" class="wardImage">
          <h5>${councillor}</h5>
        </div>`;
    var subFooterText = document.createElement("h3");
    subFooterText.className = "subFooter";
    subFooterText.innerHTML = "हम इस मंच के माध्यम से आपके साथ लगातार संपर्क में रहेंगे";
    document.getElementById("contentBox").append(subFooterText);
    var namaste = document.createElement("h2");
    namaste.className = "footerText";
    namaste.innerHTML = `धन्यवाद`;
    document.getElementById("contentBox").append(namaste);
    selectId("errorMsg").innerHTML = "";
  } else {
    console.log(areaValue, wardValue, "values")
    selectId("errorMsg").innerHTML = "कृपया क्षेत्र और वार्ड दोनों दर्ज करें";
  }
}
