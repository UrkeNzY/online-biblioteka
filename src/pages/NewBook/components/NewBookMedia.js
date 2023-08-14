import MediaDropzone from "./MediaDropzone";
import { useCreateBookContext } from "../../../state/CreateBookContext";

const NewBookMedia = () => {
  const { editBookData } = useCreateBookContext();

  return <MediaDropzone photo={editBookData.photo} />;
};

export default NewBookMedia;
