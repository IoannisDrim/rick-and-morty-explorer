import { lazy, Suspense, useEffect, useRef } from "react";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import Home from "@views/Home";
import ErrorBoundary from "@components/ErrorBoundary";
import AppWrapper from "@components/AppWrapper";
import Header from "@components/Header";
import LoadingIndicator from "@components/LoadingIndicator";

const Docs = lazy(() => import("@views/Docs"));

const RouterRoot = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <AppWrapper>
        <Header />
        <ErrorBoundary resetKey={location.pathname}>
          <main ref={mainRef} tabIndex={-1} style={{ outline: "none" }}>
            <Suspense fallback={<LoadingIndicator />}>
              <Outlet />
            </Suspense>
          </main>
        </ErrorBoundary>
      </AppWrapper>
    </ErrorBoundary>
  );
};

const router = createBrowserRouter([
  {
    element: <RouterRoot />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/docs", element: <Docs /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
