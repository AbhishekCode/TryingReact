var currPage = 0;
var right = 0;
var wrong = 0;

var Choice = React.createClass({
  getInitialState: function() {
    return {
      className: ''
    };
  },
  
  onClick: function(ev) {
    if (this.props.correct) {
        right +=1;
        this.setState({className: 'correct'});
        var hscore = parseInt( localStorage.getItem('score')); 
        if(right > hscore)
            localStorage.setItem('score' , right);        
    } else {
        wrong +=1;
        this.setState({className: 'wrong'});
    }
    this.props.onAnswer(this.props.answer);
    currPage +=1;
    React.render(
          <App quizList= {quizList} />,
          document.getElementById('example')
    );
  },
  
  render: function() {
    return (
      <li onClick={this.onClick} className={this.state.className} className="choiceComponent">
         <p className = "choiceComponentText"> {this.props.answer} </p>
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
        <div className = "ScreenshotDiv"> <img src={this.props.imageURL} className="ScreenShot"/></div>
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
      <h2 className = "texts">{this.props.question}</h2>
      {this.renderImage()}
      {this.renderChoices()}
 
      </div>
    );
  }
});

var Counter = React.createClass({
    getInitialState: function () {
      return { clickCount: 0 };
    },
    handleClick: function () {
        React.render(
          <App quizList= {quizList} />,
          document.getElementById('example')
        );
    },
    render: function () {
      return (<div onClick={this.handleClick} className="clickDiv"><p>Next</p></div>);
    }
  });

var App = React.createClass({
    getQuestion: function() {
        var num = Math.random();
         if( localStorage.getItem('score') == null){
            localStorage.setItem('score' , 0); 
         }
         num = parseInt(localStorage.getItem('score'));
        var qlist = this.props.quizList;
        console.log("currpage "+ currPage + " ques " +this.props.quizList);
        if(currPage < qlist.length) {
            return (
                qlist[currPage]
              );
         }else {
               return (
                 false
              );       
        }

    },
    render: function() {
        var currQuiz = this.getQuestion();
        if(currQuiz == false) {
            var percent = parseInt((right/(currPage))*100);
            var resultText ="";
            if(percent > 85) {
                resultText = "Well Done! You are our SharmaJi ka son!";
            }else if (percent > 70) {
               resultText = "Good! , But look Sharmaji's son got 95%"; 
            }else if (percent > 50) {
               resultText = "meh!"; 
            }else {
                resultText = "Muh dikhane ke kabil nahi tu! "; 
            }
            return (
              <div>
              <h1 className = "texts">Screenshot quiz</h1>
              <h4 className = "texts"> Correct Answers ={right} && Incorrect Answers = {wrong}</h4>
              <h4 className = "texts">{resultText}</h4>
              <h2 className = "texts"> Game Over! </h2>
              <h2 className = "texts"> You got {percent} % questions right </h2>
              </div>
            );
        }else {
            var shuffledChoices = _.shuffle(currQuiz.choices);
            return (
              <div>
              <h1 className = "texts">Screenshot quiz</h1>
              <h4 className = "texts"> Correct Answers ={right}</h4>
              <h4 className = "texts"> Incorrect Answers = {wrong}</h4>
              <Quiz question={currQuiz.question} imageURL={currQuiz.imageURL} choices={shuffledChoices} explanation={currQuiz.explanation} />
              </div>
            );
        }
  }
});



var questions = [ {
          question: "Which movie is this?",
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
    {
          question: "Which movie is this?",
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
              answer: "Sooryavansham",
              correct: false
            }
          ],
          explanation: "Gunda Gunda Gunda the best movie ever ever ever!! reload page "
    },
    {
          question: "Which movie is this?",
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
    {
          question: "Which movie is this?",
          imageURL : "http://static.koimoi.com/wp-content/new-galleries/2014/06/humshakals-review-movie-stills.jpg",
          choices: [
            {
              answer: "Humshakls",
              correct: true
            },
            {
              answer: "Houseful",
              correct: false
            },
            {
              answer: "Houseful Two",
              correct: false
            },
            {
              answer: "De dana dan",
              correct: false
            }
          ],
          explanation: "Sajid khan rocks! reload page "
    },
    {
          question: "Which movie is this?",
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
              answer: "Roy",
              correct: false
            }
          ],
          explanation: "ab aur nahi bus! "
    },
    {
          question: "Which movie is this?",
          imageURL : "http://data1.ibtimes.co.in/en/full/542164/happy-new-year-20th-day-collection-box-office-srk-set-break-aamirs-3-idiot-record.jpg",
          choices: [
            {
              answer: "Happy New Year",
              correct: true
            },
            {
              answer: "Chennai Express",
              correct: false
            },
            {
              answer: "Om Shanti Om",
              correct: false
            },
            {
              answer: "None",
              correct: false
            }
          ],
          explanation: "ab aur nahi bus! "
    },
    {
          question: "Which movie is this?",
          imageURL : "https://ranranbolly.files.wordpress.com/2009/04/vlcsnap-50923.png?w=455&h=341",
          choices: [
            {
              answer: "Sooryavansham",
              correct: true
            },
            {
              answer: "Gunda",
              correct: false
            },
            {
              answer: "Arjun Pandit",
              correct: false
            },
            {
              answer: "Loha",
              correct: false
            }
          ],
          explanation: "ab aur nahi bus! "
    },
     {
          question: "Which movie is this?",
          imageURL : "http://i.dailymail.co.uk/i/pix/2015/05/12/21/2898FE6600000578-3078816-image-a-72_1431463824154.jpg",
          choices: [
            {
              answer: "Bajrangi Bhaijaan",
              correct: true
            },
            {
              answer: "Kyon ki",
              correct: false
            },
            {
              answer: "Bodygaurd",
              correct: false
            },
            {
              answer: "Mr and Mrs Khanna",
              correct: false
            }
          ],
          explanation: "ab aur nahi bus! "
    },
    {
          question: "Which movie is this?",
          imageURL : "http://static.koimoi.com/wp-content/new-galleries/2015/08/drishyam-box-office-9.jpg",
          choices: [
            {
              answer: "Drishyam",
              correct: true
            },
            {
              answer: "Singham",
              correct: false
            },
            {
              answer: "Singham Two",
              correct: false
            },
            {
              answer: "Atithi Tum Kab Jaoge?",
              correct: false
            }
          ],
          explanation: "ab aur nahi bus! "
    },
     {
          question: "Which movie is this?",
          imageURL : "http://www.missmalini.com/wp-content/uploads/2015/11/New-Image.jpg",
          choices: [
            {
              answer: "Kal Ho Na Ho",
              correct: true
            },
            {
              answer: "Kabhi Khushi Kabhi Gham",
              correct: false
            },
            {
              answer: "Kuch Kuch Hota Hai",
              correct: false
            },
            {
              answer: "Main Hoon Na",
              correct: false
            }
          ],
          explanation: "ab aur nahi bus! "
    }, 
];
React.render(
  <App quizList= {questions} />,
  document.getElementById('example')
);
