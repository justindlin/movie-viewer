const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const db = require('./config/keys').mongoURI;

//middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true} 
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err)); 


function parser(movies){
  var movieList = movies.split(",");

  var last = movieList[movieList.length-1];

  var i;

  var newList = [];
  var boolCheck = false;

  //checking to see if the last item can be found previously favorited
  for(i = 0; i < movieList.length-1; i++){
    if(movieList[i]!=last){
      newList.push(movieList[i]);

    }else{
      //it found a copy
      boolCheck = true;
    }
  }

  //if a copy wasn't found, add the last item to the list
  if(boolCheck == false){
    newList.push(last);
  }

  //converting the array back into a csv string
  var listString;
  listString = newList[0];

  for(i = 1 ; i < newList.length; i++){
    listString = listString + "," + newList[i];
  }
  return listString;
}

//Route for register
app.post('/register', (req, res, next) => {
  var newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    fname: req.body.fname,
    lname : req.body.lname
  })
   newUser.save(err => {
    if (err) {
      return res.status(400).json({
        title: 'error',
        error: 'email in use'
      })
    }
    return res.status(200).json({
      title: 'signup success'
    })
  })
}) 

//Route for login
app.post('/login', (req, res, next) => {
  //find user using email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({
      title: 'server error',
      error: err
    })
    //check if user exists 
    if (!user) {
      return res.status(401).json({
        title: 'user not found',
        error: 'invalid credentials'
      })
    }
    //compare password entered to saved password
    console.log(bcrypt.compareSync(req.body.password, user.password));
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'login failed',
        error: 'invalid credentials'
      })
    }
    //create a token and send to frontend
    let token = jwt.sign({userId: user._id}, 'secretkey');
    return res.status(200).json({
      title: 'login success',
      token: token
    }) 
  })  
})  

//grabbing user information
app.get('/user', (req, res, next) => {
  let token = req.headers.token; //token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({
      title: 'unauthorized'
    })
    //if token is valid 
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err)
      return res.status(200).json({
        title: 'user grabbed',
        user: {
          username: user.username,
          email: user.email,
          fname: user.fname,
          lname: user.lname,
          movieList: user.movieList
        }
      })
    })

  })
})

//updating movielist
app.post('/update',(req, res, next) =>{
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).json({
      title: 'server error',
      error: err
    })
    if (!user) {
      return res.status(401).json({
        title: 'user not found',
        error: 'invalid credentials'
      })
    }

    var parsedList = parser(req.body.movieList);
    var newValues = {$set: {movieList: parsedList} };
    
    User.updateOne({
      username: req.body.username
      },
      newValues,
      function(err, res){
        if (err) throw err;
        console.log("1 document updated");
      }
    );
  })  
})

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log('server running on port ' + port);
})