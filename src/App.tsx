import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CommentsPage } from './pages/CommentsPage/CommentsPage';
import { CommentDetailPage } from './pages/CommentDetailsPage/CommentDetails';
import { AddCommentPage } from './pages/AddCommentPage/AddCommentPage';
import { Layout } from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CommentsPage />,
      },
      {
        path: '/:id',
        element: <CommentDetailPage />,
      },
      {
        path: 'new-comment',
        element: <AddCommentPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
