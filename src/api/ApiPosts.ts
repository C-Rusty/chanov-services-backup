import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getDocs, getDoc, query, limit, startAfter, DocumentData  } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import collections from "../collections/collections";
import { IFullPost, IPost, IPostsUrlPath} from "../interface/Interface";
import { firebaseConfig } from "./dbConfig";

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

  const docRef = await doc(db, collectionName, postName);
  const fullPost = (await getDoc(docRef)).data();
  
  return fullPost as IFullPost;
};

const getShortPosts = async (language: string) => {
  let collectionName: string = ``;

  if (language === `ru`) {
    collectionName = collections.postsRuShort;
  } else if (language === `en`) {
    collectionName = collections.postsEnShort;
  } else {
    throw new Error (`Something wrong. Language is ${language}`);
  };
  
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    // For limit posts amount requests
    // const first = query(collection(db, collectionName), limit(7));
    // const documentSnapshots = await getDocs(first);

    // console.log(`first`, documentSnapshots);

    // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

    // const next = query(collection(db, collectionName), startAfter(lastVisible), limit(7));

    // const docsNext = await getDocs(next); 
    // console.log(`next`, docsNext);

    const posts: IPost[] = querySnapshot.docs.map(postDoc => {
      const post = postDoc.data() as IPost;
      return post;
    });

    return posts;

  } catch (error) {
    console.log(error);
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
  // createCollection
}