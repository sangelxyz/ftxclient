import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { resolve } from "path"
//import styles from "./header.module.css"

import {Getmarkets, makeOrder, sellOrder} from '../src/getMarkets.js'



// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {


  const { data: session, status } = useSession()
  const loading = status === "loading"

// function makeOrder() {
//   return false
// }
// function sellOrder() {
//   return false
// }

  //if(pageData.length < 1) getMarkets()

  return (
    
    <header className="p-3 bg-dark text-white">
  <div className="container">
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

      <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><a href="/" className="nav-link px-2 text-secondary">Dashboard</a></li>
      </ul>


  
{session && (<div className="btn-group">
        <input id="marketAmount" type="number" className="form-control form-control-dark text-white bg-dark" placeholder="Market enter coin amount" aria-label="Market Buy sell"  />
        <select id="marketSelected" className="form-select form-select-sm" aria-label=".form-select-sm example">
        <Getmarkets />
</select>
<button type="button" className="btn btn-secondary" onClick={makeOrder}>Buy</button><button type="button" onClick={sellOrder} className="btn btn-secondary">Sell</button>
      </div>)}
      <div className="col-md-3 text-end">
      {!session && (<button type="button" className="btn btn-outline-primary me-2" onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}>Login</button>)}
      {session && (<button type="button" className="btn btn-primary" onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}>LogOut</button>)}
      </div>

    </div>
  </div>

</header>  )
}
