// Types inspired by https://dev.to/ecyrbe/how-to-use-advanced-typescript-to-define-a-pipe-function-381h

type AnyFn = (v: any) => any;

type LastFnReturnType<F extends AnyFn[], Else = never> = F extends [
  ...any[],
  (...arg: any) => infer R,
] ? R
  : AnyFn[] extends F ? any
  : Else;

type PipeArgs<F extends AnyFn[], Acc extends AnyFn[] = []> = F extends [
  (v: infer A) => infer B,
] ? [...Acc, (v: A) => B]
  : F extends [(v: infer A) => any, ...infer Tail] ? Tail extends [(arg: infer B) => any, ...any[]] ? PipeArgs<Tail, [...Acc, (v: A) => B]>
    : Acc
  : Acc;

type PipeAsyncArgs<F extends AnyFn[], Acc extends AnyFn[] = []> = F extends [
  (v: infer A) => infer B,
] ? [...Acc, (v: A) => B]
  : F extends [(v: infer A) => any, ...infer Tail] ? Tail extends [(arg: infer B) => any, ...any[]] ? PipeAsyncArgs<Tail, [...Acc, (v: A) => B | Promise<B>]>
    : Acc
  : Acc;

/**
 * Pipes a value through a series of functions. `pipe(v, f, g)` is equivalent
 * to `g(f(v))`, but often much more readable.
 *
 * > [!NOTE]
 * >
 * > If you want to use more than 16 functions, you'll either
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
export function pipe<A>(value: A): A;
export function pipe<A, B>(value: A, f: (v: A) => B): B;
export function pipe<A, B, C>(value: A, f: (v: A) => B, g: (v: B) => C): C;
export function pipe<A, B, C, D>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D): D;
export function pipe<A, B, C, D, E>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E): E;
export function pipe<A, B, C, D, E, F>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F): F;
export function pipe<A, B, C, D, E, F, G>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G): G;
export function pipe<A, B, C, D, E, F, G, H>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H): H;
export function pipe<A, B, C, D, E, F, G, H, I>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I): I;
export function pipe<A, B, C, D, E, F, G, H, I, J>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J): J;
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K): K;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L): L;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L, q: (v: L) => M): M;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L, q: (v: L) => M, r: (v: M) => N): N;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L, q: (v: L) => M, r: (v: M) => N, s: (v: N) => O): O;
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(value: A, f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L, q: (v: L) => M, r: (v: M) => N, s: (v: N) => O, t: (v: O) => P): P;
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
export function pipeAsync<A>(value: A): Promise<Awaited<A>>;
export function pipeAsync<A, B>(value: A, f: (v: Awaited<A>) => B): Promise<Awaited<B>>;
export function pipeAsync<A, B, C>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C): Promise<Awaited<C>>;
export function pipeAsync<A, B, C, D>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D): Promise<Awaited<D>>;
export function pipeAsync<A, B, C, D, E>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E): Promise<Awaited<E>>;
export function pipeAsync<A, B, C, D, E, F>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F): Promise<Awaited<F>>;
export function pipeAsync<A, B, C, D, E, F, G>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G): Promise<Awaited<G>>;
export function pipeAsync<A, B, C, D, E, F, G, H>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H): Promise<Awaited<H>>;
export function pipeAsync<A, B, C, D, E, F, G, H, I>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I): Promise<Awaited<I>>;
export function pipeAsync<A, B, C, D, E, F, G, H, I, J>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J): Promise<Awaited<J>>;
export function pipeAsync<A, B, C, D, E, F, G, H, I, J, K>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K): Promise<Awaited<K>>;
export function pipeAsync<A, B, C, D, E, F, G, H, I, J, K, L>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L): Promise<Awaited<L>>;
export function pipeAsync<A, B, C, D, E, F, G, H, I, J, K, L, M>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L, q: (v: Awaited<L>) => M): Promise<Awaited<M>>;
export function pipeAsync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L, q: (v: Awaited<L>) => M, r: (v: Awaited<M>) => N): Promise<Awaited<N>>;
export function pipeAsync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L, q: (v: Awaited<L>) => M, r: (v: Awaited<M>) => N, s: (v: Awaited<N>) => O): Promise<Awaited<O>>;
export function pipeAsync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(value: A, f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L, q: (v: Awaited<L>) => M, r: (v: Awaited<M>) => N, s: (v: Awaited<N>) => O, t: (v: Awaited<O>) => P): Promise<Awaited<P>>;
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
   * > If you want to use more than 16 functions, you'll either
   * > have to provide explicit type annotations, or put a `toPipable` at the
   * > end of one pipe, and then continue with the `.pipe()` method:
   * > ```ts
   * > const result = value.pipe(f, g, ..., toPipable).pipe(h, j, ...)
   * > ```
   */
  pipe<B>(f: (v: A) => B): B;
  pipe<B, C>(f: (v: A) => B, g: (v: B) => C): C;
  pipe<B, C, D>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D): D;
  pipe<B, C, D, E>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E): E;
  pipe<B, C, D, E, F>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F): F;
  pipe<B, C, D, E, F, G>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G): G;
  pipe<B, C, D, E, F, G, H>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H): H;
  pipe<B, C, D, E, F, G, H, I>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I): I;
  pipe<B, C, D, E, F, G, H, I, J>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J): J;
  pipe<B, C, D, E, F, G, H, I, J, K>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K): K;
  pipe<B, C, D, E, F, G, H, I, J, K, L>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L): L;
  pipe<B, C, D, E, F, G, H, I, J, K, L, M>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L, q: (v: L) => M): M;
  pipe<B, C, D, E, F, G, H, I, J, K, L, M, N>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L, q: (v: L) => M, r: (v: M) => N): N;
  pipe<B, C, D, E, F, G, H, I, J, K, L, M, N, O>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L, q: (v: L) => M, r: (v: M) => N, s: (v: N) => O): O;
  pipe<B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L, q: (v: L) => M, r: (v: M) => N, s: (v: N) => O, t: (v: O) => P): P;
  pipe<B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(f: (v: A) => B, g: (v: B) => C, h: (v: C) => D, i: (v: D) => E, j: (v: E) => F, k: (v: F) => G, l: (v: G) => H, m: (v: H) => I, n: (v: I) => J, o: (v: J) => K, p: (v: K) => L, q: (v: L) => M, r: (v: M) => N, s: (v: N) => O, t: (v: O) => P, u: (v: P) => Q): Q;
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
   * > If you want to use more than 16 functions, you'll either
   * > have to provide explicit type annotations, or put a `toPipable` at the
   * > end of one pipe, and then continue with the `.pipeAsync()` method:
   * > ```ts
   * > const result = value.pipeAsync(f, g, ..., toPipable).pipeAsync(h, j, ...)
   * > ```
   */
  pipeAsync<B>(f: (v: Awaited<A>) => B): Promise<Awaited<B>>;
  pipeAsync<B, C>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C): Promise<Awaited<C>>;
  pipeAsync<B, C, D>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D): Promise<Awaited<D>>;
  pipeAsync<B, C, D, E>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E): Promise<Awaited<E>>;
  pipeAsync<B, C, D, E, F>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F): Promise<Awaited<F>>;
  pipeAsync<B, C, D, E, F, G>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G): Promise<Awaited<G>>;
  pipeAsync<B, C, D, E, F, G, H>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H): Promise<Awaited<H>>;
  pipeAsync<B, C, D, E, F, G, H, I>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I): Promise<Awaited<I>>;
  pipeAsync<B, C, D, E, F, G, H, I, J>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J): Promise<Awaited<J>>;
  pipeAsync<B, C, D, E, F, G, H, I, J, K>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K): Promise<Awaited<K>>;
  pipeAsync<B, C, D, E, F, G, H, I, J, K, L>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L): Promise<Awaited<L>>;
  pipeAsync<B, C, D, E, F, G, H, I, J, K, L, M>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L, q: (v: Awaited<L>) => M): Promise<Awaited<M>>;
  pipeAsync<B, C, D, E, F, G, H, I, J, K, L, M, N>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L, q: (v: Awaited<L>) => M, r: (v: Awaited<M>) => N): Promise<Awaited<N>>;
  pipeAsync<B, C, D, E, F, G, H, I, J, K, L, M, N, O>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L, q: (v: Awaited<L>) => M, r: (v: Awaited<M>) => N, s: (v: Awaited<N>) => O): Promise<Awaited<O>>;
  pipeAsync<B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L, q: (v: Awaited<L>) => M, r: (v: Awaited<M>) => N, s: (v: Awaited<N>) => O, t: (v: Awaited<O>) => P): Promise<Awaited<P>>;
  pipeAsync<B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(f: (v: Awaited<A>) => B, g: (v: Awaited<B>) => C, h: (v: Awaited<C>) => D, i: (v: Awaited<D>) => E, j: (v: Awaited<E>) => F, k: (v: Awaited<F>) => G, l: (v: Awaited<G>) => H, m: (v: Awaited<H>) => I, n: (v: Awaited<I>) => J, o: (v: Awaited<J>) => K, p: (v: Awaited<K>) => L, q: (v: Awaited<L>) => M, r: (v: Awaited<M>) => N, s: (v: Awaited<N>) => O, t: (v: Awaited<O>) => P, u: (v: Awaited<P>) => Q): Promise<Awaited<Q>>;
  pipeAsync<
    F extends AnyFn[],
    FirstFn extends (v: A) => Parameters<F[0]>[0] | Promise<Parameters<F[0]>[0]>,
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
