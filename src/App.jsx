
import './App.css'
import React, { Suspense } from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {CircularProgress} from "@mui/material";

const LoginPage = React.lazy(() => import("./pages/LoginPage/index.jsx"));
const KakaoLoginProcessingPage = React.lazy(() => import("./pages/KakaoLoginProcessingPage/index.jsx"));
const LoginProtected = React.lazy(() => import("./components/LoginProtected/index.jsx"));
const TravelPickupHomePage = React.lazy(() => import("./pages/TravelPickupHomePage/index.jsx"));
const TravelPickupEnrolPage = React.lazy(() => import("./pages/TravelPickupEnrolPage/index.jsx"));
const TravelPickupDetailPage = React.lazy(() => import("./pages/TravelPickupDetailPage/index.jsx"));
const TravelPickupCompletePage = React.lazy(() => import('./pages/TravelPickupCompletePage/index.jsx'));
const TravelPickupNotFoundPage = React.lazy(()=> import('./pages/TravelPickupNotFoundPage/index.jsx'))

function App() {

  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<CircularProgress sx={{margin: 'auto', verticalAlign: 'center'}} />}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/*로그인 관련 라우터*/}
                    <Route path={"/"} element={<LoginPage/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/:provider"} element={<KakaoLoginProcessingPage/>}></Route>

                    {/*로그인 했을때만 접근가능한 라우터*/}
                    <Route path={"/home"} element={
                        <LoginProtected>
                            <TravelPickupHomePage/>
                        </LoginProtected>}>
                    </Route>

                    <Route path={"/enrol"} element={
                        <LoginProtected>
                            <TravelPickupEnrolPage/>
                        </LoginProtected>}>
                    </Route>

                    <Route path={"/pickups/:pickupId"} element={
                        <LoginProtected>
                            <TravelPickupDetailPage/>
                        </LoginProtected>}>
                    </Route>

                    <Route path={"/pickups/complete"} element={
                        <LoginProtected>
                            <TravelPickupCompletePage/>
                        </LoginProtected>}>
                    </Route>

                    {/*404 Not Found Page*/}
                    <Route path={"/error"} element={
                        <TravelPickupNotFoundPage/>}>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </Suspense>
  )
}

export default App

