window.MapRussiaQuiz = function () {
  let data = window.RussiaRegions;
  let currentQuestion;
  let nextQuestionButton;
  let polygons = [];
  let controlContainer;
  let messageContainer;
  let svg;

  function handleNextQuestion()
  {
    //Стереть кнопку
    controlContainer.innerHTML = '';
    //Стереть информацию
    messageContainer.innerHTML = '';
    //Покрасить карту в один цвет
      for(let i = 0; i<polygons.length;i++){
          polygons[i].fill({color:'black'});
      }
    updateQuestion();
    //Отрисовать вопрос
    renderQuestion();
  }

  function renderQuestion() {
      messageContainer.innerHTML = 'Где находится, ' + currentQuestion.n + '?';
  }

  function getCurrentQuestionPolygon(){
    for(let i = 0; i<polygons.length;i++){
      if(polygons[i].node.dataset.id === currentQuestion.id){
        return polygons[i];
      }
    }
    return false;
  }

  function handleAnswer()
  {
    //Показать результат
      console.log(this);
    if(this.node.dataset.id === currentQuestion.id)
    {
      //Подсветить ответ зеленым
      this.fill({color:'green'});
      //Поздравить с правильным ответом
      messageContainer.innerHTML = '';
      messageContainer.innerHTML = 'Правильный!';
      //Отрисовать кнопку прехода к следующему ответу
      controlContainer.appendChild(nextQuestionButton);
    }else{
      //Указать неправильный ответ
      messageContainer.innerHTML = 'Неверно! Вы указали ' + this.node.dataset.name;
      //Подсветить неправильный ответ красным
      this.fill({color:'red'});
      //Подсветить правильный ответ зеленым
      getCurrentQuestionPolygon().fill({color:'green'});
      //Отрисовать кнопку прехода к следующему ответу
      controlContainer.appendChild(nextQuestionButton);
    }
  }

  function updateQuestion()
  {
    currentQuestion = data[Math.floor(Math.random() * data.length)];
  }

  function addEventListeners()
  {
    nextQuestionButton.addEventListener('click',handleNextQuestion);
    for(let i = 0;i<polygons.length;i++){
      polygons[i].click(handleAnswer);
    }
  }

  this.init = function () {
    controlContainer = document.querySelector('.control');

    messageContainer = document.querySelector('.message');

    nextQuestionButton = document.createElement('button');
    nextQuestionButton.innerHTML = 'Следующий вопрос';

    svg = SVG('map').size(1200, 700);

    for(let i=0;i<data.length;i++){
      let path = svg.path(data[i].d);
      path.node.setAttribute('data-name',data[i].n);
      path.node.setAttribute('data-id',data[i].id);
      polygons.push(path);
    }
    addEventListeners();
    updateQuestion();
    renderQuestion();
  }
};

$(document).ready(function () {
    let mapGame = new MapRussiaQuiz();
    mapGame.init();
});