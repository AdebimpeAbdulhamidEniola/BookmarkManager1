import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Bookmark {
  'id' : bigint,
  'url' : string,
  'title' : string,
  'category' : string,
}
export interface _SERVICE {
  'createBookmark' : ActorMethod<[string, string, [] | [string]], bigint>,
  'deleteBookmark' : ActorMethod<[bigint], boolean>,
  'getAllBookmarks' : ActorMethod<[], Array<Bookmark>>,
  'getBookmark' : ActorMethod<[bigint], [] | [Bookmark]>,
  'getBookmarksByCategory' : ActorMethod<[string], Array<Bookmark>>,
  'updateBookmark' : ActorMethod<
    [bigint, [] | [string], [] | [string], [] | [string]],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
