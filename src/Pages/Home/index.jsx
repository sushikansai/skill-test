import React from "react";
import { useAuth } from "../../context/AuthProvider";

const Home = () => {
    const { user } = useAuth();

    return <div>You successfully logged in! Your email would be {user.email}, right?</div>;
};

export default Home;