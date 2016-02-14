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
      <a href={window.location.href}>next</a>
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
         num = parseInt(localStorage.getItem('score'));
         var qlist = [this.props.quizList.quiz , this.props.quizList.quizOne,this.props.quizList.quizTwo ,
                     this.props.quizList.quizThree,this.props.quizList.quizFour ];
         if(num < qlist.length) {
            return (
                qlist[num]
              );
         }else {
               return (
                qlist[qlist.length-1]
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
    },
     quizTwo : {
          question: "which is movie is this?",
          imageURL : "http://www.bharatstudent.com/ng7uvideo/bs/gallery/normal/movies/bw/2007/aug/ramgopalvarmakiaag/ramgopalvarmakiaag_030.jpg",
          choices: [
            {
              answer: "Aag",
              correct: true
            },
            {
              answer: "Sholay",
              correct: false
            },
            {
              answer: "Dilwale",
              correct: false
            },
            {
              answer: "Company",
              correct: false
            }
          ],
          explanation: "Aag the classic movie!! reload page "
    },
     quizThree : {
          question: "which is movie is this?",
          imageURL : "http://static.koimoi.com/wp-content/new-galleries/2014/06/humshakals-review-movie-stills.jpg",
          choices: [
            {
              answer: "Humshakls",
              correct: true
            },
            {
              answer: "houseful",
              correct: false
            },
            {
              answer: "houseful2",
              correct: false
            },
            {
              answer: "De dana dan",
              correct: false
            }
          ],
          explanation: "Sajid khan rocks! reload page "
    },
     quizFour : {
          question: "which is movie is this?",
          imageURL : "http://cdn3.thr.com/sites/default/files/imagecache/landscape_928x523/2015/07/bombay-velvet.jpg",
          choices: [
            {
              answer: "Bombat velvet",
              correct: true
            },
            {
              answer: "Barfi",
              correct: false
            },
            {
              answer: "Tamasha",
              correct: false
            },
            {
              answer: "roy",
              correct: false
            }
          ],
          explanation: "ab aur nahi bus! "
    }
};

React.render(
  <App quizList= {quizList} />,
  document.getElementById('example')
);
