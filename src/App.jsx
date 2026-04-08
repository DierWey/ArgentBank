import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import store from "./store/store.jsx";
import Home from "./pages/home/home.jsx";
import Signin from "./pages/signin/signin.jsx";
import User from "./pages/user/user.jsx";
import Error from "./pages/error/error.jsx";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";

function App() {
    return (
        <Provider store={store}>
            <Router>            
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/user" element={<User />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />            
            </Router>
        </Provider>
    );
}

export default App;