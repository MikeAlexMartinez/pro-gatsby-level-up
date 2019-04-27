import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import Header from "./header";
import "./layout.css";
import Archive from "./archive";

const MainLayout = styled.main`
  max-width: 90%;
  margin: 1.4rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 40px;
`;

const Layout = ({ children, location }) => {
  const fromHeight = location.pathname === "/" ? 100 : 200;
  const toHeight = location.pathname === "/" ? 200 : 100;
  const animatedProps = useSpring({
    overflow: "hidden",
    height: toHeight,
    from: { height: fromHeight },
  });
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
          file(relativePath: { regex: "/bg/" }) {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <animated.div style={animatedProps}>
            <Img fluid={data.file.childImageSharp.fluid} />
          </animated.div>
          <MainLayout>
            <div>{children}</div>
            <Archive />
          </MainLayout>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  location: {},
};

export default Layout;
