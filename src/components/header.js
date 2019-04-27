import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import logo from "../images/logo.svg";

const HeaderWrapper = styled.div`
  background: #524763;
  margin-bottom: 0;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  margin-bottom: 0;
  max-width: 960px;
  padding: 0.5rem;
`;

const LogoImg = styled.img`
  width: auto;
  height: 50px;
  margin-right: 30px;
  margin-bottom: 0px;
`;

const HeaderRow = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;
`;

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <HeaderRow>
        <LogoImg src={logo} alt="Gatsby Logo" />
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </HeaderRow>
    </HeaderContainer>
  </HeaderWrapper>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
