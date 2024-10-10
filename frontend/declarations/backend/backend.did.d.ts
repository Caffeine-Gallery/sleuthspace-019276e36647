import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Comment {
  'id' : CommentId,
  'content' : string,
  'creationDate' : bigint,
  'personId' : PersonId,
}
export type CommentId = bigint;
export interface Note {
  'id' : NoteId,
  'title' : string,
  'content' : string,
  'creationDate' : bigint,
  'personId' : PersonId,
}
export type NoteId = bigint;
export interface Person {
  'id' : PersonId,
  'address' : string,
  'lastName' : string,
  'contactDetails' : string,
  'firstName' : string,
}
export type PersonId = bigint;
export interface _SERVICE {
  'addComment' : ActorMethod<[PersonId, string], [] | [CommentId]>,
  'addNote' : ActorMethod<[PersonId, string, string], [] | [NoteId]>,
  'addPerson' : ActorMethod<[string, string, string, string], PersonId>,
  'getAllPeople' : ActorMethod<[], Array<Person>>,
  'getCommentsForPerson' : ActorMethod<[PersonId], Array<Comment>>,
  'getNotesForPerson' : ActorMethod<[PersonId], Array<Note>>,
  'getPerson' : ActorMethod<[PersonId], [] | [Person]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
