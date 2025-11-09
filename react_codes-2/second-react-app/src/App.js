import './App.css';
import Movie from'./Movie';
import Forminput from './Forminput';
import Toggle from './Toggle';
function App() {
  return (
    <div className='propsApp'>
      
      <h1> Welcome to props</h1>
      <Movie name="John" age="10"></Movie>
      <Movie name="Sarvesh" age="11"></Movie>
      <Movie name="Jhawar" age="12"></Movie>
      <Forminput></Forminput>
    <Toggle></Toggle>
    </div>
  );
}

export default App;
