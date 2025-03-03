import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Turns something like '@solana/web3.js' into SolanaWeb3Js */
function toPascalCase(str) {
  const capitalize = (val) => `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
  const parts = str.split(/[^a-zA-Z0-9]+/);
  return parts.filter(Boolean).map(capitalize).join("");
}

const peerDeps = Object.keys(packageJson.peerDependencies);
export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "SolanaWalletStandard",
      // the proper extensions will be added
      fileName: "solana-wallet-standard",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: peerDeps,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: Object.fromEntries(
          peerDeps.map((name) => [name, toPascalCase(name)]),
        ),
      },
    },
  },
});
