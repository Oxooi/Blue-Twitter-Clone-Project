import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { signIn } from "next-auth/react";

import useRegisterModal from "@/hooks/useRegisterModals";
import useLoginModal from "@/hooks/useLoginModals";

import Input from "../Input";
import Modal from "../Modal";

const RegisterModal = () => {
    const LoginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/register', {
                email,
                password,
                username,
                name
            });

            toast.success('Account Created.');

            signIn('credentials', {
                email,
                password
            });

            registerModal.onClose();
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }

    }, [registerModal, email, password, username, name]);


    // If the user hit the enter key, we submit the form
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && registerModal.isOpen) {
                onSubmit();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onSubmit, registerModal.isOpen]);


    // If the user hit the escape key, we close the modal
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                registerModal.onClose();
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [registerModal]);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose();
        LoginModal.onOpen();
    }, [isLoading, registerModal, LoginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
            <p>Already have an account?&nbsp;
                <span
                    onClick={onToggle}
                    className="
                        text-white
                        cursor-pointer
                        hover:underline
                    ">
                    Sign in
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;