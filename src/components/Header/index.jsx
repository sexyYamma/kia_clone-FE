import React, { useState } from "react";
import styled from "styled-components";
import WhiteLogo from "../../assets/WhiteLogo";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { login } from "../../atoms/login";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const LNavList = [
    { value: "차량", location: "/vehicles" },
    { value: "구매", location: "/" },
    { value: "체험", location: "/" },
    { value: "이벤트", location: "/" },
    { value: "고객지원", location: "/" },
    { value: "Discover Kia", location: "/" },
  ];
  const [isLogin, setIsLogin] = useAtom(login);

  const onLogoutClick = () => {
    setIsLogin(false)
    alert("로그아웃되었습니다")
  }

  return (
    <Layout headerState={type}>
      <Nav>
        {LNavList.map((item, index) => (
          <LNavText key={index} headerState={type} to={item.location}>
            {item.value}
          </LNavText>
        ))}
      </Nav>
      <LogoLayout
        onClick={() => {
          navigate("/");
        }}
      >
        <WhiteLogo color={type === "white" ? "#FFF" : "#000"} />
      </LogoLayout>
      <RightNav>
        <RNavText headerState={type}>KR</RNavText>
        <RNavText headerState={type}>통합검색</RNavText>
        {isLogin === true ? (
          <RNavText onClick={() => onLogoutClick()} headerState={type}>
            로그아웃
          </RNavText>
        ) : (
          <RNavText headerState={type} to="/login">
            로그인
          </RNavText>
        )}
      </RightNav>
    </Layout>
  );
};

const Layout = styled.header`
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  z-index: 9999;
`;

const Nav = styled.nav`
  display: flex;
  gap: 50px;
  align-items: center;
  margin-left: 30px;
`;

const LNavText = styled(Link)`
  color: ${({ headerState }) => (headerState === "white" ? "#FFF" : "#000")};
  font-family: Arial;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.6px;
  text-decoration: none;
`;
const RNavText = styled(Link)`
  color: ${({ headerState }) => (headerState === "white" ? "#FFF" : "#000")};
  font-family: Arial;
  font-size: 18px;
  font-weight: 400;
  line-height: 21.6px;
  text-decoration: none;
`;

const LogoLayout = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
`;

const RightNav = styled.nav`
  height: 80px;
  position: absolute;
  right: 3pc;
  display: flex;
  align-items: center;
  gap: 40px;
`;

export default Header;
