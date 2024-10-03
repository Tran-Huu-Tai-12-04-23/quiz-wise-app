import initApi from "./initAPI";

const rootApi = initApi(process.env.EXPO_PUBLIC_API);
const authApi = initApi("https://life-manager-api.genny.id.vn");
export { authApi };
export default rootApi;
