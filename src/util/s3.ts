import { S3Client, GetObjectCommand, HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

type ACLType = "private" | "public-read"

//login to aws s3

export const s3conn = new S3Client({
    region: process.env.AWS_REGION!,
    endpoint: `https://s3-${process.env.AWS_REGION}.amazonaws.com`,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

//download file

export const downloadObject = async (path: string, expire: number = 60) => {
        const option = {
            Bucket: process.env.S3_BUCKET!,
            Key: path
        }

        const headcommand = new HeadObjectCommand(option)

        await s3conn.send(headcommand)

        const command = new GetObjectCommand(option)

        const url = await getSignedUrl(s3conn, command, {expiresIn: expire})
        return url
}

//upload file

export const uploadObject = async (path: string, type: string, expire: number = 60, acl: ACLType='private') => {

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: path,
            ContentType: type,
            ACL: acl
        })

        const url = await getSignedUrl(s3conn, command, { expiresIn: expire })
        return url
}