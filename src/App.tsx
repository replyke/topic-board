import { ReplykeProvider, useSignTestingJwt } from "@replyke/react-js";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import PostPage from "./pages/post/[id]";
import TopicPage from "./pages/TopicPage";
import Layout from "./components/Layout";

import { users } from "./mock-data";
import HomePage from "./pages/HomePage";

function App() {
  const signTestingJwt = useSignTestingJwt();

  const [signedToken, setSignedToken] = useState<string>();

  useEffect(() => {
    const handleSignJwt = async () => {
      const payload = users[1];

      const token = await signTestingJwt({
        projectId: import.meta.env.VITE_PUBLIC_REPLYKE_PROJECT_ID!,
        payload,
        privateKey: import.meta.env.VITE_PUBLIC_REPLYKE_SECRET_KEY!,
      });
      // Set the signed JWT in the state
      setSignedToken(token);
    };

    handleSignJwt();
  }, []);

  return (
    <ReplykeProvider
      projectId={import.meta.env.VITE_PUBLIC_REPLYKE_PROJECT_ID}
      signedToken={signedToken}
    >
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/topics/:topicId" element={<TopicPage />} />
            <Route path="/post/:postId" element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReplykeProvider>
  );
}

export default App;
