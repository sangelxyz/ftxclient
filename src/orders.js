import config from '../config.js'
import crypto from 'crypto'
const {api_key, api_secret, api_server} = config.ftxExchange

function ftxCreateSignature(endpoint, method='GET', payload='') {
    // time stamp, from server
    const d = new Date();
    const ts = Number(d.getTime())

    //Create Signature.
    const reqMethod = method === 'POST' ?  'POST' : 'GET'
    const signature = `${ts}${reqMethod}/api${endpoint}${payload}` //${ts}
    
    const sha256Hasher = crypto.createHmac("sha256", api_secret);
    const hash = sha256Hasher.update(signature).digest("hex");
    
    return {signature: hash, time: ts}
}

async function marketOrder(future, size, sizeCash, side, reduceOnly=false) {
    // side == sell ( short ) buy == ( long )

    //  Market Order
    const endpoint = '/orders'
  
        // const ftxAPI = 'https://ftx.com/api'

        // // time stamp, from server
        // const d = new Date();
        // const ts = Number(d.getTime())


        // //Create Signature.
        // const signature = `${ts}GET/api${ftxEndPoint}` //${ts}

        // const sha256Hasher = crypto.createHmac("sha256", api_secret);
        // const hash = sha256Hasher.update(signature).digest("hex");

        // ******* need to validate future
        // ******* need to validate size
        let  buySide=''
        if(side === 'buy') {
            buySide = 'buy'
        } else if(side === 'sell') {
            buySide = 'sell'
        }
        else {
            // error
            return false
        }
        const orderPayload = {
            "market": future,
            "side": buySide,
            "price": null,
            "type": "market",
            "size": (buySide==='buy' ? Math.abs(size) : size),
            "reduceOnly": reduceOnly         
        }
        console.log(orderPayload)
        const orderPayloadJson = JSON.stringify(orderPayload)
        //console.log(signature+orderPayloadJson)

        const {signature, time} = ftxCreateSignature(endpoint,'POST', orderPayloadJson)


// POST /orders
// {
//   "market": "XRP-PERP",
//   "side": "sell",
//   "price": 0.306525,
//   "type": "limit",
//   "size": 31431.0,
//   "reduceOnly": false,
//   "ioc": false,
//   "postOnly": false,
//   "clientId": null
// }

        const response = await fetch('/api/ftx/'+endpoint,
        {
            method: "POST",
            headers: {
            "FTX-KEY": api_key,
            "FTX-SIGN": signature,
            "FTX-TS": time.toString(),
            },
            body: orderPayloadJson
        })
        const data = await response.json()
        //console.log(data)
        return data
}

export {ftxCreateSignature, marketOrder}