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
var prevFolder;
var actualFolderName = "root";
var actualFolderPath = "root";

$("#terminal__input").keydown(userAction);

function userAction() {
    // When the user sends a command
    if (event.key == "Enter") {
        // Printing the command on the terminal
        $("#terminal__output").append($("<p>").text(actualFolderPath + " $ " + $("#terminal__input").val()));
        // Splitting the command for evaluation
        var input = $("#terminal__input").val().split(" ");

        //$(input).each((_,e)=>{
            switch (input[0]){
                case "ls":
                    ls(actualFolder);
                break
                case "cd":
                    actualFolder = cd(actualFolder, input[1]);
                    console.log("cd chosen");
                break
        }
        //});
        $('#terminal__input').val("");
        $(".main__display__input span").text(actualFolderPath + " $ ");
    }
}

function cd (actualFolder, nextFolder) {
    if (nextFolder == "..") {
        actualFolder = prevFolder;
    } else {
        let loop = true;
        actualFolder.forEach((file, index) => {
            if (file.name == nextFolder && file.type == "folder" && loop) {
                console.log("changing folder", file.name, file.content);
                prevFolder = actualFolder;
                actualFolderPath = file.pwd+file.name;
                actualFolderName = file.name;
                actualFolder = file.content;
                loop = false;
            }
        });
        if (loop) {
            $("#terminal__output").append($("<p>").text("Folder does not exist"));
        }
    }
    return actualFolder;
}

function ls(folder){
    console.log(actualFolder);
    $(folder).each((_, e)=>{
        $("#terminal__output").append($(`<p>${e.name}</p>`));
    })
}

// $(document).ready(
//     function () {
//         $("input").addClass("-real-textarea");
//         //   $(".textarea-wrapper").append("<textarea class=\"hidden\"></textarea>");
//         $(".textarea-wrapper textarea.hidden").keyup(
//             function () {
//                 $(".textarea-wrapper textarea.-real-textarea").val($(this).val());
//             }
//         );
//         $(".textarea-wrapper textarea.-real-textarea").focus(
//             function () {
//                 $(this).parent().find("textarea.hidden").focus();
//             }
//         );
//     }
// )