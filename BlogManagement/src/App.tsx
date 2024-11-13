import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/shared/Header'
import Footer from './components/shared/Footer'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
      <Header></Header>
      <main className="container-fluid" style={{margin:"0%",width:"100%"}}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer></Footer>
      </BrowserRouter>
  )
}

export default App
