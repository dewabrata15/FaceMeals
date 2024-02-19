import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react"
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [errMsg, setErrMsg] = useState(null)
  const navigate = useNavigate()

  async function login(email, password) {
    try {
      const { data } = await axios({
        url: "https://iproject.samawed.cloud/login",
        method: "POST",
        data: {
          email,
          password
        }
      })

      localStorage.access_token = data.access_token
      navigate("/")
    } catch (error) {
      setErrMsg(error.response.data.message)
    }
  }

  async function loginGoogle(credential) {
    try {
      const { data } = await axios({
        url: "https://iproject.samawed.cloud/login/google",
        method: "POST",
        data: {
          credential: credential.credential
        }
      })
      localStorage.access_token = data.access_token
      navigate("/")
    } catch (error) {
      setErrMsg("Internal Server Error")
    }
  }

  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col w-1/4 justify-center items-center">
          <form className="flex flex-col gap-5 items-center w-full p-5" onSubmit={(e) => {
              e.preventDefault()
              login(e.target[0].value, e.target[1].value)
            }}>
            <h1 className="font-['bangers'] text-3xl text-red-600">LOGIN</h1>
            {errMsg && <p className="w-full text-red-600">{errMsg}</p>}
            <div className="flex p-2 rounded-md border-2 items-center w-full">
              <i className="fa-solid fa-envelope"></i>
              <input type="text" placeholder="Email" className="outline-none ms-2 w-full"/>
            </div>
            <div className="flex p-2 rounded-md border-2 items-center w-full">
              <i className="fa-solid fa-lock"></i>
              <input type="password" placeholder="Password" className="outline-none ms-2 w-full"/>
            </div>
            <button className="bg-red-600 text-white pt-2 pb-2 w-full rounded-md hover:bg-red-400 duration-200">LOGIN</button>
            <GoogleLogin
              onSuccess={loginGoogle}
            />
            <p>Don&apos;t have an account? <Link to={"/register"} className="hover:text-red-600">Register</Link></p>
          </form>
        </div>
        <div className="w-3/4 relative">
          <div className="absolute bg-red-600 opacity-15 w-full h-full z-[1]"/>
          <img src="/background1.jpg" className="absolute h-full w-full object-cover"/>
        </div>
      </div>
    </>
  )
}