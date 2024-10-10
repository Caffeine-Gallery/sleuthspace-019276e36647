import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import Int "mo:base/Int";

import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor DetectiveAgency {
    type PersonId = Nat;
    type NoteId = Nat;
    type CommentId = Nat;

    type Person = {
        id: PersonId;
        firstName: Text;
        lastName: Text;
        address: Text;
        contactDetails: Text;
    };

    type Note = {
        id: NoteId;
        personId: PersonId;
        title: Text;
        content: Text;
        creationDate: Int;
    };

    type Comment = {
        id: CommentId;
        personId: PersonId;
        content: Text;
        creationDate: Int;
    };

    stable var nextPersonId : Nat = 0;
    stable var nextNoteId : Nat = 0;
    stable var nextCommentId : Nat = 0;

    let people = HashMap.HashMap<PersonId, Person>(0, Nat.equal, Nat.hash);
    let notes = HashMap.HashMap<NoteId, Note>(0, Nat.equal, Nat.hash);
    let comments = HashMap.HashMap<CommentId, Comment>(0, Nat.equal, Nat.hash);

    public func addPerson(firstName: Text, lastName: Text, address: Text, contactDetails: Text) : async PersonId {
        let id = nextPersonId;
        nextPersonId += 1;
        let newPerson : Person = {
            id;
            firstName;
            lastName;
            address;
            contactDetails;
        };
        people.put(id, newPerson);
        id
    };

    public query func getPerson(id: PersonId) : async ?Person {
        people.get(id)
    };

    public query func getAllPeople() : async [Person] {
        Iter.toArray(people.vals())
    };

    public func addNote(personId: PersonId, title: Text, content: Text) : async ?NoteId {
        switch (people.get(personId)) {
            case (null) { null };
            case (?_) {
                let id = nextNoteId;
                nextNoteId += 1;
                let newNote : Note = {
                    id;
                    personId;
                    title;
                    content;
                    creationDate = Time.now();
                };
                notes.put(id, newNote);
                ?id
            };
        }
    };

    public query func getNotesForPerson(personId: PersonId) : async [Note] {
        Iter.toArray(Iter.filter(notes.vals(), func (note: Note) : Bool { note.personId == personId }))
    };

    public func addComment(personId: PersonId, content: Text) : async ?CommentId {
        switch (people.get(personId)) {
            case (null) { null };
            case (?_) {
                let id = nextCommentId;
                nextCommentId += 1;
                let newComment : Comment = {
                    id;
                    personId;
                    content;
                    creationDate = Time.now();
                };
                comments.put(id, newComment);
                ?id
            };
        }
    };

    public query func getCommentsForPerson(personId: PersonId) : async [Comment] {
        Iter.toArray(Iter.filter(comments.vals(), func (comment: Comment) : Bool { comment.personId == personId }))
    };

    system func preupgrade() {
        // Implement if needed
    };

    system func postupgrade() {
        // Implement if needed
    };
}
