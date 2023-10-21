import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

export default function NavbarComponent() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">PACMON</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {/* <NavbarItem>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
