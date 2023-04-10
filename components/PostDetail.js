import React from 'react';
import { Box, Heading, Text, VStack, HStack, Divider } from "@chakra-ui/react";

const PostDetail = ({ post }) => {
    return (
        <Box maxW="container.lg" mx="auto" mt={10} p={6} borderWidth={1} borderRadius={8} boxShadow="lg">
            <Heading as="h2" size="xl" mb={4}>
                {post.title}
            </Heading>
            <Divider />
            <VStack align="start" mt={4} spacing={4}>
                <Text fontSize="md">{post.body}</Text>
                <HStack spacing={4}>
                    <Text fontSize="sm">
                        <b>User ID:</b> {post.userId}
                    </Text>
                    <Text fontSize="sm">
                        <b>Post ID:</b> {post.id}
                    </Text>
                </HStack>
            </VStack>
        </Box>
    );
};

export default PostDetail;
