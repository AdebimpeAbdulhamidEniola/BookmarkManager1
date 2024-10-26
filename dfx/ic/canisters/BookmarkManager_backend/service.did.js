export const idlFactory = ({ IDL }) => {
  const Bookmark = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'title' : IDL.Text,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'createBookmark' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [IDL.Nat],
        [],
      ),
    'deleteBookmark' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getAllBookmarks' : IDL.Func([], [IDL.Vec(Bookmark)], ['query']),
    'getBookmark' : IDL.Func([IDL.Nat], [IDL.Opt(Bookmark)], ['query']),
    'getBookmarksByCategory' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Bookmark)],
        ['query'],
      ),
    'updateBookmark' : IDL.Func(
        [IDL.Nat, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
