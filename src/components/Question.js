import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';

const decodeHTML = function (html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

function Question() {
  const [questions, setQuestions] = useState(useSelector(state => state.questions));
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const score = useSelector(state => state.options.score)
  const [answerSelected, setAnswerSelected] = useState(false)
  const questionIndex = useSelector(state => state.options.index)
  const encodedQuestions = useSelector((state) => state.questions)
  const questionStatus = useSelector((state) => state.questionStatus)
  const dispatch = useDispatch()
  const question = questions[questionIndex]
  const answer = question.correct_answer
  const [options, setOptions] = useState([])

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map(q => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(a => decodeHTML(a))
      }
    })

    setQuestions(decodedQuestions)
  }, [encodedQuestions])

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers]
    answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer)

    setOptions(answers)
  }, [question])

  const handleListItemClick = event => {
    setAnswerSelected(true)
    setSelectedAnswer(event.target.textContent)

    if (event.target.textContent === answer) {
      dispatch({
        type: 'SET_SCORE',
        score: score + 1,
      })

    }
    else {
      dispatch({
        type: 'SET_QUESTION_STATUS',
        questionStatus: event.target.textContent
      })
    }

    questionStatus[questionIndex] = event.target.textContent;
  }

  const handleQuesNavigation = event => {
    if (event.target.name === 'next') {
      if (questionIndex + 1 <= questions.length) {
        setSelectedAnswer(null)
        dispatch({
          type: 'SET_INDEX',
          index: questionIndex + 1,
        })
      }
    } else {
      if (questionIndex - 1 >= 0) {
        setSelectedAnswer(null)
        dispatch({
          type: 'SET_INDEX',
          index: questionIndex - 1,
        })
      }
    }
    setAnswerSelected(false);
  }

  const getClass = option => {
    if (option === questionStatus[questionIndex]) {
      return 'selected';
    }

    if (!answerSelected) {
      return ``;
    }

    if (option === selectedAnswer) {
      return `selected`
    }
  }

  return (
    <Card className="text-center questions" bg="light">
      <Card.Header>Question {questionIndex + 1} / <b>{questions.length}</b></Card.Header>
      <Card.Body>
        <Card.Title>{question.question}</Card.Title>
        <Card.Text>
          <ul className="option-list">
            {options.map((option, i) => (
              <li key={i} onClick={handleListItemClick} className={getClass(option)}>
                {option}
              </li>
            ))}
          </ul>
        </Card.Text>
        {questionIndex > 0 && <Button name='previous' variant="secondary" className="mr-2" onClick={handleQuesNavigation}>Previous</Button>}
        <Button name='next' variant="primary" onClick={handleQuesNavigation}>{questionIndex + 1 < questions.length ? 'Next' : 'Submit Quiz'}</Button>
      </Card.Body>
    </Card>
  )
}
export default Question;