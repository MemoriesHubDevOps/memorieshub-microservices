import axiosInstance from "../utils/AxiosUtils"
export default class UploadService {

    static uploadPictureAsync = async (picture : File) => {
        const formData = new FormData()
        formData.append('image', picture);

        const response = await axiosInstance.post(
            '/memories/upload',
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );
        return process.env.NEXT_PUBLIC_SERVER_BASE_URL + response.data.replace('\\', '/');
    }
}