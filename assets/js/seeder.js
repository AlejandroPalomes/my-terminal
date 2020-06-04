var root2 = {
        "name": "root",
        "type": "folder",
        "pwd": "/",
        "content": [
            {
                "type": "archive",
                "name": "readme.txt",
                "pwd": "root/",
                "size": 28,
                "content": "I am a text inside readme.txt"
            },
            {
                "type": "folder",
                "name": "src",
                "pwd": "root/",
                "size": totalSize(content),
                "content": [
                    {
                        "type": "archive",
                        "name": "log.txt",
                        "size": 2000,
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
                                        "size": 30000,
                                        "content": []
                                    },
                                    {
                                        "type": "folder",
                                        "name": "masnou",
                                        "pwd": "root/src/imgs/beach/",
                                        "size": 20000,
                                        "content": []
                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
}
function totalSize(content){
    //console.log(content)
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