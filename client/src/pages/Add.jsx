import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function Add() {
  const [errMsg, setErrMsg] = useState(null)
  const navigate = useNavigate()

  async function addRecipe(e) {
    try {
      e.preventDefault()
      const name = e.target[0].value
      const imageUrl = e.target[1].value
      const description = e.target[2].value
      const license = e.target[3].checked
      await axios({
        method: "POST",
        url: "https://iproject.samawed.cloud/meals",
        data: {
          strMeal: name,
          strMealThumb: imageUrl,
          strInstructions: description,
          license
        },
        headers: {
          Authorization: "Bearer " + localStorage.access_token 
        }
      })

      navigate("/")
    } catch (error) {
      setErrMsg(error.response.data.message)
    }
  }
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <form className="flex flex-col gap-5 w-1/2 p-5 pb-[calc(100vh-30rem)]" onSubmit={addRecipe}>
          <h1 className="font-bold">Add Recipe</h1>
          {errMsg && <p className="w-full text-red-600">{errMsg}</p>}
          <input type="text" placeholder="Name" className="border-2 rounded-md p-2"/>
          <input type="text" placeholder="Image URL" className="border-2 rounded-md p-2"/>
          <textarea placeholder="Steps Description" className="border-2 rounded-md p-2"/>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="license"/>
            <label htmlFor="license">Premium</label>
          </div>
          <button className="bg-red-600 text-white p-2 rounded-md">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  )
}