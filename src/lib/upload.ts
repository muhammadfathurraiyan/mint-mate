import { upload } from "thirdweb/storage";
import { client } from "./clients";

export async function uploadIpfs(data: TUploadProps) {
  const result = await upload({
    client,
    files: [data],
  });

  return result;
}
