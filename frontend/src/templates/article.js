import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Moment from "react-moment"

import Layout from "../components/layout"
import Seo from "../components/seo"

import {MDXProvider} from '@mdx-js/react'

import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

export const query = graphql`
  query ArticleQuery($slug: String!) {
    strapiArticle(slug: { eq: $slug }, status: {eq: "published"}) {
      strapiId
      title
      content
      publishedAt
      Seo {
        metaDescription
        metaTitle
        shareImage {
          image {
            publicURL
          }
        }
      }
      image {
        publicURL
        childImageSharp {
            fixed {
              src
            }
        }
      }
      childStrapiArticleContent {
        childMdx {
          body
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
`

const Article = ({ data }) => {
  const article = data.strapiArticle
  return (
    <Layout>
    <Seo
          title={article.Seo.metaTitle}
          description={article.Seo.metaDescription}
          image={article.Seo.shareImage.image.publicURL}
        />
      <div>

        <div
          id="banner"
          className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
          data-src={article.image.publicURL}
          data-srcset={article.image.publicURL}
          data-uk-img
        >
          <h1>{article.title}</h1>
        </div>

        <div className="uk-section">
          <div className="uk-container uk-container-small">
            <MDXProvider>
              <MDXRenderer>{article.childStrapiArticleContent.childMdx.body}</MDXRenderer>
            </MDXProvider>

            <hr className="uk-divider-small" />


            <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                <div >
                  {article.user.image && <Img fixed={article.user.image.childImageSharp.fixed} imgStyle={{ position: 'static',  borderRadius: '50%' }} />}
                </div>
                <div className="uk-width-expand">
                    <p className="uk-margin-remove-bottom">By { article.user.username }</p>
                    <p className="uk-text-meta uk-margin-remove-top"><Moment format="MMM Do YYYY">{article.published_at}</Moment></p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Article
