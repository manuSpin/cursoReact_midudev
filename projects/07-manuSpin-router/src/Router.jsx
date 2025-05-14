import { Children, useEffect, useState } from "react";
import { match } from 'path-to-regexp';
import { getCurrentPath } from "./utils/utils";
import { EVENTS } from './utils/consts.js'



export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404 - NOT FOUND</h1> }) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath());
    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(getCurrentPath())
        }
        window.addEventListener(EVENTS.PUSH_STATE, onLocationChange);
        window.addEventListener(EVENTS.POP_STATE, onLocationChange);

        return () => {
            window.removeEventListener(EVENTS.PUSH_STATE, onLocationChange);
            window.removeEventListener(EVENTS.POP_STATE, onLocationChange);
        }
    }, []);

    let routeParams = {};

    const routesFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type;
        const isRoute = name === 'Route';

        return isRoute ? props : null;
    });

    const routeToUse = routes.concat(routesFromChildren).filter(Boolean);

    const Page = routeToUse.find(({ path }) => {
        if (path === currentPath) {
            return true;
        }

        // Detectamos las rutas diámicas como /search/:query
        const matcherUrl = match(path, { decode: decodeURIComponent });
        const matched = matcherUrl(currentPath);

        if (!matched) {
            return false;
        }

        // Guardamos los parámetros de la url que era dinámicos
        routeParams = matched.params

        return true;
    })?.Component;


    return Page ? <Page routeParams={routeParams} /> : <DefaultComponent />
}