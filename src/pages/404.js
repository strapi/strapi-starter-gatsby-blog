import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO
      seo={{
        metaTitle: "404: Not found",
        metaDescription: "It looks like you got lost",
      }}
    />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
