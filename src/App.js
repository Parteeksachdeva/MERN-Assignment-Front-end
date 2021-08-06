import "./App.css";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Home from "./components/Home/Home"
import Admin from "./components/Admin/Admin"


function App() {
  return (
    <Router>
    <div className="app">
    <Switch>
      <ProtectedRoute restricted={true} component={Signin} path="/signin" exact />
      <ProtectedRoute restricted={true} component={Signup} path="/signup" exact />
      <PrivateRoute component={Home} path="/home" exact />
      <PrivateRoute component={Admin} path="/admin" exact />
    </Switch>
    </div>
    </Router>
   );
 }

export default App;
