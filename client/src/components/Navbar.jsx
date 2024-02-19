/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearch } from "../store/search";

export default function Navbar({ home }) {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function checkLogin() {
    if(localStorage.access_token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }

  function logout() {
    localStorage.removeItem("access_token")
    navigate("/login")
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <nav className="flex justify-between p-5 items-center h-24 z-[99] w-full fixed bg-white">
      <div className="flex items-center">
        <Link to={"/"} className="font-['bangers'] text-3xl text-red-600 hover:text-red-400 duration-200 hover:scale-90">Facemeals</Link>
        {home && <div className="ms-5 border-2 rounded-md p-2">
          <i className="fa-solid fa-magnifying-glass pe-2" style={{
            color: '#e5e7eb'
          }} />
          <input placeholder="Search" className="outline-none" onKeyDown={(e) => {
            if(e.key === 'Enter') {
              dispatch(setSearch(e.target.value))
            }
          }}/>
        </div>}
      </div>
      <div className="flex gap-5">
        {isLogin === false ? <Link to={"/register"}>REGISTER</Link> : <Link to={"/profiles"}>PROFILES</Link>}
        {isLogin === false ? <Link to={"/login"} className="text-red-600">LOGIN</Link> : <button className="text-red-600" onClick={logout}>LOGOUT</button>}
      </div>
    </nav>
  )
}