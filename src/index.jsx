import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NavBar from "./NavBar";
import PasswordReset from "./Pages/PasswordReset";

const Main = () => {
    return (
        <>
            <Container className="d-flex items-center justify-center" style={{minHeight: "100vh"}}>
                <div className="w-100" style={{maxWidth:"400px"}}>
                    <NavBar />
                    <Routes>
                        <Route Component={AuthRoute}>
                            <Route path="/" Component={Home} />
                            <Route path="/home" Component={Home} />
                        </Route>
                        <Route path="/reset" Component={PasswordReset} />
                        <Route path="/register" Component={Register} />
                        <Route path="/login" Component={Login} />
                    </Routes>
                </div>
            </Container>
        </>
    )
}

export default Main