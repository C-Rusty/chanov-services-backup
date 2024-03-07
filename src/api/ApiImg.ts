import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
const storageRefImg = ref(storage, `posts/Strategy-porter.webp`);

const uploadImage = (file: File) => {
    uploadBytes(storageRefImg, file).then(() => {
        console.log(`uploaded!`);
    });
};

const downloadImage = async (imgCloudUrl: string) => {
    try {
        const response = getDownloadURL(ref(storage, imgCloudUrl));
        return response;
    } catch (error) {
        console.log(error);
    };
};

const downloadAllImgFromFolder = async (folderName: string) => {
    const urlPath: string = `full-posts/` + folderName;
    try {
        const listRef = ref(storage, urlPath);
        const imgsCloudPaths: Array<string> = (await listAll(listRef)).items.map(item => {return item.fullPath});;

        let imgsDownloadLinks: Array<string> = [];

        for (let imgPath of imgsCloudPaths) {
            const imgUrl: string | undefined = await getImg(imgPath);
            if (imgUrl) imgsDownloadLinks.push(imgUrl);
        };

        async function getImg (imageCloudPath: string) {
            return apiImg.downloadImage(imageCloudPath);
        };

        return imgsDownloadLinks;

    } catch (error) {
        console.log(error);
    };
};

export const apiImg = {
    uploadImage,
    downloadImage,
    downloadAllImgFromFolder
};

