import { transaction } from "../models/transaction.js";
import { bankAccount } from "../models/bankaccount.js"


export const deposit = async (Balance, accountNumber) => {
    await bankAccount.update({Balance}, {where: accountNumber})
};

export const recordTransaction = async (data) => {
    return await transaction.create(data)
};

export const findAccount = async (attribute) => {
    return await bankAccount.findOne({where: attribute});
};