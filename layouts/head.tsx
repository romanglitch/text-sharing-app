import React, {useEffect, useState} from "react";
import NextHead from "next/head";

import {siteConfig} from "@/config/site";

export const Head = () => {
    return (
        <NextHead>
            <meta key="title" content={siteConfig.name} property="og:title"/>
            <meta content={siteConfig.description} property="og:description"/>
            <meta content={siteConfig.description} name="description"/>
            <meta
                key="viewport"
                content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                name="viewport"
            />
            <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"/>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <meta name="apple-mobile-web-app-title" content="TXT SHARE"/>
            <link rel="manifest" href="/site.webmanifest"/>
        </NextHead>
    );
};
