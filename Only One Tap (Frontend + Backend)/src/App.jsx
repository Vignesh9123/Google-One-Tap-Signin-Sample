import React, { useEffect } from 'react'
import googleOneTap from 'google-one-tap'
function App() {

  const options = {
    client_id:import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
    context:'signin',
    auto_select: true
  }
  const [user, setUser] = React.useState(null);
  const handleSignIn = async () => {
    try {
      if(localStorage.getItem('user')){
        setUser(JSON.parse(localStorage.getItem('user')));
      }
      else{
        googleOneTap(options, (response) => {
          if (response && response.credential) {
            // Decode the JWT credential
            console.log(response);
            /*
            const base64Url = response.credential.split('.')[1]; // Extract payload part
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join('')
            );
      
            const profileInfo = JSON.parse(jsonPayload);
            setUser(profileInfo);
            localStorage.setItem('user', JSON.stringify(profileInfo));
            console.log(profileInfo);
            */
           //  OR
           // send response.credential to your backend for verification
          }
        })
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }
  useEffect(() => {
    handleSignIn();
  },[])
  return (
    <div>
      Please sign in
      {user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  )
}

export default App
