var rootSeeder = {
        "name": "root",
        "type": "folder",
        "pwd": "/",
        "content": [
            {
                "type": "archive",
                "name": "readme.txt",
                "pwd": "root/",
                "size": 28,
                "date": "1999/10/23",
                "content": "I am a text inside readme.txt"
            },
            {
                "type": "js",
                "name": "calculator.js",
                "pwd": "root/",
                "size": 28,
                "date": "1999/10/28",
                "pathJS": "assets/js/calculator.js"
            },
            {
                "type": "js",
                "name": "myScript.js",
                "pwd": "root/",
                "size": 28,
                "date": "1999/10/18",
                "content": 'function haha()){return 3+3}; haha()',
            },
            {
                "type": "folder",
                "name": "src",
                "pwd": "root/",
                // "size": totalSize(content),
                "content": [
                    {
                        "type": "archive",
                        "name": "log1.txt",
                        "content": "10/Jun/2019 - Macintosh 128k login - status: ok",
                        "size": 2000,
                        "date": "1999/10/22",
                        "pwd": "root/src/"
                    },
                    {
                        "type": "folder",
                        "name": "spam",
                        "pwd": "root/src/",
                        "content": [
                            {
                                "type": "folder",
                                "name": "mountain",
                                "pwd": "root/src/spam/",
                                "content": [
                                    {
                                        "type": "folder",
                                        "name": "Pirinees",
                                        "pwd": "root/src/spam/mountain/",
                                        "size": 30000,
                                        "date": "1999/10/24",
                                        "content": []
                                    },
                                    {
                                        "type": "folder",
                                        "name": "Balcans",
                                        "pwd": "root/src/spam/mountain/",
                                        "size": 20000,
                                        "content": []
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        "type": "archive",
                        "name": "log2.txt",
                        "content": "10/Jun/2019 - Siemens A52 login - status: error",
                        "size": 2000,
                        "date": "1999/10/21",
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
                                        "date": "1999/10/24",
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