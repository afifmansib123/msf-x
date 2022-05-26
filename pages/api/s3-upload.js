/**
 * TODO Add access token
 * https://next-s3-upload.codingvalue.com/s3-file-paths
 */
import { APIRoute } from "next-s3-upload";

export default APIRoute.configure({
  async key(req, filename) {
    var path = req.body.path ? req.body.path : "upload";
    return `msf/${path}/${filename}`;
  }
});


// export { APIRoute as default } from "next-s3-upload";