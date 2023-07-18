import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserRoute from "./components/UserRoute";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser } from "./redux/actions/actions";
import Header from "./components/Header";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import View from "./pages/View";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="bottom-right" />
        <Switch>
          <UserRoute exact path="/" component={Product} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <UserRoute path="/addProduct" component={AddEdit} />
          <UserRoute path="/update/:id" component={AddEdit} />
          <UserRoute path="/view/:id" component={View} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
