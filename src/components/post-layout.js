import React, { Component } from "react";
import { graphql } from "gatsby";

import Layout from "./layout";

// StaticQuery
// =============
// Used anywhere
// does not accept variables
// can't use context

// PageQuery
// =========
// Must be used on a page

export default class PostLayout extends Component {
  render() {
    const { data, location } = this.props;
    const { markdownRemark } = data;
    return (
      <Layout location={location}>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
      </Layout>
    );
  }
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        slug
      }
      html
    }
  }
`;
