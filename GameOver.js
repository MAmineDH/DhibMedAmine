var button = document.getElementById("otherGameButton");
button.addEventListener("click", function() {
    // Redirect to the specified page1
    window.location.href = "index.html";
  });
var a = JSON.parse(localStorage.getItem('final'))
console.log(a);