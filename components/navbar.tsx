import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

import {
  GithubIcon
} from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar className="gl-navbar" position="sticky">
      <NavbarContent className="w-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
            <NextLink className="flex flex-col" href="/">
                <p className="font-bold text-inherit">{siteConfig.name}</p>
                <p className="font-light text-sm text-inherit">{siteConfig.description}</p>
            </NextLink>
        </NavbarBrand>
      </NavbarContent>

        <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
      </NavbarContent>
    </HeroUINavbar>
  );
};
