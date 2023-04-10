// pages/posts/[id].js

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PostDetail from "../../components/PostDetail";
import axios from "axios";

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
            setPost(response.data);
        };

        fetchPost();
    }, [id]);

    return <PostDetail post={post} />;
};

export default Post;
