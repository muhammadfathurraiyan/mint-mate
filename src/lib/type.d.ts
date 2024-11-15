type TUploadProps =
  | {
      name: string;
      description: string;
      image: string;
    }
  | File;

type TStep = boolean | Dispatch<SetStateAction<boolean>>;

type TNft = {
  name: string;
  description: string;
  image: string;
};
