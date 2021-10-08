import { BrowserRouter, Route, Switch } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/mypage">
          <MyPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
