import { createBrowserRouter } from "react-router-dom";
import CrudPage from "../Pages/CRUD/Crud";
import Home from "../Pages/Home/Home";
import HTTPCat from "../Pages/HTTPCat/HttpCat";
import Login from "../Pages/Login/Login";
import RandomDog from "../Pages/RandomDog/RandomDog";
import Register from "../Pages/Register/Register";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/home",
      element: <Home/>,
    },
    {
      path: "/httpcat",
      element: <HTTPCat/>,
    },
    {
      path: "/randomdog",
      element: <RandomDog/>,
    },
    {
      path: "/crud",
      element: <CrudPage/>,
    },
  ]);

  const goToLogin = () => {
    window.location.href = "/"
  }

  const goToRegister = () => {
    window.location.href = "/register"
  }

  const goToHome = () => {
    window.location.href = "/home"
  }

  const goToHttpCat = () => {
    window.location.href = "/httpcat"
  }

  const goToRandomDog = () => {
    window.location.href = "/randomdog"
  }

  const goToCrud = () => {
    window.location.href = "/crud"
  }

  export {router, goToHome, goToLogin, goToRegister, goToHttpCat, goToRandomDog, goToCrud}