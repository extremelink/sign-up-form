import './App.css'
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Signup from './pages/Signup';
import { Route,Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ListProperty from './pages/ListProperty';
const App=()=>{
  return (
      <Routes>
        <Route path='/' element={<MainLayout />}>
        <Route path='/signup' element={<Signup />} />
        <Route path ='/login' element = {<Login />} />
        <Route path="/profile" element ={<Profile />} />
        <Route path="/list-property" element={<ListProperty />} />
        </Route>
      </Routes>
  )
}
export default App;