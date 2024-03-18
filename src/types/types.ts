import { IPost } from "../interface/Interface";

export type pageActionsEvents = `initial-load` | `load-more` | `lang-changed` | undefined;

export type PostsResponse = {
    posts: IPost[], 
    isAllPostsLoaded: boolean
};