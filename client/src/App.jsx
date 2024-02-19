import { Outlet } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="265605574992-9ij3um20la6d9bpaj8pq2l77nv69lt50.apps.googleusercontent.com">
        <Outlet />
      </GoogleOAuthProvider>
    </>
  )
}
