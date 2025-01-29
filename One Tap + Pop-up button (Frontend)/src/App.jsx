import { GoogleLogin } from '@react-oauth/google';


function App() {

  return (
    <div className='w-fit mx-auto'>

    <GoogleLogin
      onSuccess={credentialResponse => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
      />
      </div>

  )
}

export default App
