import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SharedLayout from "./pages/SharedLayout";
import Home from "./pages/Home";
import CreateJournal from "./pages/CreateJournal";
import SingleJournal from "./pages/SingleJournal";
import MyJournals from "./pages/MyJournals";
import EditJournal from "./pages/EditJournal";
import { loader as homeLoader } from "./pages/SharedLayout";
import { loader as myJournalLoader } from "./pages/MyJournals";
import { loader as singleJournalLoader } from "./pages/SingleJournal";
import { loader as editLoader } from "./pages/EditJournal";
import { loader as deleteLoader } from "./pages/DeleteJournal";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as createJournalAction } from "./pages/CreateJournal";
import { action as editJournalAction } from "./pages/EditJournal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    loader: homeLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create-journal",
        element: <CreateJournal />,
        action: createJournalAction,
      },
      {
        path: "my-journals",
        element: <MyJournals />,
        loader: myJournalLoader,
      },
      {
        path: "my-journals/:id",
        element: <SingleJournal />,
        loader: singleJournalLoader,
      },
      {
        path: "my-journals/edit/:id",
        element: <EditJournal />,
        loader: editLoader,
        action: editJournalAction,
      },
      {
        path: "my-journals/delete/:id",
        loader: deleteLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}>
      <Register />
    </RouterProvider>
  );
};

export default App;
