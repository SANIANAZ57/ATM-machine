#! /usr/bin/env node 

import inquirer from "inquirer";
import chalk from "chalk";
import Choices from "inquirer/lib/objects/choices.js";

let my_balance = 5000;
let mypin = 1234;

console.log(chalk.bgBlackBright.bold.italic.whiteBright("\n \t wellcome to ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:")
    }
])
if (pinAnswer.pin === mypin){
    console.log (chalk.green("\npin is correct ,loging successfully!\n"));

    let operationAns =await inquirer.prompt([
        {
            name:"operation",
            type:"list",
            message:"select an operation",
            choices: ["withdraw amount" , "check balance"]
        }
    ])
    
    if (operationAns.operation ==="withdraw amount"){
        let withdrawAns = await inquirer.prompt([
            {
                name:"withdrawMethod",
                type:"list",
                message:"Select a withdrawal amount:",
                choices:["Fast Cash","Enter amount"]
            }
        ])

        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let FastCashAns = await inquirer.prompt([
                {
                    name:"FastCash",
                    type:"list",
                    message:"select amount",
                    choices:[1000,2000,5000,10000,50000]
                }
            ])
            
            if(FastCashAns.FastCash > my_balance){
                console.log(chalk.red("insufficient balance"));
            }
            else{
                my_balance -= FastCashAns.FastCash
                console.log(`${FastCashAns.FastCash} withdraw successfully`);
                console.log(`your remaining balance is :${my_balance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "enter amount"){
            let amountAns =await inquirer.prompt([
                {
                    name:"amount",
                    type:"number",
                    message:"enter tha amount to withdraw:"
                }

            ])
            if(amountAns.amount > my_balance){
                console.log("your remaing balance")
            }
            else{
                my_balance -= amountAns.amount;
                console.log(`${amountAns.amount} withdraw successfully`);
                console.log(`your remining balance is ${my_balance}`);

            }
        }
    }
    else if (operationAns.operation === "check balance"){
        console.log(`yor account balance is :${my_balance}`);
    }
}
else{
    console.log("pin is incorrect , try agian");
}