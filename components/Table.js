import React from 'react'

import {
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useRouter } from 'next/router'

const TableComponent = ({ posts, handleEdit, handleDelete }) => {

    const router = useRouter()

    const handleViewDetail = (id) => {
        router.push(`/post/${id}`);
    };

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Body</Th>
                    <Th>User ID</Th>
                    <Th>Aksi</Th>
                </Tr>
            </Thead>
            <Tbody>
                {posts.map((post) => (
                    <Tr key={post.id}>
                        <Td>{post.id}</Td>
                        <Td>{post.title}</Td>
                        <Td>{post.body}</Td>
                        <Td>{post.userId}</Td>
                        <Td style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button colorScheme="blue" onClick={() => handleViewDetail(post.id)} mb={2}>
                                Lihat Detail
                            </Button>
                            <Button colorScheme="yellow" onClick={() => handleEdit(post.id)} mb={2}>
                                Edit
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => handleDelete(post.id)}
                                mb={2}
                            >
                                Hapus
                            </Button>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}

export default React.memo(TableComponent)