import Authapidocs from "../swagger/auth.swagger"
import friendApiDocs from "../swagger/friend.swagger"
import storageApiDocs from "../swagger/storage.swagger"

const swaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "Besties official api",
        description: "All the private and public apis listed here",
        version: "1.0.0",
        contact: {
            name: "jatin mehra",
            email: "jatin@gmail.com"
        }
    },
    servers: [
        {url: process.env.SERVER}
    ],
    paths: {
        ...Authapidocs,
        ...storageApiDocs,
        ...friendApiDocs
    }
}

export default swaggerConfig