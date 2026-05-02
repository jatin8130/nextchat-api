const storageApiDocs ={
    "/storage/download": {
        post: {
            summary: "Generate signed url for download",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                        properties: {
                            path: { type: "string", example: "folder/file.ext" }
                        }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "signed url valid for 10 min" }
                                }
                            }
                        }
                    }
                },
                "401": {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "invalid token" }
                                }
                            }
                        }
                    }
                },
                "500": {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                },
            }
        }
    },
    "/storage/upload": {
        post: {
            summary: "Generate signed url for download",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                        properties: {
                            path: { type: "string", example: "folder/file.ext" },
                            type: {type: 'string', example: "image/pmg"},
                            status: {type: "string", example: "private | public-read"}
                        }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "signed url valid for 10 min" }
                                }
                            }
                        }
                    }
                },
                "401": {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "invalid token" }
                                }
                            }
                        }
                    }
                },
                "500": {
                    description: "Error",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string" }
                                }
                            }
                        }
                    }
                },
            }
        }
    },
}

export default storageApiDocs