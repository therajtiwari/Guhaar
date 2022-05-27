<!-- # Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
``` -->

<!-- ## Important commands

```

# if changed smart contract code
npx hardhat compile

# run local network
npx hardhat node

# deploy smart contract and start frontend
npx hardhat run --network localhost scripts/deploy.js && npm run dev

``` -->

<p align="center">
    <img width=500px src="public/assets/Guhaar.svg"></img>
<p>

## About Guhaar
Guhaar is an Blockchain based Crowdfunding Web Application.
    
## Technologies Used:
### Frontend
1. HTML, CSS and Javascript
2. NextJS
3. Material UI

### Blockchain
1. Moralis
2. HardHat
3. Ethers
4. Web3Auth
5. Solidity
    
### Other Dependencies:
1. NEXT - PVWA
2. Cloudinary

    
## Features
1. Any person who either wants to donate to an NGO or who wants to raise funds for a particular social cause can participate without any hassle.
2. The user who wants to raise funds can create a campaign by providing certain details such as name of campaign, details, target of funds, etc.
3. The user who wants to donate must have to connect the ethereum wallet before donation.
4. If the NGO needs some money they can make a withdrawal request and explain the cause of withdrawal. The users approve or disapprove the request after reviewing. If around 50% of the user approves then the specified money will be transferred to the NGO’s wallet.

    
## Contributors
| Sr No. | Name              | e-mail                 | git-profile    | git-profile-link    |
| ------ | ----------------- | ---------------------- | -------------- | -------------- |
| 1.     | Shreyans Mulkutkar| s.mulkutkar@somaiya.edu  | AxonBlAzE  |https://github.com/AxonBlAzE|
| 2.     | Ramavtar Yadav| ramavtar.y@somaiya.edu | ramavtarofficial   |https://github.com/ramavtarofficial|
| 3.     |Raj Tiwari| therajtiwari254@somaiya.edu| therajtiwari   |https://github.com/therajtiwari| 
| 4.     |Huzaifa Khilawala| huzaifa.k@somaiya.edu| ReadHeadpone   |https://github.com/RedHeadphone| 
    

## Important commands

```

# start frontend
npm run dev

# compile contract
npx hardhat compile

# redeploy on rinkeby (make sure to have private key in env and note new contract address)
npx hardhat run --network rinkeby scripts/deploy.js

```

To get test eth in rinkeby testnet click [here](https://faucets.chain.link/rinkeby)
