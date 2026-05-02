const friendApiDocs ={
    "/friend": {
        post: {
            summary: "send friend request",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                        properties: {
                            friend: { type: "string", example: "user_friend_id" }
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
                                    message: { type: "string", example: "friend request send" }
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
        },
        get: {
            summary: "fetch your friend",
            description: "Authtoken required",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                    friend: {
                                        type: "object",
                                        properties: {
                                            name: {type: "string"},
                                            email: {type: "string"},
                                            mobile: {type: "string"},
                                            image: {type: "string"},
                                        }
                                    }
                                }
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
    "/friend/{id}":{
        put: {
            summary: "accept friend request",
            parameters: {
                in: "path",
                name: "id",
                required: true,
                default: 0,
                schema: {type: "string"}
            },
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                        properties: {
                            status: { type: "string", example: "accepted" },
                            
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
                                    message: { type: "string", example: "friend request send" }
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
        },
        delete: {
            summary: "unfollow or reject friend request",
            parameters: {
                in: "path",
                name: "id",
                required: true,
                default: 0,
                schema: {type: "string"}
            },
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                        properties: {
                            id: { type: "string", example: "accepted" },                            
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
                                    message: { type: "string", example: "friend request send" }
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
        },
    },
    "/friend/suggestion":{
        get: {
            summary: "suggested friend",
            description: "Authtoken required",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                    friend: {
                                        type: "object",
                                        properties: {
                                            name: {type: "string"},
                                            email: {type: "string"},
                                            mobile: {type: "string"},
                                            image: {type: "string"},
                                        }
                                    }
                                }
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
    "/friend/request":{
        get: {
            summary: "fetch friend request received",
            description: "Authtoken required",
            responses: {
                "200": {
                    description: "Success",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                    friend: {
                                        type: "object",
                                        properties: {
                                            name: {type: "string"},
                                            email: {type: "string"},
                                            mobile: {type: "string"},
                                            image: {type: "string"},
                                        }
                                    }
                                }
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
    }
}

export default friendApiDocs