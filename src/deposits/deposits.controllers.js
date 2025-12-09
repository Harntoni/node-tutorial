import { depositSchema } from "../validator/deposits.js";
import { deposit, findAccount, recordTransaction } from "./deposits.services.js";


export const depositController = async (req, res) => {
    try {

        const loggedInUser = req.user;
        console.log(loggedInUser);
        

        if(!loggedInUser) return res.status(401).json({error: `Unauthorized. Kidly login to access this endpount!!!!`});

        const {error, value} = depositSchema.validate(req.body);
 
        if(error) return res.status(400).json({error: error.message});

        let {amount, destinationAccount, Balance, status, category} = value;
        

        const userAccount = await findAccount({accountNumber: destinationAccount});

        if(!userAccount) return res.status(404).json({error: `Account not found with number: ${destinationAccount}. Kindly check the number and try again.`});
        // console.log("user",loggedInUser);
        console.log("account", userAccount);

        if(loggedInUser.id != userAccount.userId) return res.status(403).json({error: `You do not have permission to perfom this transaction.`});

        value.Balance = parseFloat(userAccount.Balance) + parseFloat(value.amount);

    

        value.status = 'success';

        value.category = 'deposit';

        await deposit(value.Balance, {id: userAccount.id});
        

        const transaction = await recordTransaction(value);

        return res.status(201).json({message: `Transaction Successful!`, transaction});
        
    } catch (error) {

        console.error(`Error creating deposit. Error; ${error.message}`);
        
        return res.status(500).json({error: `Internal Server Error.`});
        
    }
};