import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const Card = ({ article }) => {
  return (
    <Link to={`/article/${article.node.slug}`} className="uk-link-reset">
      <div className="uk-card uk-card-muted">
        <div className="uk-card-media-top">
          <Img fixed={article.node.image.childImageSharp.fixed} imgStyle={{ position: 'static' }} />
        </div>
        <div className="uk-card-body">
          <p id="category" className="uk-text-uppercase">
            {article.node.category.name}
          </p>
          <p id="title" className="uk-text-large">
            {article.node.title}
          </p>
          <div >
          <hr className="uk-divider-small" />
               <div class="uk-grid-small uk-flex-left" uk-grid>
                   <div >
                       <Img fixed={article.node.user.image.childImageSharp.fixed} imgStyle={{ position: 'static',  borderRadius: '50%' }} />
                   </div>
                   <div class="uk-width-expand">
                       <p class="uk-margin-remove-bottom">{ article.node.user.username }</p>
                   </div>
               </div>
           </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
