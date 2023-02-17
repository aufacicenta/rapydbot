import cohere from "cohere-ai";

cohere.init(process.env.COHERE_API_KEY!);

export default cohere;
