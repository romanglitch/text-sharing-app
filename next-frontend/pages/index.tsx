import React from "react";
import {title, subtitle} from "@/components/primitives";
import {GithubIcon, SearchIcon, EyeFilledIcon, EyeSlashFilledIcon} from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import {Kbd} from "@heroui/kbd";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";

import {Image} from "@heroui/image";
import {Divider} from "@heroui/divider";

import {Link} from "@heroui/link";

import {Snippet} from "@heroui/snippet";

import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";


export default function IndexPage() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-xl text-center justify-center">
                    <span className={title()}>Share&nbsp;</span>
                    <span className={title({color: "violet"})}>YOUR&nbsp;</span>
                    <span className={title()}>text&nbsp;</span>
                </div>

                <div className="flex w-full flex-col gap-3">
                    <Input
                        className="w-full"
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
                    />
                    <div className="flex gap-3">
                        <Button className="w-full" color="primary" size="lg">Generate link</Button>
                        <Button className="w-fit" color="secondary" size="lg">Save</Button>
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <p className="text-sm">Saved</p>
                </div>
                <div className="flex flex-col w-full gap-1">
                    <Snippet size="sm" hideSymbol={true} color="success">Vk password</Snippet>
                    <Snippet size="sm" hideSymbol={true} color="success">Google Auth</Snippet>
                    <Snippet size="sm" hideSymbol={true} color="success">Telegram pass</Snippet>
                </div>
            </section>
        </DefaultLayout>
    );
}
