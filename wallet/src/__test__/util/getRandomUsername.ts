import generateSalt from "../../lib/crypto/generateSalt";

export default () => `tg_username_id_${generateSalt()}`;
