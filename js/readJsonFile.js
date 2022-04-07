const clearOldDivs = () => {
  const cardInfoDivs = document.getElementsByClassName('cardInfo');
  
  while (cardInfoDivs.length !== 0) {
    const div = cardInfoDivs[0];
    div.remove();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  /* 3 buttons: Daily, Weekly, Monthly */
  const arrOfBtns = ['dailyBtn', 'weeklyBtn', 'monthlyBtn'];

  for (let j = 0; j < arrOfBtns.length; j++) {
    const btn = document.getElementById(arrOfBtns[j]);

    btn.addEventListener('click', () => {
      // remove old cardInfo divs
      clearOldDivs();
      
      // add new cardInfo divs
      const arrayOfNames = ['work', 'play', 'study', 'exercise', 'social', 'selfCare'];
      for (let i = 0; i < arrayOfNames.length; i++) {
        const card = document.getElementById(`${arrayOfNames[i]}Card`);
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('cardInfo');

        const currentHrs = document.createElement('div');
        currentHrs.innerHTML = '10hrs';
        currentHrs.classList.add('currentHours');
        cardInfo.append(currentHrs);

        const prevHours = document.createElement('div');
        prevHours.innerHTML = 'Last Day - 5hrs';
        prevHours.classList.add('previousHours');
        cardInfo.append(prevHours);
        card.append(cardInfo)
      }
    });
  };
});