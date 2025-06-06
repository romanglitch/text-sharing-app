import React, {useEffect} from "react";
import {title} from "@/components/primitives";
import {EyeFilledIcon, EyeSlashFilledIcon, XMarkIcon} from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {Snippet} from "@heroui/snippet";
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import Head from 'next/head'

export default function IndexPage() {
    const [saved, setSaved] = React.useState([]);
    const [isSave, setIsSave] = React.useState(false);
    const [inputSaveName, setInputSaveName] = React.useState('')

    const [currentUrl, setCurrentUrl] = React.useState('');

    const [isVisible, setIsVisible] = React.useState(false);
    const [inputText, setInputText] = React.useState('')
    const [generatedURL, setGeneratedURL] = React.useState('')

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [saveSelected, setSaveSelected] = React.useState('--clear');

    const [loading, setLoading] = React.useState(false);

    const [seconds, setSeconds] = React.useState(60);

    useEffect(() => {
        if (process) {
            setCurrentUrl(window.location.host);
            setSaved(JSON.parse(localStorage.getItem('saved') as string) ? JSON.parse(localStorage.getItem('saved') as string) : () => {
                localStorage.setItem('saved', JSON.stringify([]))
                return JSON.parse(localStorage.getItem('saved') as string)
            })
        }

        if (seconds === 0) return;

        const timer = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    function pluralizeSeconds(number: number) {
        const cases = ["секунда", "секунды", "секунд"];
        number = Math.abs(number);
        if (number % 100 > 4 && number % 100 < 20) {
            return cases[2];
        }
        const lastDigit = number % 10;
        if (lastDigit === 1) {
            return cases[0];
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return cases[1];
        }
        return cases[2];
    }

    return (
        <>
            <Head>
                <title>SHARE.GLITCHWEB - Share your text</title>
            </Head>
            <DefaultLayout>
                <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                    <div className="inline-block max-w-xl text-center justify-center">
                        <span className={title()}>Share&nbsp;</span>
                        <span className={title({color: "violet"})}>YOUR&nbsp;</span>
                        <span className={title()}>text&nbsp;</span>
                    </div>

                    {generatedURL ? (
                        <Card className="py-4 w-full">
                            <CardBody className="overflow-visible py-2 pt-0 pb-0">
                                <Snippet className="w-full" size="md" hideSymbol={true} copyIcon={<XMarkIcon/>} onCopy={() => {
                                    setGeneratedURL('')
                                    setInputText('')
                                }} color="success">
                                    {currentUrl + generatedURL}
                                </Snippet>
                            </CardBody>
                            <CardFooter className="pb-0 px-4 flex-col items-start">
                                <small className="text-default-500">Ссылка будет удалена через {seconds} {pluralizeSeconds(seconds)}</small>
                            </CardFooter>
                        </Card>
                    ) : false}

                    <div className="flex w-full flex-col gap-3">
                        <Input
                            isRequired={true}
                            className={`w-full --text-input ${saveSelected === inputText ? `--savedValue` : ``}`}
                            endContent={
                                <button
                                    aria-label="toggle password visibility"
                                    className="focus:outline-none"
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                            label="Text"
                            placeholder="Enter your text"
                            type={isVisible ? "text" : "password"}
                            variant="bordered"
                            onValueChange={(value: string) => {
                                setInputText(value)
                            }}
                            value={inputText}
                        />
                        {isSave ? (
                            <Input
                                isRequired={true}
                                className="w-full"
                                label="Name"
                                placeholder="Enter pin name"
                                variant="bordered"
                                onValueChange={(value: string) => {
                                    setInputSaveName(value)
                                }}
                            />
                        ) : false}
                        <div className="flex gap-3">
                            {!isSave ? (
                                <Button className="w-full" color="primary" size="lg" isLoading={loading} onPress={async () => {
                                    setLoading(true)

                                    const response = await fetch('/api/generate-link', {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify({text: inputText}),
                                    });
                                    const data = await response.json();

                                    setGeneratedURL(data.link)
                                    setLoading(false)
                                    setSeconds(60)
                                    setTimeout(() => {
                                        setGeneratedURL('')
                                        setInputText('')
                                    }, 60*1000)
                                }}>CREATE LINK</Button>
                            ) : false}
                            <Button className={isSave ? 'w-full' : 'w-fit'} color={isSave ? "success" : "default"} size="lg"
                                    onPress={async () => {
                                        if (isSave) {
                                            let lsSaved = JSON.parse(localStorage.getItem('saved') as string)

                                            let newSavedItem = {
                                                id: Math.random().toString(16).slice(2),
                                                name: inputSaveName,
                                                text: inputText
                                            }

                                            lsSaved.push(newSavedItem)
                                            localStorage.setItem('saved', JSON.stringify(lsSaved))

                                            setSaved(JSON.parse(localStorage.getItem('saved') as string))

                                            setInputSaveName('')
                                            setIsSave(false)
                                        } else {
                                            setIsSave(true)
                                        }
                                    }}>SAVE</Button>
                        </div>
                    </div>

                    {saved.length ? (
                        <Card className="py-4 w-full pt-3">
                            <CardHeader className="pb-0 pt-0 px-4 flex-col items-start">
                                <small className="text-default-500">Favourites</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2 pb-0">
                                <div className="flex flex-col w-full gap-3">
                                    {saved.map(savedItem => {
                                        return (
                                            <Snippet
                                                className={`cursor-pointer`}
                                                key={savedItem['id']}
                                                hideSymbol={true}
                                                color={inputText === savedItem['text'] ? "primary" : "default"}
                                                copyIcon={(
                                                    <span>&#128465;</span>
                                                )}
                                                onClick={() => {
                                                    setInputText(savedItem['text'])
                                                    setSaveSelected(savedItem['text'])
                                                }}
                                                disableTooltip={true}
                                                onCopy={() => {
                                                    saved.splice(savedItem['id'], 1)

                                                    localStorage.setItem('saved', JSON.stringify(saved))
                                                    setSaved(JSON.parse(localStorage.getItem('saved') as string))
                                                }}
                                            >
                                                {savedItem['name']}
                                            </Snippet>
                                        )
                                    })}
                                </div>
                            </CardBody>
                        </Card>
                    ) : false }
                </section>
            </DefaultLayout>
        </>
    );
}
