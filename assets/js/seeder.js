var root2 = {
        "name": "root",
        "type": "folder",
        "pwd": "/",
        "content": [
            {
                "type": "archive",
                "name": "readme.txt",
                "pwd": "root/",
                "content": "I am a text inside readme.txt"
            },
            {
                "type": "folder",
                "name": "src",
                "pwd": "root/",
                "content": [
                    {
                        "type": "archive",
                        "name": "log.txt",
                        "pwd": "root/src/"
                    },
                    {
                        "type": "folder",
                        "name": "imgs",
                        "pwd": "root/src/",
                        "content": [
                            {
                                "type": "folder",
                                "name": "beach",
                                "pwd": "root/src/imgs/",
                                "content": [
                                    {
                                        "type": "folder",
                                        "name": "barceloneta",
                                        "pwd": "root/src/imgs/beach/",
                                        "content": []
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
}
/*
var root = {
        "type": "folder",
        "pwd": "",
        "content":{
            "readme.txt": {
                "type": "archive",
                "name": "readme.txt",
                "pwd": "root/",
                "content": "I am a text on readme.txt"
            },
            "src":{
                "type": "folder",
                "name": "src",
                "pwd": "root/",
                "content": {
                    "log.text":{
                        "type": "archive",
                        "name": "log.txt",
                        "pwd": "root/src"
                    },
                    "imgs":{
                        "type": "folder",
                        "name": "imgs",
                        "pwd": "root/src/",
                        "content": {}
                    }
                }
            }
        }
    }
    */