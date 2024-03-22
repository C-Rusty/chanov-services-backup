import React, { useEffect, useState } from "react";
import { Route, Routes, json} from "react-router-dom";
import { api } from "../../api/ApiPosts";
import Loading from "./utilities/Loading";

const Content = () => {
    
    const AboutMe = React.lazy(() => import('./utilities/AboutMe'));
    const Trainings = React.lazy(() => import('./utilities/Trainings'));
    const ArticlesAndCases = React.lazy(() => import('./utilities/ArticlesAndCases'));
    const Contacts = React.lazy(() => import('./utilities/Contacts'));
    const FullPost = React.lazy(() => import('./utilities/post/FullPost'));
    const NoPage = React.lazy(() => import('./utilities/404'));
    
    const [postsRouteNamesState, setPostsRouteNamesState] = useState<Array<string> | []>([]);

    const setPostsRoutesFromApi = async () => {
        const response = await api.getPostsUrl();
        
        if (response) {
            sessionStorage.setItem(`routes`, JSON.stringify(response));
            setPostRoutesFromStorage();
        } else {
            throw new Error (`Something wrong with posts API response. Posts API returned value ${response}`);
        };
    };

    const setPostRoutesFromStorage = () => {
        const storagePostsRoutes = sessionStorage.getItem(`routes`);
        
        if (storagePostsRoutes) {
            setPostsRouteNamesState(JSON.parse(storagePostsRoutes));
        };
    };

    useEffect(() => {
        const routes = sessionStorage.getItem(`routes`); 
        if(!routes) {
            setPostsRoutesFromApi();
        } else {
            setPostRoutesFromStorage();
        };
    }, []);

    return(
        <React.Suspense fallback={<Loading/>}>
            <Routes>
                <Route path="/" element={<AboutMe/>}/>
                <Route path="trainings" element={<Trainings/>}/>
                <Route path="articles-and-cases" element={<ArticlesAndCases/>}>
                    {postsRouteNamesState.map(pathName =>
                        <Route path={pathName} element={<FullPost/>} key={pathName} />   
                    )}
                </Route>
                <Route path="contacts" element={<Contacts/>}/>
                <Route path="*" element={<NoPage/>} />
            </Routes>
        </React.Suspense>
    )
};

export default Content;