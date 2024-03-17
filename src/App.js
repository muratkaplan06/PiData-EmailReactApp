import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Epostatanitim from './components/Epostatanitim'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={'/epostatanitim'} element={<Epostatanitim />} />
            <Route path={'/kisikayit'} element={<div>Kisikayit</div>} />
            <Route
              path={'/epostagonderim'}
              element={<div>Epostagonderim</div>}
            />
            <Route path={'/raporlama'} element={<div>Raporlama</div>} />
            <Route path={'*'} element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
