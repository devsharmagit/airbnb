import axios from 'axios';
import toast from 'react-hot-toast';

export const uploadFilesToServer = async (filesArr, type) => {
  const data = new FormData();
  filesArr.forEach((file) => {
    if (file?.type?.includes('image')) {
      data.append('photos', file);
    } else {
      return toast.error('Please select Images only!');
    }
  });

  let destination = 'place-image';

  if (type === 'user') {
    destination = 'user-image';
  }

  const responseData = await axios.post(`http://localhost:3500/api/upload/${destination}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return responseData.data;
};
