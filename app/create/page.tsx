"use client";

import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export default function Page({ children }: { children: React.ReactNode }) {
  const myTheme = createTheme({
    theme: "dark",
    settings: {},
    styles: [],
  });
  const initSolidityCode = `
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.4;

    contract SimpleStorage {
        uint256 storedData;
        function set(uint x) public {
            storedData = x;
        }
        function get() public view returns (uint) {
            return storedData;
        }
    }
  `;
  const initYamlCode = `
    doe: "a deer, a female deer"
    ray: "a drop of golden sun"
    pi: 3.14159
    xmas: true
    french-hens: 3
    calling-birds:
      - huey
      - dewey
      - louie
      - fred
    xmas-fifth-day:
      calling-birds: four
      french-hens: 3
      golden-rings: 5
      partridges:
        count: 1
        location: "a pear tree"
      turtle-doves: two
  `;
  return (
    <div className="container flex gap-12">
      <div className="w-1/2">
        <CodeMirror
          value={initSolidityCode}
          height="200px"
          extensions={[langs.solidity()]}
          theme={myTheme}
        />
      </div>
      <div className="w-1/2">
        <CodeMirror
          value={initYamlCode}
          height="200px"
          extensions={[langs.yaml()]}
          theme={myTheme}
        />
      </div>
    </div>
  );
}
