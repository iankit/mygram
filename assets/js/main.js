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
