const {auth} = require('express-oauth2-jwt-bearer')


 exports.jwtCheck=auth({
    audience:"http://localhost:4000",
    issuerBaseURL:"https://dev-03sbejzb12rjytco.us.auth0.com",
    tokenSigningAlg:"RS256"
})
 

 

    