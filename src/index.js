import express from 'express';
import { Router } from 'express';
import { config } from './config/env.js';
import { signupuserSchema } from './validator/users.js';
import { hashPassword } from './utils/encrypt.js';
import { bankAccount, initDB } from './models/index.js';
import { generateUniqueNumber } from './utils/accountNumber.js';
import { createAccount } from './accounts/accounts.services.js';
import { findUserByEmail, signUpUser } from './users/users.services.js';
import { aToken } from './tokens/jwt.js';
import {auth, staffAuth } from "./middleware/auth.js";
import { routes } from './utils/routes.js';



const tony = express();

tony.use(express.json())


const router = Router();

let users = [ 
  {
        "id": "11",
        "firstName": "tony",
        "lastName": "idan",
        "email": "tony.idan@example.com",
        "password": "password1453",
        "role": "arf",
        "createdAt": "2025-10-01T10:15:00Z",
        "accountType": "savings"
    }
];



tony.use(router);
tony.use(routes);

tony.listen(config.port, async () => {
  try {
    await initDB();
  console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

    console.log(`server running on http://localhost:${config.port}`)
});





router.get('/', (req, res) => {
    res.send("Hello World")
});

router.get('/users', auth, staffAuth, (req, res) => {
    const loggedInUser = req.user;

    if(!loggedInUser) return res.status(401).json({error: `Unathorized`});

    const user = users.find((user => user.id === loggedInUser.id));

    if(!user) return res.status(404).json({error: `User not found with id: ${loggedInUser.id}`});

    return res.status(200).json({user});
});


    router.post('/users/register', async (req, res) => {
      try{
    // first thing is to validate the user's input
    const {error, value} = signupuserSchema.validate(req.body);

    //throw an error if a field is missing
    if(error) return res.status(400).json({error: error.message});

    //deconstruct user data into variable "value"
    let {id ,firstName, lastName, email, password, role, createdAt, accountType} = value;

    //check if user already exists with the email
    // const user= users.find((user) => user.email == email);
    let user = await findUserByEmail({email: value.email});

    //throw an error if user exists
    if(user) return res.status(400).json({error: "account already exists"});

    
    // hash or encrypt user's password before storing into DB
    value.password = await hashPassword(password);
    
    //create user
    user = await signUpUser(value);
    // generate unique account number
    const accountNumber = await generateUniqueNumber(10, bankAccount);
      // console.log(acctNumber);
    const BankAccount = await createAccount({userId: user.id, accountNumber, accountType});
    
    return res.status(201).json({message: `user registered successfully`, user: user.toJSON(), bank: BankAccount.toJSON()});

      }catch(error) {
        console.error(`Register error:`, error);
        return res.status(500).json({error: `internal server error`});
      }
});


// router.use('/users/login', async (req, res) => {

//         //get data from frontEnd
// const {email, password} = req.body;

//     // validate user's data
// if(!email || !password) return res.status(400).json({error: ""})

//     // check if user exist
// const userExists = users.find((user) => user.email == email);

//     // throw an error if user is not found
// if(!userExists) return res.status(400).json({error: "user not found, kindly create account to login"});

//         // check user's password
//     if(userExists == password) return res.status(400).json({error: "invalid credentials"});
//     return res.status(200).json({message: "login successful"});    
// });




router.post('/users/login', async (req, res) => {
  // get data from frontend
  const {email, password} = req.body;
  // validate user's data
  if(!email || !password) return res.status(400).json({error: "email and password are rquired"});
  // check if user exists
  const userExists = users.find((user) => user.email === email);
  // throw an error if user is not found
  if(!userExists) return res.status(404).json({error: "User not found. Kindly create an account to login"});
  // check user's password
  if(userExists.password !== password) return res.status(400).json({error: "Invalid credentials"});
  const accessToken = aToken({id: userExists.id, role: userExists.role});
  // login upon successful validation
  return res.status(200).json({message: `User logged in successfully!`, accessToken});
});

router.patch('/users/:id', (req, res) => {
  // extract id from query params
  const id = req.params.id;
  // check if user with id exists
  const userFound = users.find((user) => user.id === id);
  // return an error if user doesnt exist
  if(!userFound) return res.status(404).json({error: `user not found with id ${id}`});
  // edit user attributes if no error is found
  Object.assign(userFound, req.body);
  return res.json({message: "User Updated Successfully", users});
})