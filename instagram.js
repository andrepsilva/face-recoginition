const axios = require("axios")

// Main Class
const Instagram = class 
{
    constructor(dump_photos_from_name, dump_followers_photos_from_name)
    {
        this.dump_photos_from_name = dump_photos_from_name
        this.dump_followers_photos_from_name = dump_followers_photos_from_name
    }
}

// Scraper
async function Scraper(nick)
{   
    // load data with json in homepage
    const data = await axios(`https://instagram.com/${nick}/?__a=1`).then(data => data.data)
    const Name = data.graphql.user.full_name
    const Edges = data.graphql.user.edge_owner_to_timeline_media.edges
    const Medias = []
    
    // map egde in edges and append'n  media
    for (x in Edges )
    {
        if (Edges[x].node.__typename == "GraphImage")
        {
            Medias.push(Edges[x].node.display_url)
        }
    }

    return {"Name":Name, "Medias":Medias}
}



Instagram.dump_photos_from_name = Scraper
//
module.exports = Instagram