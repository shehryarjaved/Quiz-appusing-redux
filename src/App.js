import './App.css';
import { useSelector } from 'react-redux';
import Popup from './components/Popup';
import Question from './components/Question';
import FinalScreen from './components/FinalScreen';

function App() {

  const { questions } = useSelector((state) => state);
  const { index, amount_of_questions } = useSelector((state) => state.options);

  const dynamicUpdate = () => {
    if (index === amount_of_questions) return <FinalScreen />;
    else if (questions.length > 0) return <Question />;
    else return <Popup />;
  }

  return (
    <div className="App">
      <div className="app-container">
        {dynamicUpdate()}
      </div>
    </div>
  );
}
export default App;
