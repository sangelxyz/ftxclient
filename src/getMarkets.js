
//import config from '../config.js'
import crypto from 'crypto'
import {ftxCreateSignature, marketOrder} from '../src/orders.js'

import {useEffect, useState, useRef} from 'react';

  function Getmarkets() {
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch('/api/ftx/futures')
        .then(resp=>resp.json())
        .then((data)=> {
        let marketsArr = []
        for(const markets of data.result) {
            //console.log(markets.name)
            marketsArr.push(<option key={markets.name}>{markets.name}</option>)
        }
        console.log(marketsArr)
        setList(marketsArr)
        //return(<>{list}</>)
        })
    },[])
    return (<>{list}</>)
}


  function makeOrder() {
    const orderAmount = document.getElementById('marketAmount')
    const marketSelected = document.getElementById('marketSelected')
    //orderAmount.value
    //future, orderSize, cost, otherSide, true
    marketOrder(marketSelected.value, orderAmount.value, null, 'buy')
    // console.log(orderAmount.value)
    // console.log(marketSelected.value)
  }
  function sellOrder() {
    const orderAmount = document.getElementById('marketAmount')
    const marketSelected = document.getElementById('marketSelected')
    //orderAmount.value
    //future, orderSize, cost, otherSide, true
    marketOrder(marketSelected.value, orderAmount.value, null, 'sell')
    console.log(orderAmount.value)
    console.log(marketSelected.value)  
  }

  export {Getmarkets, makeOrder, sellOrder}
