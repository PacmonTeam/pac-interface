importScripts(
  "https://binaries.soliditylang.org/bin/soljson-v0.8.19+commit.7dd6d404.js"
);
import wrapper from "solc/wrapper";

self.onmessage = (e) => {
  const input = e.data.input;
  if (!input) {
    return;
  }

  const compiler = wrapper((self as any).Module);
  console.log(`Solc version: ${compiler.version()}`);

  const compiled = compiler.compile(JSON.stringify(input));
  self.postMessage({
    output: JSON.parse(compiled),
  });
};
