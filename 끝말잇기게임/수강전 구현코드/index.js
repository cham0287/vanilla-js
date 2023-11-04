let participantsNum = 0;
let wordHistory = [];
let currentWord;
const participantNames = [];
let count = 0;

const currentWordSpan = document.querySelector('.currentWord');
const currentOrderSpan = document.querySelector('.currentOrder');
const inputForm = document.querySelector('#inputForm');
const inputTag = document.querySelector('#word');

const getParticipantCounts = () => {
  while (participantsNum < 2) {
    participantsNum = Number(prompt('참가할 인원의 수를 입력해주세요'));
    if (participantsNum === 1) {
      alert('최소 2명부터 게임을 진행할 수 있습니다.');
    }
    if (Number.isNaN(participantsNum)) {
      alert('올바른 숫자를 입력해주세요.');
      participantsNum = 0;
    }
  }
};

const getNamesOfParticipants = () => {
  for (let i = 0; i < participantsNum; i++) {
    const name = prompt(`${i + 1} 번째 참가자의 이름을 입력해주세요`);
    participantNames.push(name);
  }
};

const setStartWord = () => {
  currentWord = prompt('시작할 단어를 알려주세요');
  currentWordSpan.textContent = currentWord;
};

const setOrders = () => {
  // NOTE: 시작 순서를 랜덤 정렬
  participantNames.sort((a, b) => Math.random() - 0.5);

  // NOTE: 현재 차례인 사람을 표시
  currentOrderSpan.textContent = participantNames[count];

  const orderListTag = document.querySelector('.orderList');

  participantNames.forEach((name) => {
    const participantLiTag = document.createElement('li');
    participantLiTag.textContent = name;
    orderListTag.appendChild(participantLiTag);
  });
};

getParticipantCounts();
getNamesOfParticipants();
setStartWord();
setOrders();

const wordPass = (newWord) => {
  console.log('통과함');
  currentWordSpan.textContent = newWord;
  currentWord = newWord;
  wordHistory.push(newWord);
  inputTag.value = '';

  count++;
  count = count % participantNames.length;
  currentOrderSpan.textContent = participantNames[count];
};

inputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputText = inputTag.value;

  if (currentWord[currentWord.length - 1] !== inputText[0]) {
    alert(`틀렸습니다! ${participantNames[count]}가 졌네요🥹!`);
    return;
  }

  if (wordHistory.includes(inputText)) {
    alert(`이미 사용된 단어입니다! ${participantNames[count]}가 졌네요🥹!`);
    return;
  }

  wordPass(inputText);
});
