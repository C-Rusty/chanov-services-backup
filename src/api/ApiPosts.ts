import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getDoc, query, limit, startAfter, DocumentData, orderBy  } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import collections from "../collections/collections";
import { IFullPost, IPost, IPostsUrlPath} from "../interface/Interface";
import { firebaseConfig } from "./dbConfig";
import { postsLoadLimit, postFieldOrderBy } from "./ApiPostConfig";
import { pageActionsEvents } from "../types/types";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getFullPost = async (language: string, postName: string) => {
  let collectionName: string = ``;

  if (language === `ru`) {
    collectionName = collections.postsRuFull;
  } else if (language === `en`) {
    collectionName = collections.postsEnFull;
  } else {
    throw new Error (`Something wrong. Language is ${language}`);
  };

  const docRef = doc(db, collectionName, postName);
  const fullPost = (await getDoc(docRef)).data();
  
  return fullPost as IFullPost;
};

const getShortPosts = async (language: string, postsAmountLoaded: number, lastPostTimestamp: number | null, pageEvent: pageActionsEvents) => {
  let collectionName: string = ``;

  if (language === `ru`) {
    collectionName = collections.postsRuShort;
  } else if (language === `en`) {
    collectionName = collections.postsEnShort;
  } else {
    throw new Error (`Something wrong. Language is ${language}`);
  };

  let posts: IPost[] = [];

    switch (pageEvent) {

      case `initial-load`:
        try {
          const firstQueue = query(collection(db, collectionName), orderBy(postFieldOrderBy), limit(postsLoadLimit));
  
          const documentSnapshots = await getDocs(firstQueue);
  
          posts = documentSnapshots.docs.map(postDoc => {
            return postDoc.data() as IPost;
          });
        } catch (error) {
          throw new Error(`${error}`);
        };

      break;

      case `load-more`:

        try {
          const nextQueue = query(collection(db, collectionName), orderBy(postFieldOrderBy), startAfter(lastPostTimestamp), limit(postsLoadLimit));
      
          const docsNext = await getDocs(nextQueue); 
          posts = docsNext.docs.map(postDoc => {
            return postDoc.data() as IPost;
          });

        } catch (error) {
          throw new Error(`${error}`);
        };
    
      break;

      case `lang-changed`:

        try {
          const queue = query(collection(db, collectionName), orderBy(postFieldOrderBy), limit(postsAmountLoaded));

          const documentSnapshots = await getDocs(queue);

          posts = documentSnapshots.docs.map(postDoc => {
            return postDoc.data() as IPost;
          });
        } catch (error) {
          throw new Error(`${error}`);
        };

      break;

      default: throw new Error(`something wrong with page event value. The value: ${pageEvent}`);
    };

    if (posts.length < postsLoadLimit) {
      return {posts: posts, isAllPostsLoaded: true};
    } else {
      return {posts: posts, isAllPostsLoaded: false};
    };
};

const getPostsUrl = async () => {
  const collectionName: string = `posts-url-paths`;
  const querySnapshot: DocumentData[] = (await getDocs(collection(db, collectionName))).docs.map(data => { return data.data() });

  const urlPaths = querySnapshot as Array<IPostsUrlPath>;

  return urlPaths[0].paths;
};

export const api = {
  getShortPosts,
  getFullPost,
  getPostsUrl
}