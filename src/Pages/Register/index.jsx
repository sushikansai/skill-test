import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { Alert, Button, Card, Form } from "react-bootstrap";

export default function Register () {
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const register = (username, email, password) =>
        supabase.auth.signUp({ username, email, password});

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!usernameRef.current?.value || !emailRef.current?.value || !passwordRef.current?.value || !confirmPasswordRef.current?.value) {
            setErrorMessage("Please fill all the fields.");
            return;
        }

        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setErrorMessage("Passwords don't match. Try again!");
            return;
        }

        try {
            setErrorMessage("");
            setLoading(true);
            const {data, error} = await register(
                emailRef.current.value,
                passwordRef.current.value
            );
            if (!error && data) {
                setMessage("Registration successful. Check your email!");
            }
        }

        catch (error) {
            setErrorMessage("There's an error in creating your account.");
        }

        setLoading(false);
    };

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="username">
                        <Form.Control type="username" ref={usernameRef} required placeholder="Enter Username"/>
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Control type="email" ref={emailRef} required placeholder="Enter Email" />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Control type="password" ref={passwordRef} required placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group id="confirm-pass">
                        <Form.Control type="password" ref={confirmPasswordRef} required placeholder="Confirm Password" />
                    </Form.Group>
                    {errorMessage && (
                        <Alert
                            variant="danger"
                            onClose={() => setErrorMessage("")}
                            dismissible>
                                {errorMessage}
                        </Alert>
                    )}
                    {message && (
                        <Alert
                            variant="success"
                            onClose={() => setMessage("")}
                            dismissible>
                                {message}
                        </Alert>
                    )}
                    <div className="text-center mt-2">
                        <Button disabled={loading} type="submit" className="w-36 h-12 bg-teal-500">Register</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2"> Return to the <Link to={"/login"} className="text-amber-500">Login Page</Link>.</div>
        </>
    )
}