import DefaultLayout from "@/layouts/default";
import {title} from "@/components/primitives";
import {Button} from "@heroui/button";
import NextLink from "next/link";
import Head from 'next/head'
import React from "react";

export default function ViewTextPage() {
    return (
        <>
            <Head>
                <title>SHARE.GLITCHWEB - Page not found</title>
            </Head>
            <DefaultLayout>
                <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                    <div className="inline-block max-w-xl text-center justify-center">
                        <span className={title()}>404&nbsp;</span>
                        <span className={title({color: "violet"})}>ERROR&nbsp;</span>
                    </div>
                    <NextLink className="w-full flex justify-center mt-3" href="/">
                        <Button size="lg">Вернуться на главную</Button>
                    </NextLink>
                </section>
            </DefaultLayout>
        </>
    )
}