//import Layout from "../components/layout"

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import Layout from "../components/layout"

import { GetServerSidePropsContext } from "next"
//import Session from "next-auth"
import React, { useState, useEffect } from "react";
import useSWR from 'swr'
import Card from '../src/card.js'

const fetcher = (...args) => fetch(...args).then(res=> {
  return res.json()
})

export default function IndexPage({session}) {
  const [pageData, setData] = useState([]);

  if(!session) return (<><Layout><div>Please Log in</div></Layout></>)

  //const fetcher = (...args) => fetch(...args).then(res=> {
  //  return res.json()
  //})
  const { data, error } = useSWR('api/positions?showAvgPrice=true', fetcher, {refreshInterval:1000});
  //const { data } = useSWR('https://localhost:3000/api/helloworld', (apiURL) => fetch(apiURL).then(res => res.json()))

  if(error) return (<h1>{error}</h1>)

  return (      <Layout><section className="mainBody">
  {data ? <Card data={data}/> : ''}
</section></Layout>)
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  }
}