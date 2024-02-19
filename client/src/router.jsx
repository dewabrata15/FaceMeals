import { createBrowserRouter, redirect } from "react-router-dom";
import App from './App.jsx'
import Home from "./pages/Home";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Details from "./pages/Details.jsx";
import Profiles from "./pages/Profiles.jsx";
import Add from "./pages/Add.jsx";
import Edit from "./pages/Edit.jsx";

function mustLogin() {
  if(!localStorage.access_token) {
    return redirect("/login")
  }
  
  return null
}

function isLogin() {
  if(localStorage.access_token) {
    return redirect("/")
  }

  return null
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />,
        loader: isLogin
      },
      {
        path: 'login',
        element: <Login />,
        loader: isLogin
      },
      {
        path: 'recipes/add',
        element: <Add />,
      },
      {
        path: 'recipes/:id',
        element: <Details />
      },
      {
        path: 'profiles',
        element: <Profiles />,
        loader: mustLogin
      },
      {
        path: 'recipes/:id/edit',
        element: <Edit />
      }
    ]
  },
])