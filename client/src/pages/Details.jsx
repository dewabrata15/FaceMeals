import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar from "../components/Navbar";
import Error from "./Error";
import Footer from "../components/Footer";

export default function Details() {
  const [forbid, setForbid] = useState(null)
  const [meals, setMeals] = useState(null)
  const { id } = useParams()

  async function getMealDetails() {
    try {
      const { data } = await axios({
        url: `https://iproject.samawed.cloud/meals/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })
      setMeals(data[0])
    } catch (error) {
      setForbid(error.response.data.message)
    }
  }

  useEffect(() => {
    getMealDetails()
  }, [])

  return (
    <>
      <Navbar />
      <div className="pt-24">
        {forbid === "Error not found" && <Error message={"Error not found"}/>}
        {forbid !== "Error not found" && typeof forbid === "string" && <Error message={"Please upgrade to Premium"}/>}
        {meals && <>
          <div className="flex gap-5 p-5 pb-[calc(100vh-25.25rem)]">
            <img src={meals.strMealThumb} className="w-96 h-96 object-cover"/>
            <div>
              <h1 className="font-bold text-2xl">{meals.strMeal}</h1>
              <p>{meals.strInstructions}</p>
              <p className="pt-5">By: <span className="font-semibold">{meals.User.email}</span></p>
            </div>
          </div>
        </>}
      </div>
      <Footer />
    </>
  )
}