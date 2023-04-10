import React, { useState } from "react";
import { Container, Heading, } from "@chakra-ui/react";

// Mengimpor React Query dan Axios
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import TableComponent from "@/components/Table";
import FormComponent from "@/components/Form";


// Membuat komponen Home
function Home() {
  // Membuat state untuk menyimpan input
  const [input, setInput] = useState({
    id: "",
    title: "",
    body: "",
    userId: "",
  });

  const [isEdit, setIsEdit] = useState(false)

  // Membuat query client untuk mengakses query cache
  const queryClient = useQueryClient();

  // Membuat query untuk mengambil data posts

  // Membuat fungsi untuk mengambil data posts dari jsonplaceholder
  const fetchPosts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");

    return response.data;
  };


  // Membuat fungsi untuk menghapus data posts dari jsonplaceholder
  const deletePost = async (id) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.data;
  };


  const { data: posts, isLoading, isError } = useQuery("posts", fetchPosts);

  // Membuat mutation untuk menghapus data posts
  const deletePostMutation = useMutation(deletePost, {
    onSuccess: (data) => {
      // Menginvalidasi query cache agar data terbaru ditampilkan
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      // Menampilkan pesan error jika gagal menghapus data
      alert(error.message);
    },
  });


  // Membuat fungsi untuk mengubah input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  }

  // Membuat fungsi untuk menghapus data posts
  const handleDelete = (id) => {
    // Menjalankan mutation untuk menghapus data posts
    deletePostMutation.mutate(id);
  };

  // Membuat fungsi untuk mengedit data posts
  const handleEdit = (id) => {
    // Mencari data posts dari query cache berdasarkan id
    const post = queryClient.getQueryData("posts").find((item) => item.id === id);
    // Mengisi input dengan data yang ditemukan

    setIsEdit(true)
    setInput(post);
  };



  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {isError.message}</p>;
  }


  return (
    <Container maxW="container.lg" p={4}>
      <Heading mb={4}>Post</Heading>
      <FormComponent input={input} handleChange={handleChange} isEdit={isEdit} setIsEdit={setIsEdit} />
      <TableComponent posts={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
    </Container>
  );
}

export default Home;
