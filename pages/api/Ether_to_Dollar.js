import fetch from "node-fetch"

export const INRPrice = async ()=>{
    try{
        const response= await fetch("https://api.coinstats.app/public/v1/tickers?exchange=WazirX&pair=ETH-INR")
        const value= await response.json()
        return value['tickers'][0]['price'];
    }catch(e)
    {
        console.log(e);
    }
}