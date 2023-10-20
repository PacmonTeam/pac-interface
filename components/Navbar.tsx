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
        <p className="font-bold text-inherit mx-1">PACMON</p>
        <div className="text-2xl text-yellow-400">
          <ImPacman />
        </div>
      </NavbarBrand>
      <NavbarContent as="div" className="items-center" justify="end">
        <NavbarItem>
          <Link
            className="text-xl"
            target="_bank"
            href="https://github.com/PAC-BKKBuidl2023"
          >
            <AiFillGithub />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
