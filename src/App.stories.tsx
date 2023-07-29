import React from "react";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import App from "./App";


export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExample=()=>{
    return <>
        <App/>
    </>
}