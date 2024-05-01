
import './App.css'
import {Route, Routes, BrowserRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage/index.jsx";
import KakaoLoginProcessingPage from "./pages/KakaoLoginProcessingPage/index.jsx";
import LoginProtectedRoute from "./components/LoginProtectedRoute/LoginProtectedRoute.jsx";
import TravelPickupHomePage from "./pages/TravelPickupHomePage/index.jsx";
import {QueryClient, QueryClientProvider} from "react-query";

function App() {

    const queryClient = new QueryClient();

  return (
    <>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>

                    {/*로그인 관련 라우터*/}
                    <Route path={"/"} element={<LoginPage/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/:provider"} element={<KakaoLoginProcessingPage/>}></Route>

                    {/*로그인 했을때만 접근가능한 라우터*/}
                    <Route path={"/home"} element={
                        <LoginProtectedRoute>
                            <TravelPickupHomePage/>
                        </LoginProtectedRoute>}>
                    </Route>

                    {/*404 Not Found Page*/}
                    <Route path={"/*"} element={<>존재하지 않은 페이지 입니다.</>}></Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </>
  )
}

export default App

