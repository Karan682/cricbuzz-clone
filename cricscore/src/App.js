
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contect from "./pages/Contect";
import Pagenotefound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreatenewsCategory from "./pages/admin/CreatenewsCategory";
import CreateMatches from "./pages/admin/CreateMatches";
import CreateNews from "./pages/admin/CreateNews";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import News from "./pages/admin/News";
import Match from "./pages/admin/Match";
import UpdateMatch from "./pages/admin/UpdateMatch";
import UserNews from "./pages/user/UserNews";
import UpdateNews from "./pages/admin/UpdateNews";
import MatchDetails from "./pages/MatchDetails";
import NewsDetails from "./pages/NewsDetails"

function App() {
  return (
    <>
      
         <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/dashboard" element={<PrivateRoute/>}> 
          <Route path="user" element={<Dashboard/>}/>
          <Route path="user/news" element={<News/>}/>
          <Route path="user/profile" element={<Profile/>}/>
          </Route>

          <Route path="/dashboard" element={<AdminRoute/>}> 
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/createnews-category" element={<CreatenewsCategory/>}/>
          <Route path="admin/create-match" element={<CreateMatches/>}/>
          <Route path="admin/match/:slug" element={<UpdateMatch/>}/>
          <Route path="admin/create-news" element={<CreateNews/>}/>
          <Route path="admin/news/:slug" element={<UpdateNews/>}/>
          <Route path="admin/match" element={<Match/>}/>
          <Route path="admin/news" element={<News/>}/>
          <Route path="admin/users" element={<Users/>}/>
          </Route>

          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPasssword/>} />
          <Route path="/match/:slug" element={<MatchDetails/>} />
          <Route path="/news/:slug" element={<NewsDetails/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/about" element={<About/>} />
          <Route path="/contect" element={<Contect/>} />
          <Route path="/news" element={<UserNews/>} />
          <Route path="*" element={<Pagenotefound/>} />
          </Routes> 
    
    </>
  );
}


export default App;
