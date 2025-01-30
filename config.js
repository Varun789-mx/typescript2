const config = { 
    PORT : process.env.port || 5000,
    DB_URL : process.env.MONGOOSE_URI || "mongodb+srv://varun153:varun123@cluster0.r8d8y.mongodb.net/",
    JWT_SECRET : process.env.JWT_SECRET || "Harsh@057",
}

export default config;