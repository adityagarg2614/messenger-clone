'use client'

import useConversation from "@/app/hooks/useConversation"
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi";
import { CldUploadButton } from "next-cloudinary";



const Form = () => {

    const { conversationId } = useConversation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        console.log('Cloudinary result:', result);
        const secureUrl = typeof result?.info === 'object' ? result.info?.secure_url : null;
        if (!secureUrl) return;
        axios.post('/api/messages', {
            image: secureUrl,
            conversationId
        })
    }


    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onSuccess={handleUpload}
                uploadPreset="xbckrm8i"
            >
                <HiPhoto size={36} className="text-sky-500" />
            </CldUploadButton>

            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput id='message' register={register} errors={errors} required placeholder="Write a message" />
                <button type="submit" className="rounded-full bg-sky-500 hover:bg-sky-600 transition p-2 cursor-pointer">
                    <HiPaperAirplane size={36} className="text-white" />
                </button>
            </form>
        </div>
    )
}

export default Form
