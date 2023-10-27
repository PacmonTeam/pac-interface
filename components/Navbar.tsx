import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { ImPacman } from "react-icons/im";
import { useRouter } from "next/router";

const Menus = [
  { menu: "Project", path: "/project" },
  { menu: "Node", path: "/node" },
];

export default function NavbarComponent() {
  const router = useRouter();
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link className="flex" href="/">
          <p className="font-bold text-inherit mx-1">PACMON</p>
          <div className="text-2xl text-yellow-400">
            <ImPacman />
          </div>
        </Link>
      </NavbarBrand>
      <NavbarContent as="div" className="items-center" justify="end">
        {Menus.map((item, index) => (
          <NavbarItem key={index} isActive={item.path === router.asPath}>
            <Link
              href={item.path}
              className={
                item.path !== router.asPath
                  ? "text-default-500 hover:text-default-800 transition-color"
                  : ""
              }
            >
              {item.menu}
            </Link>
          </NavbarItem>
        ))}
        <NavbarItem className="ml-4">
          <Link
            className="text-xl hover:text-default-500 transition-color"
            target="_bank"
            href="https://github.com/PAC-BKKBuidl2023"
          >
            <AiFillGithub size="30" />
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
          <div>0x626a...4000</div>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
