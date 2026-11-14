import { build } from "esbuild";
import vm from "node:vm";

export async function loadModule(path, globals = {}, imports = {}) {
  const { outputFiles } = await build({
    entryPoints: [`src/maps/${path}.ts`],
    bundle: true,
    write: false,
    format: "cjs",
    platform: "node",
    target: "es2022",
    plugins: [
      {
        name: "test-imports",
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) =>
            args.path in imports
              ? { path: args.path, namespace: "fixture" }
              : undefined,
          );
          build.onLoad({ filter: /.*/, namespace: "fixture" }, (args) => ({
            contents: imports[args.path],
          }));
        },
      },
    ],
  });
  const context = vm.createContext({
    module: { exports: {} },
    structuredClone,
    URL,
    TextDecoder,
    setTimeout,
    clearTimeout,
    console,
    ...globals,
  });
  new vm.Script(outputFiles[0].text).runInContext(context);
  return context.module.exports;
}
