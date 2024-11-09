import logo from './logo.svg';
import './App.css';
import TopHeader from './component/TopHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageToPdf from './page/ImageToPdf';
import Home from './page/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <TopHeader/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='pdf' element={<ImageToPdf/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
