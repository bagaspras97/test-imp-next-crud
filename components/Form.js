import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

import {
    Button,
    Input,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from 'react-query';

const FormComponent = ({ input, isEdit, setIsEdit }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();
    const queryClient = useQueryClient();

    const postMutation = useMutation((data) => {
        if (isEdit) {
            return axios.put(`https://jsonplaceholder.typicode.com/posts/${data.id}`, data);
        } else {
            return axios.post('https://jsonplaceholder.typicode.com/posts', data);
        }
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
            reset();
        },
        onError: (error) => {
            alert(error.message);
        },
    });

    const onSubmit = (data) => {
        setIsEdit(false)
        postMutation.mutate(data);
    };

    useEffect(() => {
        if (isEdit || input.id) {
            setValue("id", input.id)
            setValue("title", input.title)
            setValue("body", input.body);
            setValue("userId", input.userId)
        }
    }, [isEdit, input.id])

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.title} mb={1}>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input id="title" {...register("title", {
                        required: "This field is required",
                    })} />
                    <FormErrorMessage>
                        {errors.title && errors.title.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.body} mb={1}>
                    <FormLabel htmlFor="body">Body</FormLabel>
                    <Input id="body" {...register("body", {
                        required: "This field is required",
                    })} />
                    <FormErrorMessage>
                        {errors.body && errors.body.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.userId} mb={1}>
                    <FormLabel htmlFor="userId">User ID</FormLabel>
                    <Select id="userId" {...register("userId")}>
                        {Array.from({ length: 10 }, (_, index) => index + 1).map((userId) => (
                            <option key={userId} value={userId}>{userId}</option>
                        ))}
                    </Select>
                    <FormErrorMessage>
                        {errors.userId && errors.userId.message}
                    </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit" isLoading={postMutation.isLoading}>
                    Submit
                </Button>
            </form>
        </Box>
    )
}

export default React.memo(FormComponent)
