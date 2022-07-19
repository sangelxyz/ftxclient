// Set keys in .env.local
// process.env.FTX_API_KEY
// FTX_API_KEY
// FTX_SECRET
// FTX_API_SERVER

const config = {
    ftxExchange : {
        api_key: process.env.NEXT_PUBLIC_FTX_API_KEY,
        api_secret: process.env.NEXT_PUBLIC_FTX_SECRET,
        api_server: process.env.NEXT_PUBLIC_FTX_API_SERVER,
        
    }

}

module.exports = config;