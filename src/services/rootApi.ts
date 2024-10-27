import initApi from "./initAPI";

const rootApi = initApi(process.env.EXPO_PUBLIC_API);
const authApi = initApi(process.env.EXPO_PUBLIC_API);
export { authApi };
export default rootApi;
