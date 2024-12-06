"use strict";
(function () {
  window.addEventListener("load", init);
  function init() {
    document.getElementById("echo-btn").addEventListener("click", requestEcho);
    document.getElementById("add-btn").addEventListener("click", addEcho);
    document.getElementById("del-btn").addEventListener("click", deleteEcho);
// add 2 more lines  
}

  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response;
  }

  function requestEcho() {
    const contents = document.getElementById("what-to-echo").value;
    fetch("game?rank=" + contents)
      .then(checkStatus)
      .then(resp => resp.text())
      .then(resp => {
        document.getElementById("echoed").textContent = resp;
      })
      .catch(console.error);
  }

  function addEcho() {
    const rank = document.getElementById("rank").value; // change this
    const name = document.getElementById("name").value;
    const platform = document.getElementById("platform").value;

    const year = document.getElementById("year").value; 
    const genre = document.getElementById("genre").value; 
    const publisher = document.getElementById("publisher").value; 
    const na_sales = document.getElementById("na_sales").value; 
    const eu_sales = document.getElementById("eu_sales").value; 
    const jp_sales = document.getElementById("jp_sales").value; 
    const other_sales = document.getElementById("other_sales").value; 
    const global_sales = document.getElementById("global_sales").value; 
   fetch("game", { method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify(>
     rank: rank, name: name, platfrom: platform, year: year,
     genre: genre, publisher: publisher, na_sales: Number(na_sales),
     eu_sales: Number(eu_sales), jp_sales: Number(jp_sales), other_sales: Number(other_sales),
     global_sales: Number(global_sales)
   }), }) // change this
      .then(checkStatus) 
      .then(resp => resp.text())        
      .catch(console.error);
  }
  
function deleteEcho() {
    const contents = document.getElementById("what-to-delete").value; // change this 
    fetch("game?rank=" + contents, { method: "DELETE" }) 
      .then(checkStatus)
      .then(resp => resp.text())
      .catch(console.error);
  }
})();
