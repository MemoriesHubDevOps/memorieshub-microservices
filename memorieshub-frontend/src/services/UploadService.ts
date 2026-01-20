import axiosInstance from "../utils/AxiosUtils"


export default class UploadService {

    static uploadPictureAsync = async (picture : File) => {

        const formData = new FormData()
        formData.append('image', picture)

        const response = await axiosInstance.post(
            '/upload',
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );

        return 'http://localhost:3300/api' + response.data.replace('\\', '/');
    }
}