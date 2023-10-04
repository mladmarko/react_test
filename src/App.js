import {Backdrop, CircularProgress, Container, ThemeProvider} from "@mui/material";
import {Suspense, useEffect, lazy} from "react";
import theme from "./styles/theme";
import Header from "./components/header";
import {BrowserRouter, Route, Routes} from "react-router-dom";


const ArticleList = lazy(() => import('./components/articles/articleList'));
const ArticlePage = lazy(() => import('./components/articles/articlePage'));
const PageNotFound = lazy(() => import('./components/servicePages/pageNotFound'));

function App() {

    useEffect(() => {
        document.title = "Scripttic Articles";
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <Header/>

                <BrowserRouter>
                    <Suspense fallback={<Backdrop open={true}>
                        <CircularProgress/>
                    </Backdrop>}>
                        <Routes>
                            <Route path="/" element={<ArticleList/>}/>
                            <Route path="/articles/:id" element={<ArticlePage/>}/>
                            <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </Container>
        </ThemeProvider>
    );
}

export default App;
