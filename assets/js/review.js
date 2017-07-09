document.getElementById("onReviewSubmit").onclick = function() {
  var reviewBody = document.getElementById("reviewBody");
  reviewBody.innerHTML = "";
  var reviewSubmitHeading = document.createElement("h2");
  reviewSubmitHeading.className = "reviewHeader";
  reviewSubmitHeading.innerHTML = "पंजीकरण करने के लिए धन्यवाद";
  var hr = document.createElement("hr");
  var subFooterText = document.createElement("h3");
  subFooterText.className = "subFooter";
  subFooterText.innerHTML = "हम इस मंच के माध्यम से आपके साथ लगातार संपर्क में रहेंगे";
  document.getElementById("contentBox").append(subFooterText);
  var thankyou = document.createElement("h2");
  thankyou.className = "footerText";
  thankyou.innerHTML = `धन्यवाद`;
  reviewBody.append(reviewSubmitHeading);
  reviewBody.append(hr)
  reviewBody.append(subFooterText)
  reviewBody.append(thankyou)
}