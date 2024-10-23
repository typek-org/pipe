const OVERLOAD_COUNT = 16;

const gen = <T>(length: number, fn: (i: number) => T): T[] =>
  Array.from({ length })
    .fill(undefined)
    .map((_, i) => fn(i));

/**
 * Generate Excel-like identifiers A, B, ... Z, AA with letters
 * in the specified range, and starting on the specified letter.
 */
const letterIdentifier = (
  index: number,
  range: [string, string],
  start: string = range[0]
): string => {
  const startOffset = start.codePointAt(0)! - range[0].codePointAt(0)!;
  const base = range[1].codePointAt(0)! - range[0].codePointAt(0)! + 1;
  let result = "";

  let value = index + startOffset + 1;
  while (value-- > 0) {
    const remainder = value % base;
    result =
      String.fromCodePoint(range[0].codePointAt(0)! + remainder) + result;
    value = Math.floor(value / base);
  }

  return result;
};

function functionOverload(n: number) {
  const typeArgs = gen(n + 1, (i) => letterIdentifier(i, ["A", "Z"]));
  const fns = gen(n, (i) => letterIdentifier(i, ["a", "z"], "f"));

  return (
    `export function pipe<${typeArgs.join(", ")}>(` +
    `value: ${typeArgs[0]}, ` +
    fns
      .map((f, i) => `${f}: (v: ${typeArgs[i]}) => ${typeArgs[i + 1]}`)
      .join(", ") +
    `): ${typeArgs.at(-1)};`
  );
}

function asyncFunctionOverload(n: number) {
  const typeArgs = gen(n + 1, (i) => letterIdentifier(i, ["A", "Z"]));
  const fns = gen(n, (i) => letterIdentifier(i, ["a", "z"], "f"));

  return (
    `export function pipeAsync<${typeArgs.join(", ")}>(` +
    `value: ${typeArgs[0]}, ` +
    fns
      .map((f, i) => `${f}: (v: Awaited<${typeArgs[i]}>) => ${typeArgs[i + 1]}`)
      .join(", ") +
    `): Promise<Awaited<${typeArgs.at(-1)}>>;`
  );
}

function methodOverload(n: number) {
  const typeArgs = gen(n + 1, (i) => letterIdentifier(i, ["A", "Z"], "B"));
  const fns = gen(n, (i) => letterIdentifier(i, ["a", "z"], "g"));

  return (
    `pipe<${typeArgs.join(", ")}>(` +
    `f: (v: A) => ${typeArgs[0]}, ` +
    fns
      .map((f, i) => `${f}: (v: ${typeArgs[i]}) => ${typeArgs[i + 1]}`)
      .join(", ") +
    `): ${typeArgs.at(-1)};`
  );
}

function asyncMethodOverload(n: number) {
  const typeArgs = gen(n + 1, (i) => letterIdentifier(i, ["A", "Z"], "B"));
  const fns = gen(n, (i) => letterIdentifier(i, ["a", "z"], "g"));

  return (
    `pipeAsync<${typeArgs.join(", ")}>(` +
    `f: (v: Awaited<A>) => ${typeArgs[0]}, ` +
    fns
      .map((f, i) => `${f}: (v: Awaited<${typeArgs[i]}>) => ${typeArgs[i + 1]}`)
      .join(", ") +
    `): Promise<Awaited<${typeArgs.at(-1)}>>;`
  );
}

Deno.writeTextFileSync(
  "./lib/mod.ts",
  Deno.readTextFileSync("./template.ts")
    .replaceAll(`#{overload-count}`, `${OVERLOAD_COUNT}`)
    .replaceAll(
      `//#[function-overload]`,
      gen(OVERLOAD_COUNT, functionOverload).join(" ")
    )
    .replaceAll(
      `//#[async-function-overload]`,
      gen(OVERLOAD_COUNT, asyncFunctionOverload).join(" ")
    )
    .replaceAll(
      `//#[method-overload]`,
      gen(OVERLOAD_COUNT, methodOverload).join(" ")
    )
    .replaceAll(
      `//#[async-method-overload]`,
      gen(OVERLOAD_COUNT, asyncMethodOverload).join(" ")
    )
);

import $ from "jsr:@david/dax";
await $`deno fmt --line-width=1000 lib/mod.ts`;
