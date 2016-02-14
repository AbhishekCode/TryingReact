var Choice = React.createClass({
  getInitialState: function() {
    return {
      className: ''
    };
  },
  
  onClick: function(ev) {
    if (this.props.correct) {
      this.setState({className: 'correct'});
        var score = parseInt( localStorage.getItem('score')); 
        score +=1;
         localStorage.setItem('score' , score); 
    } else {
      this.setState({className: 'wrong'});
             var score = parseInt( localStorage.getItem('score')); 
        score -=1;
         localStorage.setItem('score' , score); 
    }
    this.props.onAnswer(this.props.answer);
  },
  
  render: function() {
    return (
      <li onClick={this.onClick} className={this.state.className}>
      {this.props.answer}
      </li>
    );
  }
});

var Quiz = React.createClass({
  getInitialState: function() {
    return {
      explanation: '',
    };
  },

  onAnswer: function(answer) {
    this.setState({explanation: this.props.explanation});
  },
  renderImage: function() {
      return (
        <img src={this.props.imageURL}/>
      );

  },
  renderChoices: function() {
    return this.props.choices.map(function(choice) {
      return (
        <Choice answer={choice.answer} correct={choice.correct} onAnswer={this.onAnswer} key={choice.answer} />
      );
    }.bind(this));
  },
  
  render: function() {
    return (
      <div>
      <h2>{this.props.question}</h2>
      {this.renderImage()}
      {this.renderChoices()}
      <p className="hidden">{this.state.explanation}</p>
      </div>
    );
  }
});

var App = React.createClass({
    getQuestion: function() {
        var num = Math.random();
        console.log(num);
         if( localStorage.getItem('score') == null){
            localStorage.setItem('score' , 0); 
         }
         if(num < 0.5) {
            return (
                this.props.quizList.quiz
              );
         }else {
               return (
                this.props.quizList.quizOne
              );
            
        }

    },
    render: function() {
    var currQuiz = this.getQuestion();
    var shuffledChoices = _.shuffle(currQuiz.choices);
    
    return (
      <div>
      <h1>Screenshot quiz</h1>
      <h4> score ={localStorage.getItem('score')}</h4>
      <Quiz question={currQuiz.question} imageURL={currQuiz.imageURL} choices={shuffledChoices} explanation={currQuiz.explanation} />
      </div>
    );
  }
});

var quizList = {
  quiz : {
  question: "which is movie is this?",
  imageURL : "http://www.glamsham.com/movies/news/13/jul/3-idiots-wallpapers.jpg",
  choices: [
    {
      answer: "3 idiots",
      correct: true
    },
    {
      answer: "Tare Zameen Par",
      correct: false
    },
    {
      answer: "PK",
      correct: false
    },
    {
      answer: "Dil Chahta hai",
      correct: false
    }
  ],
  explanation: "who cares for explanation。 ,  reload page"
},
  quizOne : {
  question: "which is movie is this?",
  imageURL : "https://i.ytimg.com/vi/czt_Eroo_bs/hqdefault.jpg",
  choices: [
    {
      answer: "Gunda",
      correct: true
    },
    {
      answer: "Loha",
      correct: false
    },
    {
      answer: "Rowdy Rathore",
      correct: false
    },
    {
      answer: "Don",
      correct: false
    }
  ],
  explanation: "Gunda Gunda Gunda the best movie ever ever ever!! reload page "
}
};

React.render(
  <App quizList= {quizList} />,
  document.getElementById('example')
);
