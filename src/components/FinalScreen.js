import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Table } from 'react-bootstrap'

const decodeHTML = function (html) {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

function FinalScreen() {
  const { score, amount_of_questions } = useSelector((state) => state.options)
  const { questions, questionStatus } = useSelector((state) => state)

  const checkStatus = (index) => {
    const selected = questionStatus[index];

    if (selected === questions[index].correct_answer) {
      return 'CORRECT'
    }
    else if (selected === null || selected === undefined) {
      return 'SKIPPED'
    }
    else {
      return 'INCORRECT'
    }
  }

  return (
    <Card className="text-center" bg="light">
      <Card.Header>Final Score: {score}/{amount_of_questions}</Card.Header>
      <Card.Body>
        <Card.Text>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Attempt Status</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{decodeHTML(question.question)}</td>
                  <td>{checkStatus(index)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
export default FinalScreen