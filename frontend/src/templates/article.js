import React from "react"
import { graphql } from "gatsby"

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
      }
      childStrapiArticleContent {
        childMdx {
          body
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
            <p>
              Published <Moment format="MMM Do YYYY">{article.published_at}</Moment>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Article
