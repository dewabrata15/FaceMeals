/* eslint-disable react/prop-types */
export default function Error({ message }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>{message}</h1>
    </div>
  )
}