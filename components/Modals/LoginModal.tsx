import useLoginModal from "@/hooks/useLoginModals";
import { useCallback, useEffect, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModals";
import { signIn } from "next-auth/react";

const LoginModal = () => {

    const LoginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    // When the user submit the form, we try to login
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await signIn('credentials', {
                email,
                password
            })

            LoginModal.onClose();
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }

    }, [LoginModal, email, password]);

    // If the user hit the enter key, we submit the form
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && LoginModal.isOpen) {
                onSubmit();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onSubmit, LoginModal.isOpen]);


    // When the user click on the "Create an account" link, we close the login modal and open the register modal
    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        LoginModal.onClose();
        registerModal.onOpen();
    }, [isLoading, LoginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>You don't have an account?&nbsp;
                <span
                    onClick={onToggle}
                    className="
                        text-white
                        cursor-pointer
                        hover:underline
                    ">
                    Create an account
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title="Login"
            actionLabel="Sign In"
            onClose={LoginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;