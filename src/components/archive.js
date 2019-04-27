import React, { Component } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import styled from "styled-components";

const POST_ARCHIVE_QUERY = graphql`
  query BlogPostArchive {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      group(field: frontmatter___month) {
        fieldValue
        totalCount
        edges {
          node {
            excerpt
            id
            frontmatter {
              title
              month
              date(formatString: "MMMM DD, YYYY")
              slug
            }
          }
        }
      }
    }
  }
`;

const ArchiveList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  .heading {
    color: #524763;
  }
  a {
    font-size: 0.8rem;
    color: #524763;
    text-decoration: underline;
  }
  li.indented {
    margin-left: 1.2rem;
  }
`;

class Archive extends Component {
  state = {
    currentMonth: 0,
  };

  openMonth = index => {
    this.setState(prevState => ({
      ...prevState,
      currentMonth: index,
    }));
  };

  render() {
    const { currentMonth } = this.state;
    return (
      <StaticQuery
        query={POST_ARCHIVE_QUERY}
        render={({ allMarkdownRemark: { group } }) => (
          <>
            <aside>
              <h3>Archive</h3>
              <ArchiveList>
                {group.map((month, i) => (
                  <li key={i} onClick={() => this.openMonth(i)}>
                    <h3 className="heading">{month.fieldValue}</h3>
                    {i === currentMonth && (
                      <ArchiveList>
                        {month.edges.map(edge => (
                          <li class="indented" key={edge.node.frontmatter.slug}>
                            <Link to={`/posts${edge.node.frontmatter.slug}`}>
                              {edge.node.frontmatter.title}
                            </Link>
                          </li>
                        ))}
                      </ArchiveList>
                    )}
                  </li>
                ))}
              </ArchiveList>
            </aside>
          </>
        )}
      />
    );
  }
}

export default Archive;
