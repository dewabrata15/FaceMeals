import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios'
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useNavigate } from 'react-router-dom'
import Footer from "../components/Footer";

export default function Profiles() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  async function getProfiles() {
    try {
      const { data } = await axios({
        url: `https://iproject.samawed.cloud/profiles?search=`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })
      setUser({
        recipes: data.data,
        license: data.licenseUser
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function upgradeAccount() {
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'https://iproject.samawed.cloud/profiles/upgrade',
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      window.snap.pay(data.token, {
        onSuccess: () => {
          navigate("/profiles")
        },
        onClose: () => {
          navigate("/profiles")
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfiles()
  }, [])

  return (
    <>
      <Navbar />
      <div className="pt-24">
        <div className="flex justify-between p-10 gap-10 bg-[#F5F6F8]">
          <h1 className="w-2/4 font-bold text-4xl"> 
            Anda saat ini <br /> {user?.license === true ? "Premium" : "Free"} User
          </h1>
          <p className="w-1/4 text-gray-500">
            {user?.license === true ? "Terima kasih telah berkontribusi dalam membagikan resep-resep ke orang banyak." : "Ingin mendapatkan resep terkeren dan terlezat? Segera upgrade akun menjadi Premium!"}
            {user?.license === false && <button className="block text-red-600 hover:text-red-400 w-fit" onClick={upgradeAccount}>Klick Link</button>}
          </p>
        </div>
        <div className="p-10">
          <h1 className="font-bold text-4xl text-center">Resep Anda</h1>
        </div>
        <div className="flex flex-wrap gap-10 pb-10 ps-5 pe-5 justify-center">
          <div className="border-2 rounded-md overflow-hidden w-40 h-60">
            <Link to={"/recipes/add"} className="flex justify-center items-center h-full bg-white hover:bg-red-600 duration-200 hover:text-white">
              <i className="fa-solid fa-plus fa-2xl"></i>
            </Link>
          </div>
          {user && user.recipes.map(recipe => {
            return (
              <Card recipe={recipe} key={recipe.idMeal} mine={true}/>
            )
          })}
        </div>
      </div>
      <Footer />
    </>
  )
}