difference between thr json an the js object

the server is not able to read json data

e need a middleware to read the json data
for thsi we use express.json()

express.json----->JSON----->JS object----->req me chipkao ek naya feiald body naamka---->waha ye object save kardo




<!-- API list -->
## authROuter
    POST /signup
    POST /login
    POST /logout

## profile Router
    PATCH /profile/view
    PATCH /profile/password
    GET /profile


## connectionrequestRouter
    status : ignore ,interested , accepted , rejected
    POST /request/send/:status/:profileId

## userRouter
    GET /user/connections
    GET /user/feed
    GET /user/request/recieved
