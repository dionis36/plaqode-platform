
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model QrCode
 * 
 */
export type QrCode = $Result.DefaultSelection<Prisma.$QrCodePayload>
/**
 * Model Scan
 * 
 */
export type Scan = $Result.DefaultSelection<Prisma.$ScanPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more QrCodes
 * const qrCodes = await prisma.qrCode.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more QrCodes
   * const qrCodes = await prisma.qrCode.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.qrCode`: Exposes CRUD operations for the **QrCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QrCodes
    * const qrCodes = await prisma.qrCode.findMany()
    * ```
    */
  get qrCode(): Prisma.QrCodeDelegate<ExtArgs>;

  /**
   * `prisma.scan`: Exposes CRUD operations for the **Scan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Scans
    * const scans = await prisma.scan.findMany()
    * ```
    */
  get scan(): Prisma.ScanDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    QrCode: 'QrCode',
    Scan: 'Scan'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "qrCode" | "scan"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      QrCode: {
        payload: Prisma.$QrCodePayload<ExtArgs>
        fields: Prisma.QrCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QrCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QrCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          findFirst: {
            args: Prisma.QrCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QrCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          findMany: {
            args: Prisma.QrCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>[]
          }
          create: {
            args: Prisma.QrCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          createMany: {
            args: Prisma.QrCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QrCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>[]
          }
          delete: {
            args: Prisma.QrCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          update: {
            args: Prisma.QrCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          deleteMany: {
            args: Prisma.QrCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QrCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QrCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          aggregate: {
            args: Prisma.QrCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQrCode>
          }
          groupBy: {
            args: Prisma.QrCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<QrCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.QrCodeCountArgs<ExtArgs>
            result: $Utils.Optional<QrCodeCountAggregateOutputType> | number
          }
        }
      }
      Scan: {
        payload: Prisma.$ScanPayload<ExtArgs>
        fields: Prisma.ScanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          findFirst: {
            args: Prisma.ScanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          findMany: {
            args: Prisma.ScanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>[]
          }
          create: {
            args: Prisma.ScanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          createMany: {
            args: Prisma.ScanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>[]
          }
          delete: {
            args: Prisma.ScanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          update: {
            args: Prisma.ScanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          deleteMany: {
            args: Prisma.ScanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanPayload>
          }
          aggregate: {
            args: Prisma.ScanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScan>
          }
          groupBy: {
            args: Prisma.ScanGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScanGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScanCountArgs<ExtArgs>
            result: $Utils.Optional<ScanCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type QrCodeCountOutputType
   */

  export type QrCodeCountOutputType = {
    scans: number
  }

  export type QrCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scans?: boolean | QrCodeCountOutputTypeCountScansArgs
  }

  // Custom InputTypes
  /**
   * QrCodeCountOutputType without action
   */
  export type QrCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCodeCountOutputType
     */
    select?: QrCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QrCodeCountOutputType without action
   */
  export type QrCodeCountOutputTypeCountScansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanWhereInput
  }


  /**
   * Models
   */

  /**
   * Model QrCode
   */

  export type AggregateQrCode = {
    _count: QrCodeCountAggregateOutputType | null
    _min: QrCodeMinAggregateOutputType | null
    _max: QrCodeMaxAggregateOutputType | null
  }

  export type QrCodeMinAggregateOutputType = {
    id: string | null
    shortcode: string | null
    type: string | null
    name: string | null
    userId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QrCodeMaxAggregateOutputType = {
    id: string | null
    shortcode: string | null
    type: string | null
    name: string | null
    userId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QrCodeCountAggregateOutputType = {
    id: number
    shortcode: number
    type: number
    name: number
    payload: number
    design: number
    userId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QrCodeMinAggregateInputType = {
    id?: true
    shortcode?: true
    type?: true
    name?: true
    userId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QrCodeMaxAggregateInputType = {
    id?: true
    shortcode?: true
    type?: true
    name?: true
    userId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QrCodeCountAggregateInputType = {
    id?: true
    shortcode?: true
    type?: true
    name?: true
    payload?: true
    design?: true
    userId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QrCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QrCode to aggregate.
     */
    where?: QrCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QrCodes to fetch.
     */
    orderBy?: QrCodeOrderByWithRelationInput | QrCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QrCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QrCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QrCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QrCodes
    **/
    _count?: true | QrCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QrCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QrCodeMaxAggregateInputType
  }

  export type GetQrCodeAggregateType<T extends QrCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateQrCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQrCode[P]>
      : GetScalarType<T[P], AggregateQrCode[P]>
  }




  export type QrCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QrCodeWhereInput
    orderBy?: QrCodeOrderByWithAggregationInput | QrCodeOrderByWithAggregationInput[]
    by: QrCodeScalarFieldEnum[] | QrCodeScalarFieldEnum
    having?: QrCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QrCodeCountAggregateInputType | true
    _min?: QrCodeMinAggregateInputType
    _max?: QrCodeMaxAggregateInputType
  }

  export type QrCodeGroupByOutputType = {
    id: string
    shortcode: string
    type: string
    name: string
    payload: JsonValue
    design: JsonValue
    userId: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: QrCodeCountAggregateOutputType | null
    _min: QrCodeMinAggregateOutputType | null
    _max: QrCodeMaxAggregateOutputType | null
  }

  type GetQrCodeGroupByPayload<T extends QrCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QrCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QrCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QrCodeGroupByOutputType[P]>
            : GetScalarType<T[P], QrCodeGroupByOutputType[P]>
        }
      >
    >


  export type QrCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shortcode?: boolean
    type?: boolean
    name?: boolean
    payload?: boolean
    design?: boolean
    userId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    scans?: boolean | QrCode$scansArgs<ExtArgs>
    _count?: boolean | QrCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qrCode"]>

  export type QrCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shortcode?: boolean
    type?: boolean
    name?: boolean
    payload?: boolean
    design?: boolean
    userId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["qrCode"]>

  export type QrCodeSelectScalar = {
    id?: boolean
    shortcode?: boolean
    type?: boolean
    name?: boolean
    payload?: boolean
    design?: boolean
    userId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QrCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scans?: boolean | QrCode$scansArgs<ExtArgs>
    _count?: boolean | QrCodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QrCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $QrCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QrCode"
    objects: {
      scans: Prisma.$ScanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shortcode: string
      type: string
      name: string
      payload: Prisma.JsonValue
      design: Prisma.JsonValue
      userId: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["qrCode"]>
    composites: {}
  }

  type QrCodeGetPayload<S extends boolean | null | undefined | QrCodeDefaultArgs> = $Result.GetResult<Prisma.$QrCodePayload, S>

  type QrCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QrCodeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QrCodeCountAggregateInputType | true
    }

  export interface QrCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QrCode'], meta: { name: 'QrCode' } }
    /**
     * Find zero or one QrCode that matches the filter.
     * @param {QrCodeFindUniqueArgs} args - Arguments to find a QrCode
     * @example
     * // Get one QrCode
     * const qrCode = await prisma.qrCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QrCodeFindUniqueArgs>(args: SelectSubset<T, QrCodeFindUniqueArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QrCode that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QrCodeFindUniqueOrThrowArgs} args - Arguments to find a QrCode
     * @example
     * // Get one QrCode
     * const qrCode = await prisma.qrCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QrCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, QrCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QrCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeFindFirstArgs} args - Arguments to find a QrCode
     * @example
     * // Get one QrCode
     * const qrCode = await prisma.qrCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QrCodeFindFirstArgs>(args?: SelectSubset<T, QrCodeFindFirstArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QrCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeFindFirstOrThrowArgs} args - Arguments to find a QrCode
     * @example
     * // Get one QrCode
     * const qrCode = await prisma.qrCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QrCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, QrCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QrCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QrCodes
     * const qrCodes = await prisma.qrCode.findMany()
     * 
     * // Get first 10 QrCodes
     * const qrCodes = await prisma.qrCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qrCodeWithIdOnly = await prisma.qrCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QrCodeFindManyArgs>(args?: SelectSubset<T, QrCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QrCode.
     * @param {QrCodeCreateArgs} args - Arguments to create a QrCode.
     * @example
     * // Create one QrCode
     * const QrCode = await prisma.qrCode.create({
     *   data: {
     *     // ... data to create a QrCode
     *   }
     * })
     * 
     */
    create<T extends QrCodeCreateArgs>(args: SelectSubset<T, QrCodeCreateArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QrCodes.
     * @param {QrCodeCreateManyArgs} args - Arguments to create many QrCodes.
     * @example
     * // Create many QrCodes
     * const qrCode = await prisma.qrCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QrCodeCreateManyArgs>(args?: SelectSubset<T, QrCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QrCodes and returns the data saved in the database.
     * @param {QrCodeCreateManyAndReturnArgs} args - Arguments to create many QrCodes.
     * @example
     * // Create many QrCodes
     * const qrCode = await prisma.qrCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QrCodes and only return the `id`
     * const qrCodeWithIdOnly = await prisma.qrCode.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QrCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, QrCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QrCode.
     * @param {QrCodeDeleteArgs} args - Arguments to delete one QrCode.
     * @example
     * // Delete one QrCode
     * const QrCode = await prisma.qrCode.delete({
     *   where: {
     *     // ... filter to delete one QrCode
     *   }
     * })
     * 
     */
    delete<T extends QrCodeDeleteArgs>(args: SelectSubset<T, QrCodeDeleteArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QrCode.
     * @param {QrCodeUpdateArgs} args - Arguments to update one QrCode.
     * @example
     * // Update one QrCode
     * const qrCode = await prisma.qrCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QrCodeUpdateArgs>(args: SelectSubset<T, QrCodeUpdateArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QrCodes.
     * @param {QrCodeDeleteManyArgs} args - Arguments to filter QrCodes to delete.
     * @example
     * // Delete a few QrCodes
     * const { count } = await prisma.qrCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QrCodeDeleteManyArgs>(args?: SelectSubset<T, QrCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QrCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QrCodes
     * const qrCode = await prisma.qrCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QrCodeUpdateManyArgs>(args: SelectSubset<T, QrCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QrCode.
     * @param {QrCodeUpsertArgs} args - Arguments to update or create a QrCode.
     * @example
     * // Update or create a QrCode
     * const qrCode = await prisma.qrCode.upsert({
     *   create: {
     *     // ... data to create a QrCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QrCode we want to update
     *   }
     * })
     */
    upsert<T extends QrCodeUpsertArgs>(args: SelectSubset<T, QrCodeUpsertArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QrCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeCountArgs} args - Arguments to filter QrCodes to count.
     * @example
     * // Count the number of QrCodes
     * const count = await prisma.qrCode.count({
     *   where: {
     *     // ... the filter for the QrCodes we want to count
     *   }
     * })
    **/
    count<T extends QrCodeCountArgs>(
      args?: Subset<T, QrCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QrCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QrCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QrCodeAggregateArgs>(args: Subset<T, QrCodeAggregateArgs>): Prisma.PrismaPromise<GetQrCodeAggregateType<T>>

    /**
     * Group by QrCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QrCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QrCodeGroupByArgs['orderBy'] }
        : { orderBy?: QrCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QrCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQrCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QrCode model
   */
  readonly fields: QrCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QrCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QrCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scans<T extends QrCode$scansArgs<ExtArgs> = {}>(args?: Subset<T, QrCode$scansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QrCode model
   */ 
  interface QrCodeFieldRefs {
    readonly id: FieldRef<"QrCode", 'String'>
    readonly shortcode: FieldRef<"QrCode", 'String'>
    readonly type: FieldRef<"QrCode", 'String'>
    readonly name: FieldRef<"QrCode", 'String'>
    readonly payload: FieldRef<"QrCode", 'Json'>
    readonly design: FieldRef<"QrCode", 'Json'>
    readonly userId: FieldRef<"QrCode", 'String'>
    readonly isActive: FieldRef<"QrCode", 'Boolean'>
    readonly createdAt: FieldRef<"QrCode", 'DateTime'>
    readonly updatedAt: FieldRef<"QrCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QrCode findUnique
   */
  export type QrCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCode to fetch.
     */
    where: QrCodeWhereUniqueInput
  }

  /**
   * QrCode findUniqueOrThrow
   */
  export type QrCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCode to fetch.
     */
    where: QrCodeWhereUniqueInput
  }

  /**
   * QrCode findFirst
   */
  export type QrCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCode to fetch.
     */
    where?: QrCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QrCodes to fetch.
     */
    orderBy?: QrCodeOrderByWithRelationInput | QrCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QrCodes.
     */
    cursor?: QrCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QrCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QrCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QrCodes.
     */
    distinct?: QrCodeScalarFieldEnum | QrCodeScalarFieldEnum[]
  }

  /**
   * QrCode findFirstOrThrow
   */
  export type QrCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCode to fetch.
     */
    where?: QrCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QrCodes to fetch.
     */
    orderBy?: QrCodeOrderByWithRelationInput | QrCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QrCodes.
     */
    cursor?: QrCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QrCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QrCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QrCodes.
     */
    distinct?: QrCodeScalarFieldEnum | QrCodeScalarFieldEnum[]
  }

  /**
   * QrCode findMany
   */
  export type QrCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCodes to fetch.
     */
    where?: QrCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QrCodes to fetch.
     */
    orderBy?: QrCodeOrderByWithRelationInput | QrCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QrCodes.
     */
    cursor?: QrCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QrCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QrCodes.
     */
    skip?: number
    distinct?: QrCodeScalarFieldEnum | QrCodeScalarFieldEnum[]
  }

  /**
   * QrCode create
   */
  export type QrCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a QrCode.
     */
    data: XOR<QrCodeCreateInput, QrCodeUncheckedCreateInput>
  }

  /**
   * QrCode createMany
   */
  export type QrCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QrCodes.
     */
    data: QrCodeCreateManyInput | QrCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QrCode createManyAndReturn
   */
  export type QrCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QrCodes.
     */
    data: QrCodeCreateManyInput | QrCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QrCode update
   */
  export type QrCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a QrCode.
     */
    data: XOR<QrCodeUpdateInput, QrCodeUncheckedUpdateInput>
    /**
     * Choose, which QrCode to update.
     */
    where: QrCodeWhereUniqueInput
  }

  /**
   * QrCode updateMany
   */
  export type QrCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QrCodes.
     */
    data: XOR<QrCodeUpdateManyMutationInput, QrCodeUncheckedUpdateManyInput>
    /**
     * Filter which QrCodes to update
     */
    where?: QrCodeWhereInput
  }

  /**
   * QrCode upsert
   */
  export type QrCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the QrCode to update in case it exists.
     */
    where: QrCodeWhereUniqueInput
    /**
     * In case the QrCode found by the `where` argument doesn't exist, create a new QrCode with this data.
     */
    create: XOR<QrCodeCreateInput, QrCodeUncheckedCreateInput>
    /**
     * In case the QrCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QrCodeUpdateInput, QrCodeUncheckedUpdateInput>
  }

  /**
   * QrCode delete
   */
  export type QrCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter which QrCode to delete.
     */
    where: QrCodeWhereUniqueInput
  }

  /**
   * QrCode deleteMany
   */
  export type QrCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QrCodes to delete
     */
    where?: QrCodeWhereInput
  }

  /**
   * QrCode.scans
   */
  export type QrCode$scansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    where?: ScanWhereInput
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    cursor?: ScanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * QrCode without action
   */
  export type QrCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
  }


  /**
   * Model Scan
   */

  export type AggregateScan = {
    _count: ScanCountAggregateOutputType | null
    _min: ScanMinAggregateOutputType | null
    _max: ScanMaxAggregateOutputType | null
  }

  export type ScanMinAggregateOutputType = {
    id: string | null
    qrCodeId: string | null
    shortcode: string | null
    scannedAt: Date | null
    country: string | null
    city: string | null
    device: string | null
    os: string | null
    browser: string | null
    ipHash: string | null
    referrer: string | null
  }

  export type ScanMaxAggregateOutputType = {
    id: string | null
    qrCodeId: string | null
    shortcode: string | null
    scannedAt: Date | null
    country: string | null
    city: string | null
    device: string | null
    os: string | null
    browser: string | null
    ipHash: string | null
    referrer: string | null
  }

  export type ScanCountAggregateOutputType = {
    id: number
    qrCodeId: number
    shortcode: number
    scannedAt: number
    country: number
    city: number
    device: number
    os: number
    browser: number
    ipHash: number
    referrer: number
    _all: number
  }


  export type ScanMinAggregateInputType = {
    id?: true
    qrCodeId?: true
    shortcode?: true
    scannedAt?: true
    country?: true
    city?: true
    device?: true
    os?: true
    browser?: true
    ipHash?: true
    referrer?: true
  }

  export type ScanMaxAggregateInputType = {
    id?: true
    qrCodeId?: true
    shortcode?: true
    scannedAt?: true
    country?: true
    city?: true
    device?: true
    os?: true
    browser?: true
    ipHash?: true
    referrer?: true
  }

  export type ScanCountAggregateInputType = {
    id?: true
    qrCodeId?: true
    shortcode?: true
    scannedAt?: true
    country?: true
    city?: true
    device?: true
    os?: true
    browser?: true
    ipHash?: true
    referrer?: true
    _all?: true
  }

  export type ScanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scan to aggregate.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Scans
    **/
    _count?: true | ScanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScanMaxAggregateInputType
  }

  export type GetScanAggregateType<T extends ScanAggregateArgs> = {
        [P in keyof T & keyof AggregateScan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScan[P]>
      : GetScalarType<T[P], AggregateScan[P]>
  }




  export type ScanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanWhereInput
    orderBy?: ScanOrderByWithAggregationInput | ScanOrderByWithAggregationInput[]
    by: ScanScalarFieldEnum[] | ScanScalarFieldEnum
    having?: ScanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScanCountAggregateInputType | true
    _min?: ScanMinAggregateInputType
    _max?: ScanMaxAggregateInputType
  }

  export type ScanGroupByOutputType = {
    id: string
    qrCodeId: string
    shortcode: string | null
    scannedAt: Date
    country: string | null
    city: string | null
    device: string | null
    os: string | null
    browser: string | null
    ipHash: string | null
    referrer: string | null
    _count: ScanCountAggregateOutputType | null
    _min: ScanMinAggregateOutputType | null
    _max: ScanMaxAggregateOutputType | null
  }

  type GetScanGroupByPayload<T extends ScanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScanGroupByOutputType[P]>
            : GetScalarType<T[P], ScanGroupByOutputType[P]>
        }
      >
    >


  export type ScanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qrCodeId?: boolean
    shortcode?: boolean
    scannedAt?: boolean
    country?: boolean
    city?: boolean
    device?: boolean
    os?: boolean
    browser?: boolean
    ipHash?: boolean
    referrer?: boolean
    qrCode?: boolean | QrCodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scan"]>

  export type ScanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qrCodeId?: boolean
    shortcode?: boolean
    scannedAt?: boolean
    country?: boolean
    city?: boolean
    device?: boolean
    os?: boolean
    browser?: boolean
    ipHash?: boolean
    referrer?: boolean
    qrCode?: boolean | QrCodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scan"]>

  export type ScanSelectScalar = {
    id?: boolean
    qrCodeId?: boolean
    shortcode?: boolean
    scannedAt?: boolean
    country?: boolean
    city?: boolean
    device?: boolean
    os?: boolean
    browser?: boolean
    ipHash?: boolean
    referrer?: boolean
  }

  export type ScanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    qrCode?: boolean | QrCodeDefaultArgs<ExtArgs>
  }
  export type ScanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    qrCode?: boolean | QrCodeDefaultArgs<ExtArgs>
  }

  export type $ScanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Scan"
    objects: {
      qrCode: Prisma.$QrCodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      qrCodeId: string
      shortcode: string | null
      scannedAt: Date
      country: string | null
      city: string | null
      device: string | null
      os: string | null
      browser: string | null
      ipHash: string | null
      referrer: string | null
    }, ExtArgs["result"]["scan"]>
    composites: {}
  }

  type ScanGetPayload<S extends boolean | null | undefined | ScanDefaultArgs> = $Result.GetResult<Prisma.$ScanPayload, S>

  type ScanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ScanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ScanCountAggregateInputType | true
    }

  export interface ScanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Scan'], meta: { name: 'Scan' } }
    /**
     * Find zero or one Scan that matches the filter.
     * @param {ScanFindUniqueArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScanFindUniqueArgs>(args: SelectSubset<T, ScanFindUniqueArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Scan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ScanFindUniqueOrThrowArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScanFindUniqueOrThrowArgs>(args: SelectSubset<T, ScanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Scan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanFindFirstArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScanFindFirstArgs>(args?: SelectSubset<T, ScanFindFirstArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Scan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanFindFirstOrThrowArgs} args - Arguments to find a Scan
     * @example
     * // Get one Scan
     * const scan = await prisma.scan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScanFindFirstOrThrowArgs>(args?: SelectSubset<T, ScanFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Scans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Scans
     * const scans = await prisma.scan.findMany()
     * 
     * // Get first 10 Scans
     * const scans = await prisma.scan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scanWithIdOnly = await prisma.scan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScanFindManyArgs>(args?: SelectSubset<T, ScanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Scan.
     * @param {ScanCreateArgs} args - Arguments to create a Scan.
     * @example
     * // Create one Scan
     * const Scan = await prisma.scan.create({
     *   data: {
     *     // ... data to create a Scan
     *   }
     * })
     * 
     */
    create<T extends ScanCreateArgs>(args: SelectSubset<T, ScanCreateArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Scans.
     * @param {ScanCreateManyArgs} args - Arguments to create many Scans.
     * @example
     * // Create many Scans
     * const scan = await prisma.scan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScanCreateManyArgs>(args?: SelectSubset<T, ScanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Scans and returns the data saved in the database.
     * @param {ScanCreateManyAndReturnArgs} args - Arguments to create many Scans.
     * @example
     * // Create many Scans
     * const scan = await prisma.scan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Scans and only return the `id`
     * const scanWithIdOnly = await prisma.scan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScanCreateManyAndReturnArgs>(args?: SelectSubset<T, ScanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Scan.
     * @param {ScanDeleteArgs} args - Arguments to delete one Scan.
     * @example
     * // Delete one Scan
     * const Scan = await prisma.scan.delete({
     *   where: {
     *     // ... filter to delete one Scan
     *   }
     * })
     * 
     */
    delete<T extends ScanDeleteArgs>(args: SelectSubset<T, ScanDeleteArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Scan.
     * @param {ScanUpdateArgs} args - Arguments to update one Scan.
     * @example
     * // Update one Scan
     * const scan = await prisma.scan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScanUpdateArgs>(args: SelectSubset<T, ScanUpdateArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Scans.
     * @param {ScanDeleteManyArgs} args - Arguments to filter Scans to delete.
     * @example
     * // Delete a few Scans
     * const { count } = await prisma.scan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScanDeleteManyArgs>(args?: SelectSubset<T, ScanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Scans
     * const scan = await prisma.scan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScanUpdateManyArgs>(args: SelectSubset<T, ScanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Scan.
     * @param {ScanUpsertArgs} args - Arguments to update or create a Scan.
     * @example
     * // Update or create a Scan
     * const scan = await prisma.scan.upsert({
     *   create: {
     *     // ... data to create a Scan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Scan we want to update
     *   }
     * })
     */
    upsert<T extends ScanUpsertArgs>(args: SelectSubset<T, ScanUpsertArgs<ExtArgs>>): Prisma__ScanClient<$Result.GetResult<Prisma.$ScanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Scans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanCountArgs} args - Arguments to filter Scans to count.
     * @example
     * // Count the number of Scans
     * const count = await prisma.scan.count({
     *   where: {
     *     // ... the filter for the Scans we want to count
     *   }
     * })
    **/
    count<T extends ScanCountArgs>(
      args?: Subset<T, ScanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Scan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScanAggregateArgs>(args: Subset<T, ScanAggregateArgs>): Prisma.PrismaPromise<GetScanAggregateType<T>>

    /**
     * Group by Scan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScanGroupByArgs['orderBy'] }
        : { orderBy?: ScanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Scan model
   */
  readonly fields: ScanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Scan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    qrCode<T extends QrCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QrCodeDefaultArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Scan model
   */ 
  interface ScanFieldRefs {
    readonly id: FieldRef<"Scan", 'String'>
    readonly qrCodeId: FieldRef<"Scan", 'String'>
    readonly shortcode: FieldRef<"Scan", 'String'>
    readonly scannedAt: FieldRef<"Scan", 'DateTime'>
    readonly country: FieldRef<"Scan", 'String'>
    readonly city: FieldRef<"Scan", 'String'>
    readonly device: FieldRef<"Scan", 'String'>
    readonly os: FieldRef<"Scan", 'String'>
    readonly browser: FieldRef<"Scan", 'String'>
    readonly ipHash: FieldRef<"Scan", 'String'>
    readonly referrer: FieldRef<"Scan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Scan findUnique
   */
  export type ScanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan findUniqueOrThrow
   */
  export type ScanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan findFirst
   */
  export type ScanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scans.
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scans.
     */
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Scan findFirstOrThrow
   */
  export type ScanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scan to fetch.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Scans.
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Scans.
     */
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Scan findMany
   */
  export type ScanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter, which Scans to fetch.
     */
    where?: ScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Scans to fetch.
     */
    orderBy?: ScanOrderByWithRelationInput | ScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Scans.
     */
    cursor?: ScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Scans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Scans.
     */
    skip?: number
    distinct?: ScanScalarFieldEnum | ScanScalarFieldEnum[]
  }

  /**
   * Scan create
   */
  export type ScanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * The data needed to create a Scan.
     */
    data: XOR<ScanCreateInput, ScanUncheckedCreateInput>
  }

  /**
   * Scan createMany
   */
  export type ScanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Scans.
     */
    data: ScanCreateManyInput | ScanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Scan createManyAndReturn
   */
  export type ScanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Scans.
     */
    data: ScanCreateManyInput | ScanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Scan update
   */
  export type ScanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * The data needed to update a Scan.
     */
    data: XOR<ScanUpdateInput, ScanUncheckedUpdateInput>
    /**
     * Choose, which Scan to update.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan updateMany
   */
  export type ScanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Scans.
     */
    data: XOR<ScanUpdateManyMutationInput, ScanUncheckedUpdateManyInput>
    /**
     * Filter which Scans to update
     */
    where?: ScanWhereInput
  }

  /**
   * Scan upsert
   */
  export type ScanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * The filter to search for the Scan to update in case it exists.
     */
    where: ScanWhereUniqueInput
    /**
     * In case the Scan found by the `where` argument doesn't exist, create a new Scan with this data.
     */
    create: XOR<ScanCreateInput, ScanUncheckedCreateInput>
    /**
     * In case the Scan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScanUpdateInput, ScanUncheckedUpdateInput>
  }

  /**
   * Scan delete
   */
  export type ScanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
    /**
     * Filter which Scan to delete.
     */
    where: ScanWhereUniqueInput
  }

  /**
   * Scan deleteMany
   */
  export type ScanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Scans to delete
     */
    where?: ScanWhereInput
  }

  /**
   * Scan without action
   */
  export type ScanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Scan
     */
    select?: ScanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const QrCodeScalarFieldEnum: {
    id: 'id',
    shortcode: 'shortcode',
    type: 'type',
    name: 'name',
    payload: 'payload',
    design: 'design',
    userId: 'userId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QrCodeScalarFieldEnum = (typeof QrCodeScalarFieldEnum)[keyof typeof QrCodeScalarFieldEnum]


  export const ScanScalarFieldEnum: {
    id: 'id',
    qrCodeId: 'qrCodeId',
    shortcode: 'shortcode',
    scannedAt: 'scannedAt',
    country: 'country',
    city: 'city',
    device: 'device',
    os: 'os',
    browser: 'browser',
    ipHash: 'ipHash',
    referrer: 'referrer'
  };

  export type ScanScalarFieldEnum = (typeof ScanScalarFieldEnum)[keyof typeof ScanScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type QrCodeWhereInput = {
    AND?: QrCodeWhereInput | QrCodeWhereInput[]
    OR?: QrCodeWhereInput[]
    NOT?: QrCodeWhereInput | QrCodeWhereInput[]
    id?: StringFilter<"QrCode"> | string
    shortcode?: StringFilter<"QrCode"> | string
    type?: StringFilter<"QrCode"> | string
    name?: StringFilter<"QrCode"> | string
    payload?: JsonFilter<"QrCode">
    design?: JsonFilter<"QrCode">
    userId?: StringFilter<"QrCode"> | string
    isActive?: BoolFilter<"QrCode"> | boolean
    createdAt?: DateTimeFilter<"QrCode"> | Date | string
    updatedAt?: DateTimeFilter<"QrCode"> | Date | string
    scans?: ScanListRelationFilter
  }

  export type QrCodeOrderByWithRelationInput = {
    id?: SortOrder
    shortcode?: SortOrder
    type?: SortOrder
    name?: SortOrder
    payload?: SortOrder
    design?: SortOrder
    userId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    scans?: ScanOrderByRelationAggregateInput
  }

  export type QrCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shortcode?: string
    AND?: QrCodeWhereInput | QrCodeWhereInput[]
    OR?: QrCodeWhereInput[]
    NOT?: QrCodeWhereInput | QrCodeWhereInput[]
    type?: StringFilter<"QrCode"> | string
    name?: StringFilter<"QrCode"> | string
    payload?: JsonFilter<"QrCode">
    design?: JsonFilter<"QrCode">
    userId?: StringFilter<"QrCode"> | string
    isActive?: BoolFilter<"QrCode"> | boolean
    createdAt?: DateTimeFilter<"QrCode"> | Date | string
    updatedAt?: DateTimeFilter<"QrCode"> | Date | string
    scans?: ScanListRelationFilter
  }, "id" | "shortcode">

  export type QrCodeOrderByWithAggregationInput = {
    id?: SortOrder
    shortcode?: SortOrder
    type?: SortOrder
    name?: SortOrder
    payload?: SortOrder
    design?: SortOrder
    userId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QrCodeCountOrderByAggregateInput
    _max?: QrCodeMaxOrderByAggregateInput
    _min?: QrCodeMinOrderByAggregateInput
  }

  export type QrCodeScalarWhereWithAggregatesInput = {
    AND?: QrCodeScalarWhereWithAggregatesInput | QrCodeScalarWhereWithAggregatesInput[]
    OR?: QrCodeScalarWhereWithAggregatesInput[]
    NOT?: QrCodeScalarWhereWithAggregatesInput | QrCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QrCode"> | string
    shortcode?: StringWithAggregatesFilter<"QrCode"> | string
    type?: StringWithAggregatesFilter<"QrCode"> | string
    name?: StringWithAggregatesFilter<"QrCode"> | string
    payload?: JsonWithAggregatesFilter<"QrCode">
    design?: JsonWithAggregatesFilter<"QrCode">
    userId?: StringWithAggregatesFilter<"QrCode"> | string
    isActive?: BoolWithAggregatesFilter<"QrCode"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"QrCode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QrCode"> | Date | string
  }

  export type ScanWhereInput = {
    AND?: ScanWhereInput | ScanWhereInput[]
    OR?: ScanWhereInput[]
    NOT?: ScanWhereInput | ScanWhereInput[]
    id?: StringFilter<"Scan"> | string
    qrCodeId?: StringFilter<"Scan"> | string
    shortcode?: StringNullableFilter<"Scan"> | string | null
    scannedAt?: DateTimeFilter<"Scan"> | Date | string
    country?: StringNullableFilter<"Scan"> | string | null
    city?: StringNullableFilter<"Scan"> | string | null
    device?: StringNullableFilter<"Scan"> | string | null
    os?: StringNullableFilter<"Scan"> | string | null
    browser?: StringNullableFilter<"Scan"> | string | null
    ipHash?: StringNullableFilter<"Scan"> | string | null
    referrer?: StringNullableFilter<"Scan"> | string | null
    qrCode?: XOR<QrCodeRelationFilter, QrCodeWhereInput>
  }

  export type ScanOrderByWithRelationInput = {
    id?: SortOrder
    qrCodeId?: SortOrder
    shortcode?: SortOrderInput | SortOrder
    scannedAt?: SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    device?: SortOrderInput | SortOrder
    os?: SortOrderInput | SortOrder
    browser?: SortOrderInput | SortOrder
    ipHash?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    qrCode?: QrCodeOrderByWithRelationInput
  }

  export type ScanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ScanWhereInput | ScanWhereInput[]
    OR?: ScanWhereInput[]
    NOT?: ScanWhereInput | ScanWhereInput[]
    qrCodeId?: StringFilter<"Scan"> | string
    shortcode?: StringNullableFilter<"Scan"> | string | null
    scannedAt?: DateTimeFilter<"Scan"> | Date | string
    country?: StringNullableFilter<"Scan"> | string | null
    city?: StringNullableFilter<"Scan"> | string | null
    device?: StringNullableFilter<"Scan"> | string | null
    os?: StringNullableFilter<"Scan"> | string | null
    browser?: StringNullableFilter<"Scan"> | string | null
    ipHash?: StringNullableFilter<"Scan"> | string | null
    referrer?: StringNullableFilter<"Scan"> | string | null
    qrCode?: XOR<QrCodeRelationFilter, QrCodeWhereInput>
  }, "id">

  export type ScanOrderByWithAggregationInput = {
    id?: SortOrder
    qrCodeId?: SortOrder
    shortcode?: SortOrderInput | SortOrder
    scannedAt?: SortOrder
    country?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    device?: SortOrderInput | SortOrder
    os?: SortOrderInput | SortOrder
    browser?: SortOrderInput | SortOrder
    ipHash?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    _count?: ScanCountOrderByAggregateInput
    _max?: ScanMaxOrderByAggregateInput
    _min?: ScanMinOrderByAggregateInput
  }

  export type ScanScalarWhereWithAggregatesInput = {
    AND?: ScanScalarWhereWithAggregatesInput | ScanScalarWhereWithAggregatesInput[]
    OR?: ScanScalarWhereWithAggregatesInput[]
    NOT?: ScanScalarWhereWithAggregatesInput | ScanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Scan"> | string
    qrCodeId?: StringWithAggregatesFilter<"Scan"> | string
    shortcode?: StringNullableWithAggregatesFilter<"Scan"> | string | null
    scannedAt?: DateTimeWithAggregatesFilter<"Scan"> | Date | string
    country?: StringNullableWithAggregatesFilter<"Scan"> | string | null
    city?: StringNullableWithAggregatesFilter<"Scan"> | string | null
    device?: StringNullableWithAggregatesFilter<"Scan"> | string | null
    os?: StringNullableWithAggregatesFilter<"Scan"> | string | null
    browser?: StringNullableWithAggregatesFilter<"Scan"> | string | null
    ipHash?: StringNullableWithAggregatesFilter<"Scan"> | string | null
    referrer?: StringNullableWithAggregatesFilter<"Scan"> | string | null
  }

  export type QrCodeCreateInput = {
    id?: string
    shortcode: string
    type: string
    name: string
    payload: JsonNullValueInput | InputJsonValue
    design: JsonNullValueInput | InputJsonValue
    userId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    scans?: ScanCreateNestedManyWithoutQrCodeInput
  }

  export type QrCodeUncheckedCreateInput = {
    id?: string
    shortcode: string
    type: string
    name: string
    payload: JsonNullValueInput | InputJsonValue
    design: JsonNullValueInput | InputJsonValue
    userId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    scans?: ScanUncheckedCreateNestedManyWithoutQrCodeInput
  }

  export type QrCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    design?: JsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scans?: ScanUpdateManyWithoutQrCodeNestedInput
  }

  export type QrCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    design?: JsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scans?: ScanUncheckedUpdateManyWithoutQrCodeNestedInput
  }

  export type QrCodeCreateManyInput = {
    id?: string
    shortcode: string
    type: string
    name: string
    payload: JsonNullValueInput | InputJsonValue
    design: JsonNullValueInput | InputJsonValue
    userId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QrCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    design?: JsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QrCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    design?: JsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScanCreateInput = {
    id?: string
    shortcode?: string | null
    scannedAt?: Date | string
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    ipHash?: string | null
    referrer?: string | null
    qrCode: QrCodeCreateNestedOneWithoutScansInput
  }

  export type ScanUncheckedCreateInput = {
    id?: string
    qrCodeId: string
    shortcode?: string | null
    scannedAt?: Date | string
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    ipHash?: string | null
    referrer?: string | null
  }

  export type ScanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: NullableStringFieldUpdateOperationsInput | string | null
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    qrCode?: QrCodeUpdateOneRequiredWithoutScansNestedInput
  }

  export type ScanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    qrCodeId?: StringFieldUpdateOperationsInput | string
    shortcode?: NullableStringFieldUpdateOperationsInput | string | null
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanCreateManyInput = {
    id?: string
    qrCodeId: string
    shortcode?: string | null
    scannedAt?: Date | string
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    ipHash?: string | null
    referrer?: string | null
  }

  export type ScanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: NullableStringFieldUpdateOperationsInput | string | null
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    qrCodeId?: StringFieldUpdateOperationsInput | string
    shortcode?: NullableStringFieldUpdateOperationsInput | string | null
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ScanListRelationFilter = {
    every?: ScanWhereInput
    some?: ScanWhereInput
    none?: ScanWhereInput
  }

  export type ScanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QrCodeCountOrderByAggregateInput = {
    id?: SortOrder
    shortcode?: SortOrder
    type?: SortOrder
    name?: SortOrder
    payload?: SortOrder
    design?: SortOrder
    userId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QrCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    shortcode?: SortOrder
    type?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QrCodeMinOrderByAggregateInput = {
    id?: SortOrder
    shortcode?: SortOrder
    type?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type QrCodeRelationFilter = {
    is?: QrCodeWhereInput
    isNot?: QrCodeWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ScanCountOrderByAggregateInput = {
    id?: SortOrder
    qrCodeId?: SortOrder
    shortcode?: SortOrder
    scannedAt?: SortOrder
    country?: SortOrder
    city?: SortOrder
    device?: SortOrder
    os?: SortOrder
    browser?: SortOrder
    ipHash?: SortOrder
    referrer?: SortOrder
  }

  export type ScanMaxOrderByAggregateInput = {
    id?: SortOrder
    qrCodeId?: SortOrder
    shortcode?: SortOrder
    scannedAt?: SortOrder
    country?: SortOrder
    city?: SortOrder
    device?: SortOrder
    os?: SortOrder
    browser?: SortOrder
    ipHash?: SortOrder
    referrer?: SortOrder
  }

  export type ScanMinOrderByAggregateInput = {
    id?: SortOrder
    qrCodeId?: SortOrder
    shortcode?: SortOrder
    scannedAt?: SortOrder
    country?: SortOrder
    city?: SortOrder
    device?: SortOrder
    os?: SortOrder
    browser?: SortOrder
    ipHash?: SortOrder
    referrer?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ScanCreateNestedManyWithoutQrCodeInput = {
    create?: XOR<ScanCreateWithoutQrCodeInput, ScanUncheckedCreateWithoutQrCodeInput> | ScanCreateWithoutQrCodeInput[] | ScanUncheckedCreateWithoutQrCodeInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutQrCodeInput | ScanCreateOrConnectWithoutQrCodeInput[]
    createMany?: ScanCreateManyQrCodeInputEnvelope
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
  }

  export type ScanUncheckedCreateNestedManyWithoutQrCodeInput = {
    create?: XOR<ScanCreateWithoutQrCodeInput, ScanUncheckedCreateWithoutQrCodeInput> | ScanCreateWithoutQrCodeInput[] | ScanUncheckedCreateWithoutQrCodeInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutQrCodeInput | ScanCreateOrConnectWithoutQrCodeInput[]
    createMany?: ScanCreateManyQrCodeInputEnvelope
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ScanUpdateManyWithoutQrCodeNestedInput = {
    create?: XOR<ScanCreateWithoutQrCodeInput, ScanUncheckedCreateWithoutQrCodeInput> | ScanCreateWithoutQrCodeInput[] | ScanUncheckedCreateWithoutQrCodeInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutQrCodeInput | ScanCreateOrConnectWithoutQrCodeInput[]
    upsert?: ScanUpsertWithWhereUniqueWithoutQrCodeInput | ScanUpsertWithWhereUniqueWithoutQrCodeInput[]
    createMany?: ScanCreateManyQrCodeInputEnvelope
    set?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    disconnect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    delete?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    update?: ScanUpdateWithWhereUniqueWithoutQrCodeInput | ScanUpdateWithWhereUniqueWithoutQrCodeInput[]
    updateMany?: ScanUpdateManyWithWhereWithoutQrCodeInput | ScanUpdateManyWithWhereWithoutQrCodeInput[]
    deleteMany?: ScanScalarWhereInput | ScanScalarWhereInput[]
  }

  export type ScanUncheckedUpdateManyWithoutQrCodeNestedInput = {
    create?: XOR<ScanCreateWithoutQrCodeInput, ScanUncheckedCreateWithoutQrCodeInput> | ScanCreateWithoutQrCodeInput[] | ScanUncheckedCreateWithoutQrCodeInput[]
    connectOrCreate?: ScanCreateOrConnectWithoutQrCodeInput | ScanCreateOrConnectWithoutQrCodeInput[]
    upsert?: ScanUpsertWithWhereUniqueWithoutQrCodeInput | ScanUpsertWithWhereUniqueWithoutQrCodeInput[]
    createMany?: ScanCreateManyQrCodeInputEnvelope
    set?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    disconnect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    delete?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    connect?: ScanWhereUniqueInput | ScanWhereUniqueInput[]
    update?: ScanUpdateWithWhereUniqueWithoutQrCodeInput | ScanUpdateWithWhereUniqueWithoutQrCodeInput[]
    updateMany?: ScanUpdateManyWithWhereWithoutQrCodeInput | ScanUpdateManyWithWhereWithoutQrCodeInput[]
    deleteMany?: ScanScalarWhereInput | ScanScalarWhereInput[]
  }

  export type QrCodeCreateNestedOneWithoutScansInput = {
    create?: XOR<QrCodeCreateWithoutScansInput, QrCodeUncheckedCreateWithoutScansInput>
    connectOrCreate?: QrCodeCreateOrConnectWithoutScansInput
    connect?: QrCodeWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type QrCodeUpdateOneRequiredWithoutScansNestedInput = {
    create?: XOR<QrCodeCreateWithoutScansInput, QrCodeUncheckedCreateWithoutScansInput>
    connectOrCreate?: QrCodeCreateOrConnectWithoutScansInput
    upsert?: QrCodeUpsertWithoutScansInput
    connect?: QrCodeWhereUniqueInput
    update?: XOR<XOR<QrCodeUpdateToOneWithWhereWithoutScansInput, QrCodeUpdateWithoutScansInput>, QrCodeUncheckedUpdateWithoutScansInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ScanCreateWithoutQrCodeInput = {
    id?: string
    shortcode?: string | null
    scannedAt?: Date | string
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    ipHash?: string | null
    referrer?: string | null
  }

  export type ScanUncheckedCreateWithoutQrCodeInput = {
    id?: string
    shortcode?: string | null
    scannedAt?: Date | string
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    ipHash?: string | null
    referrer?: string | null
  }

  export type ScanCreateOrConnectWithoutQrCodeInput = {
    where: ScanWhereUniqueInput
    create: XOR<ScanCreateWithoutQrCodeInput, ScanUncheckedCreateWithoutQrCodeInput>
  }

  export type ScanCreateManyQrCodeInputEnvelope = {
    data: ScanCreateManyQrCodeInput | ScanCreateManyQrCodeInput[]
    skipDuplicates?: boolean
  }

  export type ScanUpsertWithWhereUniqueWithoutQrCodeInput = {
    where: ScanWhereUniqueInput
    update: XOR<ScanUpdateWithoutQrCodeInput, ScanUncheckedUpdateWithoutQrCodeInput>
    create: XOR<ScanCreateWithoutQrCodeInput, ScanUncheckedCreateWithoutQrCodeInput>
  }

  export type ScanUpdateWithWhereUniqueWithoutQrCodeInput = {
    where: ScanWhereUniqueInput
    data: XOR<ScanUpdateWithoutQrCodeInput, ScanUncheckedUpdateWithoutQrCodeInput>
  }

  export type ScanUpdateManyWithWhereWithoutQrCodeInput = {
    where: ScanScalarWhereInput
    data: XOR<ScanUpdateManyMutationInput, ScanUncheckedUpdateManyWithoutQrCodeInput>
  }

  export type ScanScalarWhereInput = {
    AND?: ScanScalarWhereInput | ScanScalarWhereInput[]
    OR?: ScanScalarWhereInput[]
    NOT?: ScanScalarWhereInput | ScanScalarWhereInput[]
    id?: StringFilter<"Scan"> | string
    qrCodeId?: StringFilter<"Scan"> | string
    shortcode?: StringNullableFilter<"Scan"> | string | null
    scannedAt?: DateTimeFilter<"Scan"> | Date | string
    country?: StringNullableFilter<"Scan"> | string | null
    city?: StringNullableFilter<"Scan"> | string | null
    device?: StringNullableFilter<"Scan"> | string | null
    os?: StringNullableFilter<"Scan"> | string | null
    browser?: StringNullableFilter<"Scan"> | string | null
    ipHash?: StringNullableFilter<"Scan"> | string | null
    referrer?: StringNullableFilter<"Scan"> | string | null
  }

  export type QrCodeCreateWithoutScansInput = {
    id?: string
    shortcode: string
    type: string
    name: string
    payload: JsonNullValueInput | InputJsonValue
    design: JsonNullValueInput | InputJsonValue
    userId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QrCodeUncheckedCreateWithoutScansInput = {
    id?: string
    shortcode: string
    type: string
    name: string
    payload: JsonNullValueInput | InputJsonValue
    design: JsonNullValueInput | InputJsonValue
    userId: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QrCodeCreateOrConnectWithoutScansInput = {
    where: QrCodeWhereUniqueInput
    create: XOR<QrCodeCreateWithoutScansInput, QrCodeUncheckedCreateWithoutScansInput>
  }

  export type QrCodeUpsertWithoutScansInput = {
    update: XOR<QrCodeUpdateWithoutScansInput, QrCodeUncheckedUpdateWithoutScansInput>
    create: XOR<QrCodeCreateWithoutScansInput, QrCodeUncheckedCreateWithoutScansInput>
    where?: QrCodeWhereInput
  }

  export type QrCodeUpdateToOneWithWhereWithoutScansInput = {
    where?: QrCodeWhereInput
    data: XOR<QrCodeUpdateWithoutScansInput, QrCodeUncheckedUpdateWithoutScansInput>
  }

  export type QrCodeUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    design?: JsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QrCodeUncheckedUpdateWithoutScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    design?: JsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScanCreateManyQrCodeInput = {
    id?: string
    shortcode?: string | null
    scannedAt?: Date | string
    country?: string | null
    city?: string | null
    device?: string | null
    os?: string | null
    browser?: string | null
    ipHash?: string | null
    referrer?: string | null
  }

  export type ScanUpdateWithoutQrCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: NullableStringFieldUpdateOperationsInput | string | null
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanUncheckedUpdateWithoutQrCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: NullableStringFieldUpdateOperationsInput | string | null
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanUncheckedUpdateManyWithoutQrCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    shortcode?: NullableStringFieldUpdateOperationsInput | string | null
    scannedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    country?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    os?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    ipHash?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use QrCodeCountOutputTypeDefaultArgs instead
     */
    export type QrCodeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QrCodeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QrCodeDefaultArgs instead
     */
    export type QrCodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QrCodeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ScanDefaultArgs instead
     */
    export type ScanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ScanDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}