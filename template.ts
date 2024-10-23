// Types inspired by https://dev.to/ecyrbe/how-to-use-advanced-typescript-to-define-a-pipe-function-381h

type AnyFn = (v: any) => any;

type LastFnReturnType<F extends AnyFn[], Else = never> = F extends [
  ...any[],
  (...arg: any) => infer R
]
  ? R
  : AnyFn[] extends F
  ? any
  : Else;

type PipeArgs<F extends AnyFn[], Acc extends AnyFn[] = []> = F extends [
  (v: infer A) => infer B
]
  ? [...Acc, (v: A) => B]
  : F extends [(v: infer A) => any, ...infer Tail]
  ? Tail extends [(arg: infer B) => any, ...any[]]
    ? PipeArgs<Tail, [...Acc, (v: A) => B]>
    : Acc
  : Acc;

type PipeAsyncArgs<F extends AnyFn[], Acc extends AnyFn[] = []> = F extends [
  (v: infer A) => infer B
]
  ? [...Acc, (v: A) => B]
  : F extends [(v: infer A) => any, ...infer Tail]
  ? Tail extends [(arg: infer B) => any, ...any[]]
    ? PipeAsyncArgs<Tail, [...Acc, (v: A) => B | Promise<B>]>
    : Acc
  : Acc;

/**
 * Pipes a value through a series of functions. `pipe(v, f, g)` is equivalent
 * to `g(f(v))`, but often much more readable.
 *
 * > [!NOTE]
 * >
 * > If you want to use more than #{overload-count} functions, you'll either
 * > have to provide explicit type annotations, or put a `toPipable` at the
 * > end of one pipe, and then continue with the `.pipe()` method:
 * > ```ts
 * > const result = pipe(value, f, g, ..., toPipable).pipe(h, j, ...)
 * > ```
 *
 * @example
 * ```typescript
 * const values = pipe(
 *   document.querySelectorAll('a'),
 *   els => map(els, el => idMap.get(el.id)),
 *   vs => filter(vs, v => v !== undefined),
 *   Array.from<string>
 * );
 *
 * // the same as:
 * const values = Array.from(
 *   filter(
 *     map(
 *       document.querySelectorAll('a'),
 *       el => idMap.get(el.id)
 *     ),
 *     v => v !== undefined
 *   )
 * )
 * ```
 */
//#[function-overload]
export function pipe<F extends AnyFn[]>(
  arg: Parameters<F[0]>[0],
  ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
): LastFnReturnType<F>;

export function pipe(value: any, ...fns: AnyFn[]): any {
  return fns.reduce((v, f) => f(v), value);
}

/**
 * Pipes a value through a series of asynchronous functions, awaiting
 * each result before passing it into the next function.
 * `await pipeAsync(v, f, g)` is equivalent to `await g(await f(await v))`.
 *
 * @example
 * ```ts
 * const name = pipeAsync(
 *   `https://example.com/${endpoint}`,
 *   url => fetch(url),
 *   res => res.json(),
 *   ({ user }) => user.name,
 * )
 * ```
 */
//#[async-function-overload]
export function pipeAsync<F extends AnyFn[]>(
  arg: Parameters<F[0]>[0] | Promise<Parameters<F[0]>[0]>,
  ...fns: PipeAsyncArgs<F> extends F ? F : PipeAsyncArgs<F>
): Promise<Awaited<LastFnReturnType<F>>>;

export async function pipeAsync(value: any, ...fns: AnyFn[]): Promise<any> {
  for (const f of fns) value = f(await value);
  return value;
}

export interface PipeOf<A> {
  /**
   * Pipes the object through the provided functions and returns the last result.
   * `v.pipe(f, g)` is equivalent to `g(f(v))`.
   *
   * > [!NOTE]
   * >
   * > If you want to use more than #{overload-count} functions, you'll either
   * > have to provide explicit type annotations, or put a `toPipable` at the
   * > end of one pipe, and then continue with the `.pipe()` method:
   * > ```ts
   * > const result = value.pipe(f, g, ..., toPipable).pipe(h, j, ...)
   * > ```
   */
  //#[method-overload]
  pipe<F extends AnyFn[], FirstFn extends (v: A) => Parameters<F[0]>[0]>(
    firstFn: FirstFn,
    ...fns: PipeArgs<F> extends F ? F : PipeArgs<F>
  ): LastFnReturnType<F, ReturnType<FirstFn>>;

  /**
   * Pipes the object through the provided asynchronous functions, awaiting
   * each result before passing it into the next function.
   *
   * > [!NOTE]
   * >
   * > If you want to use more than #{overload-count} functions, you'll either
   * > have to provide explicit type annotations, or put a `toPipable` at the
   * > end of one pipe, and then continue with the `.pipeAsync()` method:
   * > ```ts
   * > const result = value.pipeAsync(f, g, ..., toPipable).pipeAsync(h, j, ...)
   * > ```
   */
  //#[async-method-overload]
  pipeAsync<
    F extends AnyFn[],
    FirstFn extends (v: A) => Parameters<F[0]>[0] | Promise<Parameters<F[0]>[0]>
  >(
    firstFn: FirstFn,
    ...fns: PipeAsyncArgs<F> extends F ? F : PipeAsyncArgs<F>
  ): Promise<Awaited<LastFnReturnType<F, ReturnType<FirstFn>>>>;
}

export type Pipable<T> = T & PipeOf<Pipable<T>>;

export function toPipable<T extends object>(obj: T): Pipable<T> {
  return Object.assign(obj, {
    pipe(...fns: AnyFn[]) {
      return pipe(obj, ...fns);
    },
    pipeAsync(...fns: AnyFn[]) {
      return pipeAsync(obj, ...fns);
    },
  });
}
