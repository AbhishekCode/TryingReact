var Choice = React.createClass({
  getInitialState: function() {
    return {
      className: ''
    };
  },
  
  onClick: function(ev) {
    if (this.props.correct) {
      this.setState({className: 'correct'});
    } else {
      this.setState({className: 'wrong'});
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
      {this.renderChoices()}
      <p className="hidden">{this.state.explanation}</p>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    var shuffledChoices = _.shuffle(this.props.quiz.choices);
    
    return (
      <div>
      <h1>Which movie is this?</h1>
      <Quiz question={this.props.quiz.question} choices={shuffledChoices} explanation={this.props.quiz.explanation} />
      </div>
    );
  }
});

var quiz = {
  question: "Post a question?",
  choices: [
    {
      answer: "answer1",
      correct: true
    },
    {
      answer: "answer2",
      correct: false
    },
    {
      answer: "answer3",
      correct: false
    },
    {
      answer: "answer4",
      correct: false
    }
  ],
  explanation: "who cares for explanation。"
};

React.render(
  <App quiz={quiz} />,
  document.getElementById('example')
);
