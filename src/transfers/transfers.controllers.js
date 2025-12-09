import { sequelize } from "../config/sequelize.js";
import { deposit, findAccount, recordTransaction } from "../deposits/deposits.services.js";
import { transferSchema } from "../validator/transfers.js";


export const transferController = async (req,res) => {

   const t = await sequelize.transaction();
 try {

    const loggedInUser = req.user;
    if(!loggedInUser) {
      await t.rollback();
      return res.status(401).json({error: `Unauthorized! kindly login to acccess`});
   }

       const {error, value} = transferSchema.validate(req.body);
     
            if(error) {
               await t.rollback();
               return res.status(400).json({error: error.message});
            }
    
            let {amount, sourceAccount, destinationAccount, Balance, status, category} = value;
            
    
            const userAccount = await findAccount({accountNumber: sourceAccount});
            const recieverAccount = await findAccount({accountNumber: destinationAccount});
    
            if(!userAccount) {
               await t.rollback();
               return res.status(404).json({error: `Account not found with number: ${sourceAccount}. Kindly check the number and try again.`});
            }

            if(!recieverAccount) {
               await t.rollback();
               return res.status(404).json({error: `Account not found with number: ${destinationAccount}. Kindly check the number and try again.`});
            }
           
    
            if(loggedInUser.id != userAccount.userId) {
               await t.rollback();
                return res.status(403).json({error: `You do not have permission to perfom this transaction.`});
               }


               if(userAccount.Balance < value.amount){
               await t.rollback();
               return res.status(400).json({error: `insufficient funds`});
            }
    
            value.Balance = parseFloat(userAccount.Balance) - parseFloat(value.amount);
            value.Balance = parseFloat(recieverAccount.Balance) + parseFloat(value.amount);
    
        
    
            value.status = 'success';
    
            value.category = 'transfer';
    
            await deposit(value.Balance, {id: userAccount.id}, {transaction: t});
            
    
            const transaction = await recordTransaction(value, {transaction: t});

            await t.commit();
    
            return res.status(201).json({message: `Transaction Successful!`, transaction});
    
 } catch (error) {

   await t.rollback();
    
    console.log(`error creating transfer. Error: ${error.message}`);

    return res.status(500).json({error: `internal Server Error.`});
 }   
}