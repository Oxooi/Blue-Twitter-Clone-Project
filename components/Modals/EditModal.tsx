import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";
import Label from "../Label";
import Header from "../Header";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setEmail(currentUser?.email);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [
        currentUser?.email,
        currentUser?.name,
        currentUser?.username,
        currentUser?.bio,
        currentUser?.profileImage,
        currentUser?.coverImage
    ]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.patch('/api/edit', {
                email,
                name,
                username,
                bio,
                profileImage,
                coverImage
            });
            mutateFetchedUser();

            toast.success("Updated");

            editModal.onClose();
        } catch (error) {
            toast.error("Somethig went wrong");
            console.log("=========");
            console.log(error);
            console.log("=========");

        } finally {
            setIsLoading(false);
        }
    }, [bio, name, username, profileImage, coverImage, editModal, mutateFetchedUser]);

    // If the user hit the escape key, we close the form
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                editModal.onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [editModal.onClose]);

    // If the user hit the enter + ctrl key , we submit the form
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && e.ctrlKey) {
                onSubmit();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onSubmit]);


    const bodyContent = (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <Header label="Edit Profil" />

            {/* Cover Image */}
            <Label label="Cover Image" />
            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Upload cover image"
            />
            {/* Profile Image */}
            <Label label="Profile Image" />
            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Upload profile image"
            />
            <hr
                className="border-neutral-800"
            />
            {/* Email */}
            <Label label="E-mail" />
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            {/* Name */}
            <Label label="Name" />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            {/* Username */}
            <Label label="Username" />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            {/* Bio */}
            <Label label="Bio" />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
}

export default EditModal;