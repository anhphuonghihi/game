import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TopicDetails from "./page/TopicDetails";
import Game from "./page/Game";
import Topic from "./page/Topic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Game />,
  },
  {
    path: "/topic",
    element: <Topic />,
  },
  {
    path: "/topic/:id",
    element: <TopicDetails />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
