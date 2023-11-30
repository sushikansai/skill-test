import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const { updatePassword } = useAuth();
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordRef.current?.value || !confirmPasswordRef.current?.value) {
            setErrorMessage("Please fill out all of required fields.");
            return;
        }
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setErrorMessage("Passwords don't match. Try again!");
            return;
        }
        try {
            setErrorMessage("");
            setLoading(true);
            const { data, error } = await updatePassword(passwordRef.current.value);
            if (!error) {
                navigate("/");
            }
        }
        catch (error) {
            setErrorMessage("There is an error in updating your password. Try again?");
        }
        setLoading(false);
    };

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Password</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="password">
                        <Form.Control type="password" ref={passwordRef} required placeholder="Enter your new password" />
                    </Form.Group>
                    <Form.Group id="confirm-pass">
                        <Form.Control type="password" ref={confirmPasswordRef} require placeholder="Confirm your new password" />
                    </Form.Group>
                    {errorMessage && (
                        <Alert
                            variant="danger"
                            onClose={() => setErrorMessage("")}
                            dismissible>
                                {errorMessage}
                        </Alert>
                    )}
                    <div className="text-center mt-2">
                        <Button disabled={loading} type="submit" className="w-50 bg-teal-500">Update</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}

export default UpdatePassword;