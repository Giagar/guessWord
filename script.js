const words = [
    {id: "bathroom", en: "bathroom", ita: "bagno", sound:"http://www.wordreference.com/audio/en/uk/rp/en006937.mp3"},
    {id: "bedroom", en: "bedroom", ita: "camera da letto", sound:"http://www.wordreference.com/audio/en/uk/rp/en007296.mp3"},
    {id: "kitchen", en: "kitchen", ita: "cucina", sound:"http://www.wordreference.com/audio/en/uk/rp/en049113.mp3"},
    {id: "hall", en: "hall", ita: "entrata", sound:"http://www.wordreference.com/audio/en/uk/rp/en041123.mp3"},
    {id: "livingRoom", en: "living room", ita: "soggiorno", sound:"http://www.wordreference.com/audio/en/uk/rp/en051827.mp3"},
    {id: "basement", en: "basement", ita: "seminterrato", sound:"http://www.wordreference.com/audio/en/uk/rp/en006765.mp3"}
  ];
  
  let content = "";
  
  let playRightAudio = () => {
    rightAudio.play();
  }
  
  let playMistakeAudio = () => {
    mistakeAudio.play();
  }
  
  const mistakeSoundUrl = "https://garbaweb.com/archive/sounds/effects/wrong_answer.mp3";
  
  
  //-----------------------------------------------
  
  let newWord = "";
  let num = 0;
  let rightAudio;
  let mistakeAudio;
  let containerArr = ["container1", "container2", "container3", "container4"];
  
  let tempRandomNumber = 0;
  let btnContent;
  let tempWordsClone;
  let otherContent;
  
  let container = "container4";
  
  let wordsClone = [... words];
  let containerArrClone = [...containerArr];
  
  let getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
  
  //get a random italian word from the cloned words arr
  const getNewWord = () => {
    // if (wordsClone.length > 0){
      num = getRandomNumber(0, (wordsClone.length - 1));
      // console.log("getNewWord: " + wordsClone[num].ita)
      return wordsClone[num].ita;
    // }else{
      document.getElementById("newWord").disabled = true;
    // }
  };
  
  //display the output of getNewWord() in the displayNewWord div
  const displayNewWord = (x) => {
    document.getElementById("displayNewWord").innerHTML = x;
  }
  
  //show the en button
  const displayButton = (index, arr) => {
    document.getElementById(index).innerHTML = 
      `<div class="enButton" onClick="playRightAudio()">
      <p>${arr.en}</p>
      <audio id=${arr.id}>
        <source src=${arr.sound} type="audio/mpeg"></source>
      </audio>
    </div>`;
    rightAudio = document.getElementById(arr.id);
    // console.log(wordsClone[num].id)
  }
  
  //eliminate the word just used from the cloned arr
  const deleteWord = () => {
    if (wordsClone.length >= 1){
    delete wordsClone[num];
    wordsClone = wordsClone.filter((x) => x !== undefined);
    // console.log(wordsClone);
    }else{
      displayNewWord("Done");
      document.getElementById(container).innerHTML = "Done";
    }
  }
  
  //disable newWord button when all the words in the arr are done
  const disableHandleNewWord = () => {
    let selection = document.getElementById("newWord");
    selection.disabled = true;
    selection.classList.add("disabled");
  }
  
  
  //----------- Setting the random container --------//
  //randomly choose a container for the right button
  let randomContainer = (min, max) => container = "container" + getRandomNumber(min, max);
  
  
  //determine what happens in the other containers when randomContainer is called
  let inTheOtherContainers = () => {
    //arr of words (without the one it is currently chosen)to be put in the other containers
    tempWordsClone = [...words];
    tempWordsClone = tempWordsClone.filter((x) => {
      if (x.id !== wordsClone[num].id){
        return x;
      }
    })
    
      containerArr.forEach((x) => {
        tempRandomNumber = getRandomNumber(0, tempWordsClone.length-1);
        // otherContent = tempWordsClone[tempRandomNumber].id;
        otherContent = 
          `<div class="enButton" onClick="playMistakeAudio()">
            <p>${tempWordsClone[tempRandomNumber].en}</p>
            <audio id=${tempWordsClone[tempRandomNumber].id}>
             <source src=${mistakeSoundUrl} type="audio/mpeg"></source>
            </audio>
          </div>`
          
        //audio has to change everytime
     
        x !== container? document.getElementById(x).innerHTML = otherContent: null;
        
        mistakeAudio = document.getElementById(tempWordsClone[tempRandomNumber].id);
        // console.log("before: ", tempWordsClone)
        
        delete tempWordsClone[tempRandomNumber];
        tempWordsClone = tempWordsClone.filter((z) => {
          return z !== undefined;
        })
      });
  }
  
  
                         
  //----------- Events --------//
  //onClick event for display the new word in the div
  let handleNewWord = () => {
    displayNewWord(getNewWord());
    displayButton(randomContainer(1, 4), wordsClone[num]);
    inTheOtherContainers();
    deleteWord();
    
    //last: check whether there are still words wordsClone; if not: disable the  newWord button
    wordsClone.length === 0? disableHandleNewWord(): null;
  }
  
  //onClick event for resetting: equal to reload the page
  let handleReset = () => {
    document.getElementById(container).innerHTML = "Waiting - animation";
    displayNewWord("");
    wordsClone = [... words];
    document.getElementById("newWord").disabled = false;
    // console.log("wordsClone.length after reset= " + wordsClone.length);
  }
  
  
  
  
  
  
  