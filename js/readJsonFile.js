const clearOldDivs = () => {
  const cardInfoDivs = document.getElementsByClassName('cardInfo');

  while (cardInfoDivs.length !== 0) {
    const div = cardInfoDivs[0];
    div.remove();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  let jsonResponse;
  const http = new XMLHttpRequest();
  http.open('GET', 'data.json');
  http.overrideMimeType('application/json');
  http.responseType = 'json';
  http.onreadystatechange = function(e) {
    if (http.readyState === 4 && http.status == "200") {
      const { currentTarget } = e;
      const { response } = currentTarget;
      jsonResponse = response;
    }
  }

  http.send();

  const arrOfBtns = ['daily', 'weekly', 'monthly'];
  for (let j = 0; j < arrOfBtns.length; j++) {
    const calendarNoun = arrOfBtns[j] === 'daily'
        ? 'Day'
        : `${arrOfBtns[j].substring(0, 1).toUpperCase()}${arrOfBtns[j].substring(1, arrOfBtns[j].length - 2)}`;
    const btn = document.getElementById(arrOfBtns[j]);

    btn.addEventListener('click', () => {
      const oldActive = document.getElementsByClassName('active');
      console.log(oldActive);
      if (oldActive.length !== 0) {
        oldActive[0].classList.remove('active');
      }
      btn.classList.add('active');
      clearOldDivs();
      
      const arrayOfNames = ['work', 'play', 'study', 'exercise', 'social', 'selfCare'];
      for (let i = 0; i < arrayOfNames.length; i++) {
        const card = document.getElementById(`${arrayOfNames[i]}Card`);
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('cardInfo');

        const currentHrs = document.createElement('div');
        currentHrs.innerHTML = `${jsonResponse[i]['timeframes'][arrOfBtns[j]]['current']}hrs`;
        currentHrs.classList.add('currentHours');
        cardInfo.append(currentHrs);

        const prevHours = document.createElement('div');
        prevHours.innerHTML = `Last ${calendarNoun} - ${jsonResponse[i]['timeframes'][arrOfBtns[j]]['previous']}hrs`;
        prevHours.classList.add('previousHours');
        cardInfo.append(prevHours);
        card.append(cardInfo)
      }
    });
  };
});