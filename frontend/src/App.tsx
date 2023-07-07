import InputBar from './components/InputBar';
import OPPad from './components/OPPad';

const App = () => {
  return (
    <div className="app">
      <div className="calculator-container">
        <InputBar />
        <OPPad />
      </div>
    </div>
  );
};

export default App;
