let xhrusers = new XMLHttpRequest();
xhrusers.open('GET', '/data/cohorts/lim-2018-03-pre-core-pw/users.json', true);
xhrusers.onload = function() {
    if (xhrusers.status >= 200 && xhrusers.status < 400) {
        // Success!
        let data = JSON.parse(xhrusers.responseText);
        console.log(data);
      } else {
         // We reached our target server, but it returned an error
      }
}
xhrusers.send ();
console.log(xhrusers);
