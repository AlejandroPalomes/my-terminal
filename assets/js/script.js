var root = [
    {
        "type": "archive",
        "name": "readme.txt",
        "pwd": "root/"
    },
    {
        "type": "folder",
        "name": "src",
        "pwd": "root/",
        "content": [
            {
                "type": "archive",
                "name": "log.txt",
                "pwd": "root/src"
            },
            {
                "type": "folder",
                "name": "imgs",
                "pwd": "root/src",
                "content": []
            }
        ]
    }
]

var actualFolder = root;

function cd (actualFolder, nextFolder) {
    actualFolder.forEach((file,index) => {
        if (file.name == nextFolder && file.type == "folder") {
            actualFolder = actualFolder[index];
        } else {
            console.log("Folder does not exist");
        }
    });
}