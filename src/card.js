import React from 'react';
import config from '../config.js'
import crypto from 'crypto'
import {ftxCreateSignature, marketOrder} from './orders.js'
//import Ftx from './exchange/ftx.js'
//const ftx = require('./exchange/ftx.js') 

function card(props) {
    // config
    const {api_key, api_secret, api_server} = config.ftxExchange

//console.log(NEXT_PUBLIC_FTX_API_KEY)
    


    // const [count, setCount] = React.useState(0)

    function getOpenPositions(positions, future) {
        let jsxArr = []
        let toggle = true;
        for(const position of positions) {
            //console.log(position)
            const {market, side, type, triggerPrice, size} = position

            if(market == future) {
                jsxArr.push(<p className={toggle ? 'openOrders' : 'openOrders2'}>{type} : {side} {size} @ {triggerPrice} </p>)
                toggle = !toggle
            }


        }
        return (jsxArr)
    }

    let cardBody = [], line=0


    for (const positions of props.data) {

        //console.log(props.data[positions].recentPnl)
        //console.log(positions)
        const {side, future, entryPrice, size, recentPnl, cost, unrealizedPnl, recentBreakEvenPrice, recentAverageOpenPrice, openPositions} = positions
// avg entry price.

        // To do
        //  if sell -1
        // get Open Orders for stops

        let PNL = (side==='sell' ? (entryPrice-recentAverageOpenPrice) * (size * -1) : (entryPrice-recentAverageOpenPrice) * (size * 1))
        //const ftxget = async() => await ftx.get('/conditional_orders?market=BTC-PERP&type=stop')
        //console.log(ftxget)
        // const stops = async() => await getStops()
        // console.log(stops())
        
        // getStops().then(data=> {
        //     return data
        // })
        //const data = getStops()
//{positionsOpen.map(el => (<li>{el.market}</li>))}
        //console.log(data())
        //async()=> await getStops().then(data=> data[0].type)
        const otherSide  = (side === 'buy' ? 'sell' : 'buy')
        const orderSize = (otherSide === 'sell' ? size : cost)
        // if (otherSide === 'sell') {
        //     orderSize = size
        // }
        //if
        cardBody.push(<div key={line} id="456231" className="positionCard">
                <div className="positionCard--body">
                    <h5 className="positionCard-title">{future} - {(side === 'sell' ? 'Short' : 'Long')}</h5>
                    <div className="stats-text">Mark Price: {entryPrice}</div>
                    <div className="stats-text">Position Size: {size}</div>
                    <div className="stats-text">Size: ${cost}</div>
                    <div className="stats-text">PNL: {PNL.toFixed(2)}</div>
                    <div className="stats-text">Avg Price: {recentBreakEvenPrice}</div>
                    <div className="stats-text"><strong>Open Orders:</strong> {getOpenPositions(openPositions, future)}              
                    </div>
                    <a href="#" onClick={()=> marketOrder(future, orderSize, cost, otherSide, true)} id="close_456231" className="btn btn-primary">Close</a>
                </div>
            </div>)
            //return [...cardBodyarr, cardBody]

        line=line+1
    }

    //setCount(prev=> prev+1)
    // console.log('hi')
    return <>{cardBody}</>
}

export default card