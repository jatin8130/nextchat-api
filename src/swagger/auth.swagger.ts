const Authapidocs = {
    "/auth/signup": {
        post: {
            summary: "Register a new user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                email: { type: "string" },
                                mobile: { type: "string"},
                                password: { type: "string" }
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
                                    message: { type: "string", example: "signup success" }
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
    "/auth/login": {
        post: {
            summary: "sign in a user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string" },
                                password: { type: "string" }
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
                                    message: { type: "string", example: "login success" },
                                    accessToken: { type: "string", example: "Valid for 10 minutw http only mode"},
                                    refreshToken: { type: "string", example: "Valid for 7 days http only mode"}
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
    "/auth/logout": {
        post: {
            summary: "logout user",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "logout success" },
                                    accessToken: { type: "string", example: "Auto removed from"},
                                    refreshToken: { type: "string", example: "Auto removed from"}
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
    "/auth/refresh-token": {
        get: {
            summary: "getting new access and refresh token",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refreshtoken: { type: "sent from http only cookie" }
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
                                    message: { type: "string", example: "token refreshed" },
                                    accessToken: { type: "string", example: "Valid for 10 minutw http only mode"},
                                    refreshToken: { type: "string", example: "Valid for 7 days http only mode"}
                                }
                            }
                        }
                    }
                },
                "401": {
                    description: "failed",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "failed to refreshed token" }
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
    "/auth/session": {
        get: {
            summary: "getting user info from token",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                refreshtoken: { type: "sent automatically from http only cookie" }
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
                                    id: { type: "string" },
                                    email: { type: "string" },
                                    name: { type: "string" },
                                    mobile: { type: "string" },
                                    image: { type: "string" },
                                }
                            }
                        }
                    }
                },
                "401": {
                    description: "failed",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "invalid session" }
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
    "/auth/profile-picture": {
        put: {
            summary: "update img url",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                accesstoken: { type: "sent automatically from http only cookie" },
                                image: {type: "string"}
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
                                    image: { type: "string" }
                                }
                            }
                        }
                    }
                },
                "401": {
                    description: "failed",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "invalid session" }
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

export default Authapidocs;