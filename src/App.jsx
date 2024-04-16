 
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './auth/Register';
import Home from './Pages/Home';
import Login from './auth/Login';
import PdfTextExtractor from './Pages/PdfTextExtractor';
import QnAForm from './Pages/QnAForm';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        
       <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="qna" element={<QnAForm />} />
        <Route path="/pdf" element={<PdfTextExtractor />} />
        <Route path="/" element={<Home />}>
           
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
