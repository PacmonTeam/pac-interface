import {
  Button,
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
            className="text-xl"
            target="_bank"
            href="https://github.com/PAC-BKKBuidl2023"
          >
            <AiFillGithub />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/create">
            Create New Project
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
