let firstTeamScore = 0
let secondTeamScore = 0
let thirdTeamScore = 0



document.addEventListener(
  "click",
  (event) => {
    if (event.target.id === "saveScoreButton") {
      firstTeamScore += parseInt(document.getElementById("firstTeamScore").value)
      secondTeamScore += parseInt(document.getElementById("secondTeamScore").value)
      thirdTeamScore += parseInt(document.getElementById("thirdTeamScore").value)


    }
  }
)