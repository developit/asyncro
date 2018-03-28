declare module 'asyncro' {
    type AsyncFn<T> = () => PromiseLike<T>;
    type AsyncFnReturnType<T> = T extends AsyncFn<infer U> ? U : any;
  
    interface Asyncro {
      /**
       * Invoke an async reducer function on each item in the given Array,
       * where the reducer transforms an accumulator value based on each item
       * iterated over.
       * **Note**: because reduce() is order-sensitive, iteration is sequential.
       * > This is an asynchronous version of Array.prototype.reduce().
       * @param array The Array to reduce.
       * @param reducer Async function, gets passed (accumulator, value, index,
       * array) and returns a new value for accumulator.
       * @param accumulator Optional initial accumulator value.
       * @returns Any final accumulator value.
       */
      reduce<T>(
        array: ArrayLike<T>,
        reducer: (
          accumulator: T,
          value: T,
          index: number,
          array: ArrayLike<T>,
        ) => PromiseLike<T>,
        accumulator?: T,
      ): T;
      reduce<T, U>(
        array: ArrayLike<T>,
        reducer: (
          accumulator: U,
          value: T,
          index: number,
          array: ArrayLike<T>,
        ) => PromiseLike<U>,
        accumulator: U,
      ): Promise<U>;
  
      /**
       * Invoke an async transform function on each item in the given Array in
       * parallel, returning the resulting Array of mapped/transformed items.
       * @param array Invoke an async transform function on each item in the
       * given Array in parallel, returning the resulting Array of
       * mapped/transformed items.
       * > This is an asynchronous, parallelized version of Array.prototype.map().
       * @param mapper Async function, gets passed (value, index, array),
       * returns the new value.
       * @returns Array resulting mapped/transformed values.
       */
      map<T, U>(
        array: ArrayLike<T>,
        mapper: (value: T, index: number, array: ArrayLike<T>) => PromiseLike<U>,
      ): Promise<U[]>;
  
      /**
       * Invoke an async filter function on each item in the given Array in
       * parallel, returning an Array of values for which the filter function
       * returned a truthy value.
       * > This is an asynchronous, parallelized version of Array.prototype.filter().
       * @param array The Array to filter.
       * @param filterer Async function. Gets passed (value, index, array),
       * returns true to keep the value in the resulting filtered Array.
       * @returns Array resulting filtered values.
       */
      filter<T>(
        array: ArrayLike<T>,
        filterer: (value: T, index: number, array: T[]) => PromiseLike<any>,
      ): Promise<T[]>;
      /**
       * Invoke an async function on each item in the given Array in parallel,
       * returning the first element predicate returns truthy for.
       * > This is an asynchronous, parallelized version of
       * Array.prototype.find().
       * @param array The Array to find.
       * @param predicate Async function. Gets passed (value, index, array), returns true
       * to be the find result.
       * @returns Any resulting find value.
       */
      find<T>(
        array: ArrayLike<T>,
        predicate: (value: T, index: number, array: T[]) => PromiseLike<boolean>,
      ): Promise<T | undefined>;
  
      /**
       * Checks if predicate returns truthy for all elements of collection in
       * parallel.
       * > This is an asynchronous, parallelized version of
       * Array.prototype.every().
       * @param array The Array to iterate over.
       * @param predicate Async function. Gets passed (value, index, array), The
       * function invoked per iteration.
       * @returns Returns true if all element passes the predicate check, else
       * false.
       */
      every<T>(
        array: ArrayLike<T>,
        predicate: (value: T, index: number, array: T[]) => PromiseLike<boolean>,
      ): boolean;
  
      /**
       * Checks if predicate returns truthy for any element of collection in
       * parallel.
       * @param array The Array to iterate over.
       * @param predicate Async function. Gets passed (value, index, array), The
       * function invoked per iteration.
       * @returns Returns true if any element passes the predicate check, else
       * false.
       */
      some<T>(
        array: ArrayLike<T>,
        predicate: (value: T, index: number, array: T[]) => PromiseLike<boolean>,
      ): boolean;
  
      /**
       * Invoke all async functions in an Object in parallel, returning the
       * result.
       * @param list Object with values that are async functions to invoke.
       * @returns Same structure as list input, but with values now resolved.
       */
      parallel<T extends Record<string, AsyncFn<any>>>(
        list: T,
      ): Promise<{[K in keyof T]: AsyncFnReturnType<T[K]>}>;
  
      /**
       * Invoke all async functions in an Array in parallel, returning the
       * result.
       * @param list Array with values that are async functions to invoke.
       * @returns Same structure as list input, but with values now resolved.
       */
      parallel<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>,
          AsyncFn<T7>,
          AsyncFn<T8>,
          AsyncFn<T9>,
          AsyncFn<T10>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
      parallel<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>,
          AsyncFn<T7>,
          AsyncFn<T8>,
          AsyncFn<T9>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
      parallel<T1, T2, T3, T4, T5, T6, T7, T8>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>,
          AsyncFn<T7>,
          AsyncFn<T8>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
      parallel<T1, T2, T3, T4, T5, T6, T7>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>,
          AsyncFn<T7>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
      parallel<T1, T2, T3, T4, T5, T6>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6]>;
      parallel<T1, T2, T3, T4, T5>(
        list: [AsyncFn<T1>, AsyncFn<T2>, AsyncFn<T3>, AsyncFn<T4>, AsyncFn<T5>],
      ): Promise<[T1, T2, T3, T4, T5]>;
      parallel<T1, T2, T3, T4>(
        list: [AsyncFn<T1>, AsyncFn<T2>, AsyncFn<T3>, AsyncFn<T4>],
      ): Promise<[T1, T2, T3]>;
      parallel<T1, T2, T3>(
        list: [AsyncFn<T1>, AsyncFn<T2>, AsyncFn<T3>],
      ): Promise<[T1, T2, T3]>;
      parallel<T1, T2>(list: [AsyncFn<T1>, AsyncFn<T2>]): Promise<[T1, T2]>;
      parallel<T>(list: ArrayLike<AsyncFn<T>>): Promise<T[]>;
  
      /**
       * Invoke all async functions in an Object sequentially, returning the
       * result.
       * @param list Object with values that are async functions to invoke.
       * @returns Same structure as list input, but with values now resolved.
       */
      series<T extends Record<string, AsyncFn<any>>>(
        list: T,
      ): Promise<{[K in keyof T]: AsyncFnReturnType<T[K]>}>;
  
      /**
       * Invoke all async functions in an Array sequentially, returning the
       * result.
       * @param list Array with values that are async functions to invoke.
       * @returns Same structure as list input, but with values now resolved.
       */
      series<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>,
          AsyncFn<T7>,
          AsyncFn<T8>,
          AsyncFn<T9>,
          AsyncFn<T10>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
      series<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>,
          AsyncFn<T7>,
          AsyncFn<T8>,
          AsyncFn<T9>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
      series<T1, T2, T3, T4, T5, T6, T7, T8>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>,
          AsyncFn<T7>,
          AsyncFn<T8>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
      series<T1, T2, T3, T4, T5, T6, T7>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>,
          AsyncFn<T7>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6, T7]>;
      series<T1, T2, T3, T4, T5, T6>(
        list: [
          AsyncFn<T1>,
          AsyncFn<T2>,
          AsyncFn<T3>,
          AsyncFn<T4>,
          AsyncFn<T5>,
          AsyncFn<T6>
        ],
      ): Promise<[T1, T2, T3, T4, T5, T6]>;
      series<T1, T2, T3, T4, T5>(
        list: [AsyncFn<T1>, AsyncFn<T2>, AsyncFn<T3>, AsyncFn<T4>, AsyncFn<T5>],
      ): Promise<[T1, T2, T3, T4, T5]>;
      series<T1, T2, T3, T4>(
        list: [AsyncFn<T1>, AsyncFn<T2>, AsyncFn<T3>, AsyncFn<T4>],
      ): Promise<[T1, T2, T3]>;
      series<T1, T2, T3>(
        list: [AsyncFn<T1>, AsyncFn<T2>, AsyncFn<T3>],
      ): Promise<[T1, T2, T3]>;
      series<T1, T2>(list: [AsyncFn<T1>, AsyncFn<T2>]): Promise<[T1, T2]>;
      series<T>(list: ArrayLike<AsyncFn<T>>): Promise<T[]>;
    }
  
    const Asyncro: Asyncro;
  
    export = Asyncro;
  }
  