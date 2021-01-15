exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        categories: allStrapiCategory {
          edges {
            node {
              strapiId
              slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create the categories since the file system API doesn't allow for a page to have multiple queries
  // Ref: https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/#collection-routes
  const categories = result.data.categories.edges;
  const CategoryTemplate = require.resolve("./src/templates/category.js");

  categories.forEach((category) => {
    createPage({
      path: `/category/${category.node.slug}`,
      component: CategoryTemplate,
      context: {
        slug: category.node.slug,
      },
    });
  });
};
