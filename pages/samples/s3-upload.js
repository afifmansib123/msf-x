/**
 * Sample upload to S3
 * Simply call uploadToS3() with options.
 * @author Chayapol Moemeng
 * @date 2022-05-20
 */
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { useSession } from "next-auth/react";

export default function UploadTest() {
  const storeId = 23; // TODO DUMMY
  const { data: session } = useSession();
  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file) => {
    console.log(file);
    let { url } = await uploadToS3(file, {
      endpoint: {
        request: {
          body: {
            path: `store/${storeId}/banner`,  // Path without leading and trailing slashes
          },
        },
      },
    });
    console.log("S3 url",url)
    setImageUrl(url);
  };

  return (
    <div>
      <FileInput onChange={handleFileChange} />

      <button onClick={openFileDialog}>Upload file</button>

      {imageUrl && <img src={imageUrl} />}
    </div>
  );
}
