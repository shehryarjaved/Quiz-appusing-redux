import React from 'react';
import FetchButton from "./FetchButton";
import { Modal } from "react-bootstrap";

const Popup = () => {

  const popupText = `<p> This quiz consists of 10 multiple - choice questions. No data will be collected on the website regarding your responses or how many times you take the quiz. Keep the following in mind:</p><ul><li>Each question in the quiz is of multiple-choice or "true or false" format. Read each question carefully, and click on the option to select the option.</li><li>After responding to a question, click on the "Next" button at the bottom to go to the next question and "Previous" to go to the previous question.</li><li>When you reach last question click "Submit" to submit the quiz.</li><li>After Submit you are able to see the questions with your response.</li></ul><p>To start, click the <strong>"Take the Quiz"</strong> button. When finished, click the <strong>"Submit Quiz"</strong> button.</p>`;
  return (
    <>
      <Modal show size="lg" centered>
        <Modal.Header>
          <Modal.Title>Quiz Instruction</Modal.Title>
        </Modal.Header>
        <Modal.Body dangerouslySetInnerHTML={{ __html: popupText }} />
        <Modal.Footer>
          <FetchButton text="Take the Quiz" />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup