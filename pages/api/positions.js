const ftx = require('../../src/exchange/ftx.js') 
//import {marketOrder, get} from '../../src/exchange/ftx.js'

// This is an example of to protect an API route
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

import { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req, res) {   

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) {
      return res.send({
        content:
          "This is protected content. You can access this content because you are signed in.",
      })
    }

    const ftxPositions = async(type='open')=> { // open, closed, All positions
            
        const ftxget = await ftx.get('/positions?showAvgPrice=true')
        const positionArr=[] 
        //return ftxget
        //return(ftxget)
        //console.log(data.ftx)
        
        for(const result of ftxget.result) {
            //console.log(ftxget)
            //res.status(200).json(positionArr)
            const {future, size, side, netSize, longOrderSize, shortOrderSize, cost, entryPrice, unrealizedPnl, realizedPnl, initialMarginRequirement, maintenanceMarginRequirement, openSize, collateralUsed, estimatedLiquidationPrice} = result
            // Open postions
            if(parseFloat(result.openSize) !== 0 && type=='open') {
                //console.log(result)
                //const pnl = unrealizedPnl/size
                //To calculate pnl we need price

                let req = await ftx.get('/conditional_orders?market=BTC-PERP&type=stop')
                //return data
                const results =  Object.assign(result,{openPositions: req.result})
                //result.push(req.result)
                positionArr.push(results) // result
                //console.log(`${future} : entry: ${entryPrice} : size: ${size}`) //.openSize
            }
            // closed positions
            else if (parseFloat(result.openSize) === 0  && type=='closed') {
                positionArr.push(result)
                //console.log(`${future} : entry: ${entryPrice} : size: ${size} Closed`) //.openSize
            }
            // All positions, open and closed
            else if (type=='all') {
                positionArr.push(result)
                //console.log(`${future} : entry: ${entryPrice} : size: ${size} All Positions`) //.openSize
            }
                        
        }
    return positionArr
        
    //}) 
}
res.status(200).json(await ftxPositions('open'))
}
// ftx.get('/account').then((data)=> {
//     //const {takerFee, makerFee, futuresLeverage} = data.ftx.result
//     console.log(data.ftx.result)
// }) // Past positions..

