const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((res, rej) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                title
                slug
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: `/posts${node.frontmatter.slug}`,
          component: path.resolve('./src/components/post-layout.js'),
          context: {
            slug: node.frontmatter.slug
          }
        });
      });
      res();
    });
  });
}