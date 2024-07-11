import Form from "@/components/Form";
import Header from "@/components/Header";
import PostsFeed from "@/components/posts/PostsFeed";
import MainPage from "@/components/Home";

export default function Home() {

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's new to say ?" />
      <PostsFeed />
    </>
  )
}
