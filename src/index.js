import express from 'express';
import { Router } from 'express';
import { config } from './config/env.js';
import { signupuserSchema } from './validator/users.js';
import { hashPassword } from './utils/encrypt.js';



const tony = express();

tony.use(express.json())

// tony.use(router);

const router = Router();

const users = [
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "role": "admin",
    "createdAt": "2025-10-01T10:15:00Z"
  },
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "password": "securePass456",
    "role": "user",
    "createdAt": "2025-10-02T14:32:00Z"
  },
  {
    "id": 3,
    "firstName": "Michael",
    "lastName": "Johnson",
    "email": "michael.johnson@example.com",
    "password": "myPass789",
    "role": "editor",
    "createdAt": "2025-10-03T09:45:00Z"
  },
  {
    "id": 4,
    "firstName": "Aisha",
    "lastName": "Bello",
    "email": "aisha.bello@example.com",
    "password": "aisha@2025",
    "role": "user",
    "createdAt": "2025-10-04T12:20:00Z"
  },
  {
    "id": 5,
    "firstName": "David",
    "lastName": "Okoro",
    "email": "david.okoro@example.com",
    "password": "dav!d123",
    "role": "moderator",
    "createdAt": "2"}
  ];



tony.use(router);

tony.listen(config.port, () => {
    console.log(`server running on http://localhost:${config.port}`)
});

router.get('/', (req, res) => {
    res.send("Hello World")
});

router.get('/users', (req, res) => {
    res.send(users)});

    router.post('/users/register', async (req, res) => {
    // res.send(users)
    

    // first thing is to validate the user's input
    const {error, value} = signupuserSchema.validate(req.body);

    //throw an error if a field is missing
    if(error) return res.status(400).json({error: error.message});

    //deconstruct user data into variable "value"
    const {id ,firstName, lastName, email, password, role, createdAt} = value;

    //check if user already exists with the email
    const user= users.find((user) => user.email == email);

    //throw an error if user exists
    if(user) return res.status(400).json({error: "account already exists"});

    // hash or encrypt user's password before storing into DB
    const hashedPassword = await hashPassword(password);
    users.push({id, firstName, lastName, email, password:hashedPassword, role, createdAt});
    return res.send("user registered successfully")
});


router.use('/users/login', async (req, res) => {

        //get data from frontEnd
const {email, password} = req.body;

    // validate user's data
if(!email || !password) return res.status(400).json({error: ""})

    // check if user exist
const userExists = users.find((user) => user.email == email);

    // throw an error if user is not found
if(!userExists) return res.status(400).json({error: "user not found, kindly create account to login"});

        // check user's password
    if(userExists == password) return res.status(400).json({error: "invalid credentials"});
    return res.status(200).json({message: "login successful"});    
});
