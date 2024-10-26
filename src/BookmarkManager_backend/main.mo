import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor {
    type Bookmark = {
        id: Nat;
        title: Text;
        url: Text;
        category: Text;
    };

    private var nextId: Nat = 0;
    private var bookmarks = HashMap.HashMap<Nat, Bookmark>(0, Nat.equal, Hash.hash);

    public func createBookmark(title: Text, url: Text, category: ?Text) : async Nat {
        let id = nextId;
        let newBookmark: Bookmark = {
            id;
            title;
            url;
            category = Option.get(category, "General");
        };
        bookmarks.put(id, newBookmark);
        nextId += 1;
        id
    };

    public func updateBookmark(id: Nat, title: ?Text, url: ?Text, category: ?Text) : async Bool {
        switch (bookmarks.get(id)) {
            case (null) { false };
            case (?existingBookmark) {
                let updatedBookmark: Bookmark = {
                    id = existingBookmark.id;
                    title = Option.get(title, existingBookmark.title);
                    url = Option.get(url, existingBookmark.url);
                    category = Option.get(category, existingBookmark.category);
                };
                bookmarks.put(id, updatedBookmark);
                true
            };
        }
    };

    public query func getBookmark(id: Nat) : async ?Bookmark {
        bookmarks.get(id)
    };

    public query func getAllBookmarks() : async [Bookmark] {
        Iter.toArray(bookmarks.vals())
    };

    public query func getBookmarksByCategory(category: Text) : async [Bookmark] {
        Array.filter<Bookmark>(Iter.toArray(bookmarks.vals()), func(bookmark: Bookmark) : Bool {
            bookmark.category == category
        })
    };

    public func deleteBookmark(id: Nat) : async Bool {
        switch (bookmarks.remove(id)) {
            case (null) { false };
            case (?_) { true };
        }
    };
}
