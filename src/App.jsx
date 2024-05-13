
import './App.css'
import React, { Suspense } from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {CircularProgress} from "@mui/material";
import {TRAVEL_PICKUP_ROUTES} from "./constants/routes.js";

const LoginPage = React.lazy(() => import("./pages/LoginPage/index.jsx"));
const KakaoLoginProcessingPage = React.lazy(() => import("./pages/KakaoLoginProcessingPage/index.jsx"));
const AuthProtected = React.lazy(() => import("./components/AuthProtected/index.jsx"));
const TravelPickupHomePage = React.lazy(() => import("./pages/TravelPickupHomePage/index.jsx"));
const TravelPickupEnrolPage = React.lazy(() => import("./pages/TravelPickupEnrolPage/index.jsx"));
const TravelPickupDetailPage = React.lazy(() => import("./pages/TravelPickupDetailPage/index.jsx"));
const TravelPickupCompletePage = React.lazy(() => import('./pages/TravelPickupCompletePage/index.jsx'));
const TravelPickupNotFoundPage = React.lazy(()=> import('./pages/TravelPickupNotFoundPage/index.jsx'));
const TravelPickupCenterPage = React.lazy(() => import('./pages/TravelPickupCenterPage/index.jsx'));

function App() {

  const queryClient = new QueryClient();

  return (
    <Suspense fallback={<CircularProgress sx={{margin: 'auto', verticalAlign: 'center'}} />}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/*로그인 관련 라우터*/}
                    <Route path={TRAVEL_PICKUP_ROUTES.ROOT} element={<LoginPage/>}/>
                    <Route path={TRAVEL_PICKUP_ROUTES.LOGIN} element={<LoginPage/>}/>

                    <Route path={TRAVEL_PICKUP_ROUTES.AUTH.ROOT}>
                        <Route path={TRAVEL_PICKUP_ROUTES.AUTH.PARAMS.PROVIDER} element={<KakaoLoginProcessingPage/>}/>
                    </Route>

                    {/*로그인 했을때만 접근가능한 라우터*/}
                    <Route path={TRAVEL_PICKUP_ROUTES.PICKUPS.ROOT} element={<AuthProtected/>}>
                        <Route path={TRAVEL_PICKUP_ROUTES.PICKUPS.HOME} element={<TravelPickupHomePage/>}/>
                        <Route path={TRAVEL_PICKUP_ROUTES.PICKUPS.ENROL} element={<TravelPickupEnrolPage/>}/>
                        <Route path={TRAVEL_PICKUP_ROUTES.PICKUPS.PARAMS.PICKUP_ID} element={<TravelPickupDetailPage/>}/>
                        <Route path={TRAVEL_PICKUP_ROUTES.PICKUPS.COMPLETE} element={<TravelPickupCompletePage/>}/>
                        <Route path={TRAVEL_PICKUP_ROUTES.PICKUPS.CENTER} element={<TravelPickupCenterPage/>}/>
                    </Route>

                    {/*404 Not Found Page*/}
                    <Route path={TRAVEL_PICKUP_ROUTES.NOT_FOUND} element={<TravelPickupNotFoundPage/>}></Route>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </Suspense>
  )
}

export default App

