import { Request, Response } from "express"
import { TryError, CatchError } from "../util/error"
import { downloadObject, uploadObject } from "../util/s3"

// download file
export const downloadFile = async (req: Request, res: Response) => {
    try {
        const path = req.body?.path

        if(!path)
            throw TryError("failed to generate download url, Path is missing", 400)

        const url = await downloadObject(path)

        res.status(200).json({url})
    }
    catch (err: unknown)
    {
        CatchError(err, res)
    }
}

// upload file
export const uploadFile = async (req: Request, res: Response) => {
    try {
        const path = req.body?.path
        const type = req.body?.type
        const status = req.body?.status

        if(!path || !type || !status)
            throw TryError("Invalid request path or type is required", 400)

        const url = await uploadObject(path, type, 600, status)

        res.status(200).json({url})
    }
    catch (err)
    {
        CatchError(err, res)
    }
}