import logo from './logo.svg';
import './App.css';

function App() {
  console.log('JSDK was rendered')
  return (
    <div className="App">
      <header className="App-header">
        <img src='https://brandslogos.com/wp-content/uploads/images/large/react-logo-1.png' className="App-logo" alt="logo" />
        <p>
          It works! 👍
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
