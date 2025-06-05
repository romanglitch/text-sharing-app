import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import DefaultLayout from "@/layouts/default";
import {title} from "@/components/primitives";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import NextLink from "next/link";
import Head from 'next/head'

export default function ViewTextPage() {
    const router = useRouter();
    const {id} = router.query;
    const [text, setText] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [isVisible, setIsVisible] = React.useState(false);

    useEffect(() => {
        if (!id || Array.isArray(id)) return;

        setLoading(true);
        fetch(`/api/view/${id}`)
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setText(data.text);
                } else {
                    const err = await res.json();
                    setError(err.error || 'Ошибка получения текста');
                }
            })
            .catch(() => setError('Ошибка соединения с сервером'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <>
            <Head>
                <title>SHARE.GLITCHWEB - Loading...</title>
            </Head>
            <DefaultLayout>
                <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                    <div className="inline-block max-w-xl text-center justify-center">
                        <span className={title()}>&nbsp;</span>
                        <span className={title({color: "violet"})}>LOADING &nbsp;</span>
                        <span className={title()}>text &nbsp;</span>
                    </div>
                </section>
            </DefaultLayout>
        </>
    );
    if (error) return (
        <>
            <Head>
                <title>SHARE.GLITCHWEB - Error</title>
            </Head>
            <DefaultLayout>
                <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                    <div className="inline-block max-w-xl text-center justify-center">
                        <span className={title()}>{error}&nbsp;</span>
                        <span className={title({color: "violet"})}>ERROR&nbsp;</span>
                    </div>
                    <NextLink className="w-full flex justify-center mt-3" href="/">
                        <Button size="lg">Вернуться на главную</Button>
                    </NextLink>
                </section>
            </DefaultLayout>
        </>
    );

    return (
        <>
            <Head>
                <title>SHARE.GLITCHWEB - Copy your text</title>
            </Head>
            <DefaultLayout>
                <section className="flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-5 text-center justify-center">
                        <div>
                            <span className={title()}>copy&nbsp;</span>
                            <span className={title({color: "violet"})}>YOUR&nbsp;</span>
                            <span className={title()}>text&nbsp;</span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Input
                                isReadOnly
                                className="w-full"
                                onFocus={() => setIsVisible(true)}
                                onBlur={() => setIsVisible(false)}
                                label="Text"
                                type={isVisible ? "text" : "password"}
                                variant="bordered"
                                value={text}
                            />
                            <p>
                                Ссылка будет удаленна через 60 сек.
                            </p>
                        </div>
                    </div>
                    <NextLink className="w-full flex justify-center mt-3" href="/">
                        <Button size="lg">Вернуться на главную</Button>
                    </NextLink>
                </section>
            </DefaultLayout>
        </>
    );
}