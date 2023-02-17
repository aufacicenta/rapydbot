import crypto from "crypto";

const { RAPYD_SALT_LENGTH } = process.env;

export default () => {
  try {
    return crypto.randomBytes(Number(RAPYD_SALT_LENGTH)).toString("hex");
  } catch (error) {
    console.error("Error generating salt");
    throw error;
  }
};
