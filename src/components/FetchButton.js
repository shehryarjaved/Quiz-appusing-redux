import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "react-bootstrap";

function FetchButton(props) {
  const questionAmount = useSelector(state => state.options.amount_of_questions)
  const dispatch = useDispatch();

  const setLoading = value => {
    dispatch({
      type: 'CHANGE_LOADING',
      loading: value
    })
  }
  const setQuestions = value => {
    dispatch({
      type: 'SET_QUESTIONS',
      questions: value
    })
  }


  const handleQuery = async () => {
    let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`;

    setLoading(true);
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setQuestions(response.results);
        setLoading(false);
      });

  }
  return <Button variant="success" className="popup-btn" onClick={handleQuery} size="lg">{props.text} &#8594;</Button>;
}
export default FetchButton;