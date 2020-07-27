import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import ArticlesComponent from "../components/articles"

import "../assets/css/main.css"

const IndexPage = () => (
  <Layout>
    <StaticQuery
      query={graphql`
        query {
          strapiHomepage {
            Hero {
              HeroText
            }
          }
          allStrapiArticle(filter: {status: {eq: "published"}}) {
            edges {
              node {
                strapiId
                slug
                title
                category {
                  name
                }
                image {
                  childImageSharp {
                      fixed(width: 800, height: 500) {
                      	src
                      }
                  }
                }
                user {
                  username
                  image {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                        	src
                        }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div className="uk-section">
          <div className="uk-container uk-container-large">
            <h1>{data.strapiHomepage.Hero.HeroText}</h1>
            <ArticlesComponent articles={data.allStrapiArticle.edges} />
          </div>
        </div>
      )}
    />
  </Layout>
)

export default IndexPage
