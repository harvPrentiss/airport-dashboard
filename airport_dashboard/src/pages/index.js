import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Dashboard from '../components/dashboard';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Dashboard></Dashboard>
    
  </Layout>
)

export default IndexPage
