import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"
import CardRandom from "../components/CardRandom";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { getRandomRecipes } from "../helpers/generate";
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from "../store/search";

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [randomRecipes, setRandomRecipes] = useState([])
  const search = useSelector((state) => state.search.value)
  const dispatch = useDispatch()

  async function getRecipes() {
    try {
      const { data } = await axios({
        url: `https://iproject.samawed.cloud/meals?search=${search}`
      })
      
      if(randomRecipes.length === 0) {
        const randomRecipes = getRandomRecipes(data.data[0].id, data.data[data.data.length - 1].id)
        
        setRandomRecipes([
          data.data[randomRecipes[0]],
          data.data[randomRecipes[1]],
          data.data[randomRecipes[2]],
          data.data[randomRecipes[3]]
        ])
      }

      setRecipes(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(setSearch(""))
  }, [])

  useEffect(() => {
    getRecipes()
  }, [search])

  return (
    <>
      <Navbar home={true}/>
      <div className="pt-24">
        <div className="flex justify-between p-10 gap-10 bg-[#F5F6F8]">
          <h1 className="w-2/4 font-bold text-4xl">Siap untuk mencoba<br /> resep baru?</h1>
          <p className="w-1/4 text-gray-500">Berbagai resep menu masakan dari berbagai penjuru dunia hadir untuk Anda. Setiap harinya, Anda bisa mencoba resep resep baru dan terjamin kualitasnya</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {randomRecipes.map(randomRecipe => {
              return (
                <CardRandom randomRecipe={randomRecipe} key={randomRecipe.idMeal}/>
              )
          })}
        </div>
        <div className="pb-10">
          <h1 className="font-bold text-4xl text-center">Terbaru</h1>
        </div>
        <div className="flex flex-wrap gap-10 pb-10 ps-5 pe-5 justify-center">
          <div className="border-2 rounded-md overflow-hidden w-40 h-60">
            <Link to={"/recipes/add"} className="flex justify-center items-center h-full bg-white hover:bg-red-600 duration-200 hover:text-white">
              <i className="fa-solid fa-plus fa-2xl"></i>
            </Link>
          </div>
          {recipes.map(recipe => {
            return (
              <Card recipe={recipe} key={recipe.idMeal}/>
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}