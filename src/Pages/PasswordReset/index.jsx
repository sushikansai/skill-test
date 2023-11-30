import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const PasswordReset = () => {
    const { passwordReset } = useAuth();
    const emailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const {data, error} = await passwordReset(emailRef.current.value);
            console.log(error);
            console.log(data);
            setMessage("Check email for password reset.");
        }
        catch(e) {
            console.log(e);
        }
        setLoading(false);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Control type="email" ref={emailRef} required placeholder="Enter your email here." />
                        </Form.Group>
                        {message && (
                            <Alert variant="success" onClose={()=>setMessage("")} dismissible>{message}</Alert>
                        )}
                        <div className="text-center mt-2">
                            <Button disabled={loading} type="submit" className="w-50 bg-teal-500">Send reset link.</Button>
                        </div>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Wanna <Link to="/login">login</Link> again?
                </div>
            </Card>
        </>
    )
}

export default PasswordReset