const links = [
    {
      label: "Week 1 notes",
      url: "week1/index.html"
    },
    {
      label: "Week 2 notes",
      url: "week2/index.html" 
    },
    {
      label: "Week 3 notes",
      url: "week3/index.html" 
    },
    {
      label: "Week 4 notes",
      url: "week4/index.html" 
    },
    {
      label: "Week 5 notes",
      url: "week5/index.html" 
    },
    {
      label: "Challenge One",
      url: "challengeOne/index.html"
    },
    {
      label: "Week 7 notes",
      url: "week7/index.html" 
    },
    {
      label: "Week 8 notes",
      url: "week8/index.html" 
    },
    {
      label: "Week 9 notes",
      url: "week9/index.html" 
    },
    {
      label: "Week 10 notes",
      url: "week10/index.html" 
    },
    {
      label: "Challenge Two",
      url: "challengeTwo/index.html" 
    }


  ]

function loadIndex(){
    const ol = document.querySelector("#linksList");

    links.forEach( link => {
        const li = document.createElement("li");
        const href = document.createElement("a");
        href.setAttribute("href", link.url);
        href.innerText = link.label;

        li.appendChild(href);
        ol.appendChild(li);
    })
}