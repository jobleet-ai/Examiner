
import { BlobServiceClient } from '@azure/storage-blob';
// const account = import.meta.env.VITE_STORAGE_ACCOUNT  // get the storage account name from the .env file
// const sasToken = import.meta.env.VITE_STORAGE_SAS  // get the SAS token from the .env file
// const containerName = import.meta.env.VITE_STORAGE_CONTAINER  // get the container name from the .env file

const account ="joblient"
const containerName = "workspace"
const  sasToken  ="sp=r&st=2023-08-17T07:36:19Z&se=2023-12-31T15:36:19Z&spr=https&sv=2022-11-02&sr=c&sig=3VivZk%2BqIUiBq95YLuoIqctjhTGsgY6ihPPIqt5JE3g%3D"
const  blobSASToken  ="sp=r&st=2024-01-14T04:53:02Z&se=2024-12-31T12:53:02Z&spr=https&sv=2022-11-02&sr=c&sig=8%2FwrFakoFEtbYhgzM0pw9wrtUhH2O%2Bl%2BiddNp2%2BVK3M%3D"


export const loadBlobData = async(file)=>{

    try {

    const blobServiceClient = await new BlobServiceClient(`https://${account}.blob.core.windows.net/?${blobSASToken}`);  // create a blobServiceClient
    const containerClient = blobServiceClient.getContainerClient(containerName);  // create a containerClient
  
    console.log('File from blob', file)

    let tempBlockBlobClient =  await containerClient.getBlockBlobClient(file);//'0_n_ary_tree.md');  // get the blob url
    //urls.push({ name: blob.name, url: tempBlockBlobClient.url });  // push the image name and url to 
    // const blobItems = containerClient.listBlobsFlat(); 
    // const urls = [];
    // for await (const blob of blobItems) {
    //   tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);  // get the blob url
    //   console.log('blob', blob.name, tempBlockBlobClient.url)
    //   //urls.push({ name: blob.name, url: tempBlockBlobClient.url });  // push the image name and url to the urls array
    // }



    // console.log('tempBlockBlobClient:', tempBlockBlobClient);

     return tempBlockBlobClient.url;

    } catch(err) {

        console.log('Some error:', err)
    }


}