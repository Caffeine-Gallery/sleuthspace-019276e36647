export const idlFactory = ({ IDL }) => {
  const PersonId = IDL.Nat;
  const CommentId = IDL.Nat;
  const NoteId = IDL.Nat;
  const Person = IDL.Record({
    'id' : PersonId,
    'address' : IDL.Text,
    'lastName' : IDL.Text,
    'contactDetails' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Comment = IDL.Record({
    'id' : CommentId,
    'content' : IDL.Text,
    'creationDate' : IDL.Int,
    'personId' : PersonId,
  });
  const Note = IDL.Record({
    'id' : NoteId,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'creationDate' : IDL.Int,
    'personId' : PersonId,
  });
  return IDL.Service({
    'addComment' : IDL.Func([PersonId, IDL.Text], [IDL.Opt(CommentId)], []),
    'addNote' : IDL.Func([PersonId, IDL.Text, IDL.Text], [IDL.Opt(NoteId)], []),
    'addPerson' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [PersonId],
        [],
      ),
    'getAllPeople' : IDL.Func([], [IDL.Vec(Person)], ['query']),
    'getCommentsForPerson' : IDL.Func(
        [PersonId],
        [IDL.Vec(Comment)],
        ['query'],
      ),
    'getNotesForPerson' : IDL.Func([PersonId], [IDL.Vec(Note)], ['query']),
    'getPerson' : IDL.Func([PersonId], [IDL.Opt(Person)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
