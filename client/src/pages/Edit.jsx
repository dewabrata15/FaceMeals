import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"

export default function Edit() {
  const [errMsg, setErrMsg] = useState(null)
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [meals, setMeals] = useState(null)
  const { id } = useParams()

  async function editRecipe(e) {
    try {
      e.preventDefault()
      const name = e.target[0].value
      const imageUrl = e.target[1].value
      const description = e.target[2].value
      const license = e.target[3].checked
      await axios({
        method: "PUT",
        url: `https://iproject.samawed.cloud/meals/${id}`,
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

      if(photo) {
        const formData = new FormData()
        formData.append('imgUrl', photo)

        await axios({
          method: 'PATCH',
          url: `https://iproject.samawed.cloud/meals/${id}`,
          data: formData,
          headers: {
            Authorization: "Bearer " + localStorage.access_token,
            "Content-Type": "multipart/form-data"
          }
        })
      }

      navigate("/profiles")
    } catch (error) {
      setErrMsg(error.response.data.message)
    }
  }

  async function getMealDetails() {
    try {
      const { data } = await axios({
        url: `https://iproject.samawed.cloud/meals/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      console.log(data[0]);
      setMeals(data[0])
    } catch (error) {
      setErrMsg(error.response.data.message)
    }
  }

  useEffect(() => {
    getMealDetails()
  }, [])

  return (
    <>
      <Navbar />
      <div className="pt-24">
        <form className="flex flex-col gap-5 w-1/2 p-5 pb-[calc(100vh-30rem)]" onSubmit={editRecipe}>
          <h1 className="font-bold">Edit Recipe</h1>
          {errMsg && <p className="w-full text-red-600">{errMsg}</p>}
          <input type="text" placeholder="Name" className="border-2 rounded-md p-2" defaultValue={meals?.strMeal}/>
          <input type="text" placeholder="Image URL" className="border-2 rounded-md p-2" defaultValue={meals?.strMealThumb}/>
          <textarea placeholder="Steps Description" className="border-2 rounded-md p-2"defaultValue={meals?.strInstructions}/>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="license"/>
            <label htmlFor="license">Premium</label>
          </div>
          <input type="file" onChange={(e) => {
            setPhoto(e.target.files[0])
          }} />
          <button className="bg-red-600 text-white p-2 rounded-md">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  )
}