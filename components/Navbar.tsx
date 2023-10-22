import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { ImPacman } from "react-icons/im";

export default function NavbarComponent() {
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
        <NavbarItem>
          <Link
            className="text-xl text-default-500 hover:opacity-80 transition-opacity"
            target="_bank"
            href="https://github.com/PAC-BKKBuidl2023"
          >
            <AiFillGithub size="30" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <div>0x626a...4000</div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
