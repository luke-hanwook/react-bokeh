import {useState, useEffect} from 'react'
import './App.css';
import {getData} from './data'
import ReactBokeh from './react-bokeh';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then((value) => {
      setData(value)
    })
  }, [])

  return (
    <div className="App">
      <ReactBokeh data={data} />
    </div>
  );
}

export default App;
