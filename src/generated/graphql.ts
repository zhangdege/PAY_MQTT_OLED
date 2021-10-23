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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldInfoType = {
  __typename?: 'FieldInfoType';
  askPrice: Scalars['String'];
  askSize: Scalars['String'];
  bidPrice: Scalars['String'];
  bidSize: Scalars['String'];
  calculationPrice: Scalars['String'];
  change: Scalars['String'];
  changePercent: Scalars['String'];
  high: Scalars['String'];
  latestPrice: Scalars['String'];
  latestSource: Scalars['String'];
  latestUpdate: Scalars['String'];
  latestVolume: Scalars['String'];
  low: Scalars['String'];
  previousClose: Scalars['String'];
  primaryExchange?: Maybe<Scalars['String']>;
  sector?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

export type MongoClass = {
  createdAt: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProfilePicture?: Maybe<Array<Scalars['String']>>;
  adminCreatepost: Post;
  adminCreateuser: User;
  adminDeletepost: Scalars['Float'];
  adminDeleteuser: Scalars['Float'];
  adminUpdatepost: Scalars['Float'];
  adminUpdateuser: Scalars['Float'];
  createPost: Post;
  deletePost?: Maybe<Scalars['Boolean']>;
  logout: Scalars['Boolean'];
  phoneLoginOrRegister: UserResponse;
  postsByS: Array<Post>;
  sendToken: UserResponse;
  updatePost?: Maybe<Post>;
};


export type MutationAddProfilePictureArgs = {
  pictures: Array<Scalars['Upload']>;
};


export type MutationAdminCreatepostArgs = {
  data: AdminPostInput;
};


export type MutationAdminCreateuserArgs = {
  data: AdminUserInput;
};


export type MutationAdminDeletepostArgs = {
  id: Scalars['String'];
};


export type MutationAdminDeleteuserArgs = {
  id: Scalars['String'];
};


export type MutationAdminUpdatepostArgs = {
  data: AdminPostInput;
  id: Scalars['String'];
};


export type MutationAdminUpdateuserArgs = {
  data: AdminUserInput;
  id: Scalars['String'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationPhoneLoginOrRegisterArgs = {
  options: PhoneTokenInput;
  password?: Maybe<Scalars['String']>;
};


export type MutationPostsBySArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  s: Scalars['String'];
};


export type MutationSendTokenArgs = {
  phone: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type PayResponse = {
  __typename?: 'PayResponse';
  description: Scalars['String'];
  payMethod: Scalars['String'];
  total: Scalars['String'];
};

export type PhoneTokenInput = {
  phone: Scalars['String'];
  token: Scalars['String'];
};

export type Post = MongoClass & {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  creator: User;
  id: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  adminpost: Post;
  adminposts: Array<Post>;
  adminuser: User;
  adminusers: Array<User>;
  hello: Scalars['String'];
  helloheihei: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  toGetBTCInfo: Scalars['String'];
};


export type QueryAdminpostArgs = {
  id: Scalars['String'];
};


export type QueryAdminpostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAdminuserArgs = {
  id: Scalars['String'];
};


export type QueryAdminusersArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  btcInfo: FieldInfoType;
  getPaysuccessnotice: PayResponse;
  testSub: TestResponse;
};


export type User = MongoClass & {
  __typename?: 'User';
  avatars: Array<Scalars['String']>;
  balance: Scalars['Float'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  phone: Scalars['String'];
  posts: Array<Post>;
  role: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AdminPostInput = {
  title: Scalars['String'];
};

export type AdminUserInput = {
  avatars: Array<Scalars['String']>;
  password: Scalars['String'];
  phone: Scalars['String'];
  role: Scalars['String'];
};

export type TestResponse = {
  __typename?: 'testResponse';
  message: Scalars['String'];
};

export type AddProfilePictureMutationVariables = Exact<{
  pictures: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type AddProfilePictureMutation = { __typename?: 'Mutation', addProfilePicture?: Maybe<Array<string>> };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, title: string, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: string, phone: string, avatars: Array<string> } } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: Maybe<boolean> };

export type PostsBySMutationVariables = Exact<{
  S: Scalars['String'];
}>;


export type PostsBySMutation = { __typename?: 'Mutation', postsByS: Array<{ __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, creator: { __typename?: 'User', id: string } }> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type PhoneLoginOrRegisterMutationVariables = Exact<{
  phone: Scalars['String'];
  token: Scalars['String'];
}>;


export type PhoneLoginOrRegisterMutation = { __typename?: 'Mutation', phoneLoginOrRegister: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', phone: string, id: string, avatars: Array<string> }> } };

export type SendTokenMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type SendTokenMutation = { __typename?: 'Mutation', sendToken: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>> } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: Maybe<{ __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, creator: { __typename?: 'User', id: string } }> };

export type PostsLimitQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type PostsLimitQuery = { __typename?: 'Query', posts: Array<{ __typename: 'Post', id: string, createdAt: string, updatedAt: string, title: string, creator: { __typename: 'User', id: string, createdAt: string, updatedAt: string, phone: string, role: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, phone: string, avatars: Array<string> }> };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: Maybe<{ __typename: 'Post', id: string, createdAt: string, updatedAt: string, title: string, creator: { __typename?: 'User', id: string } }> };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, createdAt: string, updatedAt: string, title: string, creator: { __typename?: 'User', id: string } }> };

export type GetPaysuccessnoticeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetPaysuccessnoticeSubscription = { __typename?: 'Subscription', getPaysuccessnotice: { __typename?: 'PayResponse', payMethod: string, total: string, description: string } };

export type TestSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TestSubSubscription = { __typename?: 'Subscription', testSub: { __typename?: 'testResponse', message: string } };


export const AddProfilePictureDocument = gql`
    mutation AddProfilePicture($pictures: [Upload!]!) {
  addProfilePicture(pictures: $pictures)
}
    `;

export function useAddProfilePictureMutation() {
  return Urql.useMutation<AddProfilePictureMutation, AddProfilePictureMutationVariables>(AddProfilePictureDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!) {
  createPost(title: $title) {
    creator {
      id
      phone
      avatars
    }
    id
    title
    createdAt
    updatedAt
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const PostsBySDocument = gql`
    mutation PostsByS($S: String!) {
  postsByS(s: $S) {
    id
    createdAt
    updatedAt
    title
    creator {
      id
    }
  }
}
    `;

export function usePostsBySMutation() {
  return Urql.useMutation<PostsBySMutation, PostsBySMutationVariables>(PostsBySDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const PhoneLoginOrRegisterDocument = gql`
    mutation PhoneLoginOrRegister($phone: String!, $token: String!) {
  phoneLoginOrRegister(options: {phone: $phone, token: $token}) {
    errors {
      field
      message
    }
    user {
      phone
      id
      avatars
    }
  }
}
    `;

export function usePhoneLoginOrRegisterMutation() {
  return Urql.useMutation<PhoneLoginOrRegisterMutation, PhoneLoginOrRegisterMutationVariables>(PhoneLoginOrRegisterDocument);
};
export const SendTokenDocument = gql`
    mutation SendToken($phone: String!) {
  sendToken(phone: $phone) {
    errors {
      field
      message
    }
  }
}
    `;

export function useSendTokenMutation() {
  return Urql.useMutation<SendTokenMutation, SendTokenMutationVariables>(SendTokenDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: String!, $title: String!) {
  updatePost(id: $id, title: $title) {
    id
    createdAt
    updatedAt
    title
    creator {
      id
    }
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const PostsLimitDocument = gql`
    query PostsLimit($limit: Int, $offset: Int) {
  posts(limit: $limit, offset: $offset) {
    id
    createdAt
    updatedAt
    title
    creator {
      id
      createdAt
      updatedAt
      phone
      role
      __typename
    }
    __typename
  }
}
    `;

export function usePostsLimitQuery(options: Omit<Urql.UseQueryArgs<PostsLimitQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsLimitQuery>({ query: PostsLimitDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    phone
    avatars
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: String!) {
  post(id: $id) {
    id
    createdAt
    updatedAt
    title
    creator {
      id
    }
    __typename
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    createdAt
    updatedAt
    title
    creator {
      id
    }
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const GetPaysuccessnoticeDocument = gql`
    subscription getPaysuccessnotice {
  getPaysuccessnotice {
    payMethod
    total
    description
  }
}
    `;

export function useGetPaysuccessnoticeSubscription<TData = GetPaysuccessnoticeSubscription>(options: Omit<Urql.UseSubscriptionArgs<GetPaysuccessnoticeSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<GetPaysuccessnoticeSubscription, TData>) {
  return Urql.useSubscription<GetPaysuccessnoticeSubscription, TData, GetPaysuccessnoticeSubscriptionVariables>({ query: GetPaysuccessnoticeDocument, ...options }, handler);
};
export const TestSubDocument = gql`
    subscription TestSub {
  testSub {
    message
  }
}
    `;

export function useTestSubSubscription<TData = TestSubSubscription>(options: Omit<Urql.UseSubscriptionArgs<TestSubSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<TestSubSubscription, TData>) {
  return Urql.useSubscription<TestSubSubscription, TData, TestSubSubscriptionVariables>({ query: TestSubDocument, ...options }, handler);
};