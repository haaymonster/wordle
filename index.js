let todaysWord = "APPLE";
let index = 0;
let line = 0;

const handleEnterDown = () => {
  const gameOver = (succed) => {
    const popUp = document.querySelector(".popup");
    popUp.style.display = "block";
    window.removeEventListener("keydown", handleKeyDown);
    if (succed) {
      popUp.innerText = "Congrats!!!";
    } else {
      popUp.innerText = "Failed";
      popUp.style.backgroundColor = "red";
    }
  };
  let correct = 0;
  for (let i = 0; i < 5; i++) {
    const block = document.querySelector(`.block[data-index = "${line}${i}"]`);
    if (block.innerText === todaysWord[i]) {
      block.style.backgroundColor = "green";
      correct++;
    } else if (todaysWord.includes(block.innerText)) {
      block.style.backgroundColor = "orange";
    } else {
      block.style.backgroundColor = "gray";
    }
  }

  if (correct === 5) {
    gameOver(true);
  } else {
    if (line === 5) {
      gameOver(false);
      return;
    }
    line++;
    index = 0;
  }
};

function handleKeyDown(e) {
  const keyCode = e.keyCode;
  let currentBlock = document.querySelector(
    `.block[data-index = "${line}${index}"]`
  );
  console.log(keyCode);
  if (keyCode === 8) {
    // delete
    if (index > 0) {
      currentBlock = document.querySelector(
        `.block[data-index = "${line}${index - 1}"]`
      );
      currentBlock.innerText = "";
      index--;
    }
  } else if (index === 5) {
    if (keyCode === 13) {
      // enter
      handleEnterDown();
    } else return;
  } else if (keyCode >= 65 && keyCode <= 90) {
    const key = e.key.toUpperCase();
    currentBlock.innerText = key;
    index++;
  }
}

const AppStart = () => {
  const handleOkClick = () => {
    const word = document.querySelector("#tWord").value;
    if (word.length < 5) {
      alert("Five Characters!!!");
    } else if (!/^[a-zA-Z]+$/.test(word)) {
      alert("Only Alphabet!!!");
    } else {
      console.log("word", word);
      todaysWord = word.toUpperCase();
      okBtn.removeEventListener("click", handleOkClick);
      document.querySelector(".setWord").style.opacity = 0;
      window.addEventListener("keydown", handleKeyDown);
    }
  };

  const okBtn = document.querySelector(".button");

  okBtn.addEventListener("click", handleOkClick);
};

AppStart();
