'use client'

import Modal from "@/app/components/Modal";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {
    if (!src) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image
                    alt="Image"
                    className="object-cover"
                    fill
                    src={src}
                />
            </div>
        </Modal>
    )
}

export default ImageModal;