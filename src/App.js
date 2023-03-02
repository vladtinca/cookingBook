//styling
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home.js'
import Recipe from './pages/recipe/Recipe.js'
import Create from './pages/create/Create.js'
import Search from './pages/search/Search.js'
import Navbar from './components/Navbar.js';
import ThemeSelector from './components/ThemeSelector.js';
import { useTheme } from './hooks/useTheme';


function App() {
  const { mode } = useTheme()
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar></Navbar>
        <ThemeSelector></ThemeSelector>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/recipes/:id' element={<Recipe />} />
          <Route path='/Search' element={<Search />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
