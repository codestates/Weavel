import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Modal from "./components/Modal/Modal";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const history = useHistory();

  const handleLogout = () => {
    axios.post("https://localhost:4000/signout").then((res) => {
      setUserinfo(null);
      setIsLogin(false);
      history.push("/");
    });
  };
  return (
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/">
    //       <MainPage />
    //     </Route>
    //     <Route path="/login">
    //       <LoginPage />
    //     </Route>
    //     <Route path="/signup">
    //       <SignupPage />
    //     </Route>
    //     <Route path="/mypage">
    //       <MyPage />
    //     </Route>
    //   </Switch>
    // </BrowserRouter>
    <LoginPage isLogin={isLogin} />
  );
}

export default App;
