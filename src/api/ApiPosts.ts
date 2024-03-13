import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getDocs, getDoc, query, limit, startAfter, DocumentData, orderBy  } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import collections from "../collections/collections";
import { IFullPost, IPost, IPostsUrlPath} from "../interface/Interface";
import { firebaseConfig } from "./dbConfig";
import { postsLoadLimit, postFieldOrderBy } from "./ApiPostConfig";
import { log } from "console";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const createCollection = async (pageLang: string) => {
  let collectionName: string = ``;

  if (pageLang === `ru`) {
    collectionName = collections.postsRuShort;
  } else if (pageLang === `en`) {
    collectionName = collections.postsEnShort;
  } else {
    throw new Error (`Something wrong. Language is ${pageLang}`);
  };

    try {
        await setDoc(doc(db, collectionName, `Strategy-porter`), {
          types: [`Case`],
          categories: [`Marketing`, `Strategy`],
          imageCloudPath: `posts/kia-strategy.webp`,
          headline: `Strategy development in the “Hard” approach: how Porter’s 5 Forces Model is used`,
          
        });  
    } catch (error) {
        console.log(error);
    };
};

const createCollectionPostsFull = async (pageLang: string, link: string) => {
  let collectionName: string = ``;

  if (pageLang === `ru`) {
    collectionName = `posts-ru-full`;
  } else if (pageLang === `en`) {
    collectionName = `posts-en-full`;
  } else {
    throw new Error (`Something wrong. Language is ${pageLang}`);
  };

    try {
        await setDoc(doc(db, collectionName, link), {
          headline: `Strategy development in the “Hard” approach: how Porter’s 5 Forces Model is used`,
          types: [`Article`],
          categories: [`Marketing`],
          imageCloudPath: `posts/Strategy-porter.webp` 
        });  
    } catch (error) {
        console.log(error);
    };
};

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

const getShortPosts = async (language: string, postsAmountLoaded: number, lastPostTimestamp: number | null) => {
  let collectionName: string = ``;

  if (language === `ru`) {
    collectionName = collections.postsRuShort;
  } else if (language === `en`) {
    collectionName = collections.postsEnShort;
  } else {
    throw new Error (`Something wrong. Language is ${language}`);
  };

  let posts: IPost[] = [];

  if (postsAmountLoaded < 6) {
      try {
        const firstQueue = query(collection(db, collectionName), orderBy(postFieldOrderBy), limit(postsLoadLimit));

        const documentSnapshots = await getDocs(firstQueue);

        posts = documentSnapshots.docs.map(postDoc => {
          return postDoc.data() as IPost;
        });
      } catch (error) {
        throw new Error(`${error}`);
      };
  } else {
      try {
        const nextQueue = query(collection(db, collectionName), orderBy(postFieldOrderBy), startAfter(lastPostTimestamp), limit(postsLoadLimit));
    
        const docsNext = await getDocs(nextQueue); 
        posts = docsNext.docs.map(postDoc => {
          return postDoc.data() as IPost;
        });
      } catch (error) {
        throw new Error(`${error}`);
      };
  };

  return posts;
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
  // createCollection
}