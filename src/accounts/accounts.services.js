import { bankAccount } from "../models/bankaccount.js";



export const findAccount = async (attribute) => {
return await bankAccount.findOne({where: attribute});
};

export const  createAccount = async (data) => {
    return await bankAccount.create(data);
};