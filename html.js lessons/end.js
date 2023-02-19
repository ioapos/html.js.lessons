const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

//const highScores = localStorage.setItem("highScores", JSON.stringify([])); // is not going to work because local storage accept only string δι᾽ὀῦ json, χρήζει μετατροπῆς ἐς ἀριθμόν ἱνα ἀποθηκευθῇ τοπικῶς
//console.log(JSON.parse(localStorage.getItem("highScores")) || []); // JSON.parce to get an array, διά σειρά μετατροπἠν

const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //we storage the highScores as an stringify array in local storage, but if the is not a highscore it will show an empty array
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  console.log(username.value);
  saveScoreBtn.disabled = !username.value; //the score button will be disabled again (see end html) if there is no input ὡρισμένη λειτουργία μετἀ διαβιβαστοῦ γεγονότος ἐντὸς  ητμλ  ἐγγράφου
});

saveHighScore = e => {
  console.log("clicked the save button");
  e.preventDefault();

  const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value,
  };
  // you add, then you sort and lastly you splice the score, ofcourse you update in the local storage and stringify it
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score); // js function for arrays /from highest to lowest score
  highScores.splice(5); // cut everything after index 5 in highScores array
  localStorage.setItem("highScores", JSON.stringify(highScores));

  window.location.assign("/");
  console.log(highScores);
};
