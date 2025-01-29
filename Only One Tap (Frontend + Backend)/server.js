import express from 'express';
import { OAuth2Client } from 'google-auth-library';
const app = express()
const client = new OAuth2Client(CLIENT_ID);

async function verify() {
	const ticket = await client.verifyIdToken({
		idToken: token, //response.credential from client
		audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
    console.log(payload);
    /*
    {
  iss: 'https://accounts.google.com',
  azp: 'azp',
  aud: 'aud',
  sub: 'sub',
  email: 'vignesh.d9123@gmail.com',
  email_verified: true,
  nbf: nbf,
  name: 'Vignesh Deepak',
  picture: 'https://lh3.googleusercontent.com/a/ACg8ocKhGDygezd1qEjbFdqqavHgyaq3jTJVdl51zAid_TMh8vN4Uw=s96-c',
  given_name: 'Vignesh',
  family_name: 'Deepak',
  iat: 1738160018, // Unix timestamp of user authentication
  exp: 1738163618, // Unix timestamp of user expiration
  jti: 'jti'
}
    */
	const userid = payload['sub'];
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
}

app.get('/', (req, res) => {
    verify().then(() => {
        res.send('ok')
    }).catch(err => console.error(err))
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})