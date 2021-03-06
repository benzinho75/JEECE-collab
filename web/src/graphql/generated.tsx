import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  services: Array<Service>;
  serviceByName?: Maybe<Service>;
  serviceById?: Maybe<Service>;
  postes: Array<Poste>;
  posteByName?: Maybe<Poste>;
  posteById?: Maybe<Poste>;
  me?: Maybe<User>;
  userById?: Maybe<User>;
  usersByFnOrLnOrSnOrPnLikeWordsInString?: Maybe<Array<User>>;
};


export type QueryServiceByNameArgs = {
  name: Scalars['String'];
};


export type QueryServiceByIdArgs = {
  id: Scalars['Int'];
};


export type QueryPosteByNameArgs = {
  name: Scalars['String'];
};


export type QueryPosteByIdArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type QueryUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryUsersByFnOrLnOrSnOrPnLikeWordsInStringArgs = {
  string: Scalars['String'];
};

export type Service = {
  __typename?: 'Service';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Poste = {
  __typename?: 'Poste';
  id: Scalars['Int'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  accepted: Scalars['Boolean'];
  admin: Scalars['Boolean'];
  profilePicPath?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  serviceId?: Maybe<Scalars['Int']>;
  posteId?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createService: Service;
  updateService: Service;
  deleteService: Scalars['Boolean'];
  createPoste: Poste;
  updatePoste: Poste;
  deletePoste: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateServiceArgs = {
  name: Scalars['String'];
};


export type MutationUpdateServiceArgs = {
  newName: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteServiceArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationCreatePosteArgs = {
  name: Scalars['String'];
};


export type MutationUpdatePosteArgs = {
  newName: Scalars['String'];
  id?: Maybe<Scalars['Int']>;
};


export type MutationDeletePosteArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationRegisterArgs = {
  posteId?: Maybe<Scalars['Int']>;
  serviceId?: Maybe<Scalars['Int']>;
  lastname: Scalars['String'];
  firstname: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'firstname' | 'lastname' | 'accepted' | 'admin' | 'profilePicPath' | 'createdAt' | 'updatedAt' | 'serviceId' | 'posteId'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  serviceId?: Maybe<Scalars['Int']>;
  posteId?: Maybe<Scalars['Int']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type PosteByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PosteByIdQuery = (
  { __typename?: 'Query' }
  & { posteById?: Maybe<(
    { __typename?: 'Poste' }
    & Pick<Poste, 'id' | 'name' | 'createdAt' | 'updatedAt'>
  )> }
);

export type PostesQueryVariables = Exact<{ [key: string]: never; }>;


export type PostesQuery = (
  { __typename?: 'Query' }
  & { postes: Array<(
    { __typename?: 'Poste' }
    & Pick<Poste, 'id' | 'name' | 'createdAt' | 'updatedAt'>
  )> }
);

export type ServiceByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ServiceByIdQuery = (
  { __typename?: 'Query' }
  & { serviceById?: Maybe<(
    { __typename?: 'Service' }
    & Pick<Service, 'id' | 'name' | 'createdAt' | 'updatedAt'>
  )> }
);

export type ServicesQueryVariables = Exact<{ [key: string]: never; }>;


export type ServicesQuery = (
  { __typename?: 'Query' }
  & { services: Array<(
    { __typename?: 'Service' }
    & Pick<Service, 'id' | 'name' | 'createdAt' | 'updatedAt'>
  )> }
);

export type UserByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById?: Maybe<(
    { __typename?: 'User' }
    & UserFragment
  )> }
);

export type UsersByFnOrLnOrSnOrPnLikeWordsInStringQueryVariables = Exact<{
  string: Scalars['String'];
}>;


export type UsersByFnOrLnOrSnOrPnLikeWordsInStringQuery = (
  { __typename?: 'Query' }
  & { usersByFnOrLnOrSnOrPnLikeWordsInString?: Maybe<Array<(
    { __typename?: 'User' }
    & UserFragment
  )>> }
);

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  firstname
  lastname
  accepted
  admin
  profilePicPath
  createdAt
  updatedAt
  serviceId
  posteId
}
    `;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation register($email: String!, $password: String!, $firstname: String!, $lastname: String!, $serviceId: Int, $posteId: Int) {
  register(
    email: $email
    password: $password
    firstname: $firstname
    lastname: $lastname
    serviceId: $serviceId
    posteId: $posteId
  ) {
    errors {
      field
      message
    }
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PosteByIdDocument = gql`
    query posteById($id: Int!) {
  posteById(id: $id) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function usePosteByIdQuery(options: Omit<Urql.UseQueryArgs<PosteByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PosteByIdQuery>({ query: PosteByIdDocument, ...options });
};
export const PostesDocument = gql`
    query postes {
  postes {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function usePostesQuery(options: Omit<Urql.UseQueryArgs<PostesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostesQuery>({ query: PostesDocument, ...options });
};
export const ServiceByIdDocument = gql`
    query serviceById($id: Int!) {
  serviceById(id: $id) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useServiceByIdQuery(options: Omit<Urql.UseQueryArgs<ServiceByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ServiceByIdQuery>({ query: ServiceByIdDocument, ...options });
};
export const ServicesDocument = gql`
    query services {
  services {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useServicesQuery(options: Omit<Urql.UseQueryArgs<ServicesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ServicesQuery>({ query: ServicesDocument, ...options });
};
export const UserByIdDocument = gql`
    query userById($id: Int!) {
  userById(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useUserByIdQuery(options: Omit<Urql.UseQueryArgs<UserByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserByIdQuery>({ query: UserByIdDocument, ...options });
};
export const UsersByFnOrLnOrSnOrPnLikeWordsInStringDocument = gql`
    query usersByFnOrLnOrSnOrPnLikeWordsInString($string: String!) {
  usersByFnOrLnOrSnOrPnLikeWordsInString(string: $string) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useUsersByFnOrLnOrSnOrPnLikeWordsInStringQuery(options: Omit<Urql.UseQueryArgs<UsersByFnOrLnOrSnOrPnLikeWordsInStringQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersByFnOrLnOrSnOrPnLikeWordsInStringQuery>({ query: UsersByFnOrLnOrSnOrPnLikeWordsInStringDocument, ...options });
};