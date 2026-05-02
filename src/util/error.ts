import { Response } from "express";

interface ErrorMessage extends Error {
  status?: number;
  code?: number;
  errors?: Record<string, any>;
  keyValue?: Record<string, any>;
  $metadata?: {
    httpStatusCode?: number;
  };
}

export const TryError = (message: string, status: number = 500): ErrorMessage => {
  const err = new Error(message) as ErrorMessage;
  err.status = status;
  return err;
};

export const CatchError = (
  err: unknown,
  res: Response,
  customMessage?: string
) => {
  const isDev = process.env.NODE_ENV === "dev";

  const sendError = (status: number, message: string, error?: unknown) => {
    return res.status(status).json({
      success: false,
      message,
      ...(isDev && {
        error,
        stack: err instanceof Error ? err.stack : null,
      }),
    });
  };

  // ---------- CUSTOM MESSAGE OVERRIDE ----------
  if (customMessage) {
    return sendError(500, customMessage, err);
  }

  // ---------- STRING ERROR ----------
  if (typeof err === "string") {
    return sendError(500, err);
  }

  // ---------- AWS / S3 ----------
  const anyErr = err as any;

  if (anyErr?.$metadata?.httpStatusCode || anyErr?.statusCode) {
    return sendError(
      anyErr.$metadata?.httpStatusCode || anyErr.statusCode,
      anyErr.name || "AWS Error",
      err
    );
  }

  // ---------- Mongo Duplicate ----------
  if (anyErr?.code === 11000) {
    const field = Object.keys(anyErr.keyValue || {})[0];

    return sendError(
      409,
      `${field || "Field"} already exists`,
      err
    );
  }

  // ---------- Validation ----------
  if (anyErr?.errors) {
    const messages = Object.values(anyErr.errors).map(
      (e: any) => e.message
    );

    return sendError(400, messages.join(", "), err);
  }

  // ---------- JWT ----------
  if (err instanceof Error) {
    if (err.name === "JsonWebTokenError") {
      return sendError(401, "Invalid token", err);
    }

    if (err.name === "TokenExpiredError") {
      return sendError(401, "Session expired, please login again", err);
    }
  }

  // ---------- Custom App Error ----------
  if (err instanceof Error) {
    const e = err as ErrorMessage;

    return sendError(
      e.status ?? 500,
      e.message || "Internal server error",
      err
    );
  }

  return sendError(500, "Internal server error", err);
};