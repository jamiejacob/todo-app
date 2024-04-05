import "./App.css";
import { NotificationProvider } from "./context/NotificationContext";
import { TodoProvider } from "./context/TodoContext";
import { Suspense } from "react";
import { Loading } from "./components/Loading";
import Layout from "./Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditTodo from "./pages/EditTodo";
import Home from "./pages/Home";

function MainRoutes(){
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/todo/:id" element={<EditTodo />}></Route>
    </Routes>
  </Router>
  )
}
function App() {
  return (
    <Layout>
    <Suspense fallback={<Loading />}>
      <NotificationProvider>
        <TodoProvider>
         <MainRoutes/>
        </TodoProvider>
      </NotificationProvider>
    </Suspense>
    </Layout>
  );
}

export default App;
