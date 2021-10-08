import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SignupPage from "./pages/LoginPage";
import {
  Container,
  Header,
  Logo,
  LoginButton,
  Body,
  Footer,
  FooterLine,
  FooterContents,
  FooterProjectLink,
  FooterTeamLink,
} from "./App.style";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Header>
          <Logo src="./images/logo.svg" />
          <span>홈</span>
          <span>마이페이지</span>
          <LoginButton>로그인</LoginButton>
        </Header>
        <Body>
          <Switch>
            {/* <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route> */}
            <Route exact path="/">
              <SignupPage />
            </Route>
            <Route path="/mypage">
              <MyPage />
            </Route>
          </Switch>
        </Body>
        <FooterLine>
          <div></div>
        </FooterLine>
        <Footer>
          <FooterContents>
            <a href="https://github.com/codestates/Weavel/wiki" target="_blank">
              <FooterProjectLink>
                <img src="./images/githubLogo.svg" />
                <span>Codemon</span>
              </FooterProjectLink>
            </a>
            <FooterTeamLink>
              <a href="https://github.com/suzyhwang" target="_blank">
                황소영
              </a>
              <a href="https://github.com/choigicheol" target="_blank">
                최기철
              </a>
              <a href="https://github.com/iysh321" target="_blank">
                정인용
              </a>
              <a href="https://github.com/devSominPark" target="_blank">
                박소민
              </a>
            </FooterTeamLink>
          </FooterContents>
        </Footer>
      </Container>
    </BrowserRouter>
  );
}

export default App;
