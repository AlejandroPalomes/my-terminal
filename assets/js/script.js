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
var actualFolderName = "root";
var actualFolderPath = "root";

$("#terminal__input").keydown(userAction);

function userAction() {
    // When the user sends a command
    if (event.key == "Enter") {
        console.log(actualFolder)
        // Printing the command on the terminal
        $("#terminal__output").append($("<p>").text(actualFolderName + " $ " + $("#terminal__input").val()));
        // Splitting the command for evaluation
        var input = $("#terminal__input").val().split(" ");

        //$(input).each((_,e)=>{
            switch (input[0]){
                case "ls":
                    console.log(actualFolder)
                    ls(actualFolder);
                break
                case "cd":
                    cd(actualFolder, input[1]);
                    console.log("cd chosen")
                break
        }
        //});
        $('#terminal__input').val("");
        $(".main__display__input span").text(actualFolderPath + " $ ");
    }
}

function cd (actualFolder, nextFolder) {
    console.log("entered cd function")
    let loop = true;
    actualFolder.forEach((file, index) => {
        if (file.name == nextFolder && file.type == "folder" && loop) {
            console.log("changing folder", file.name, file.content);
            actualFolderPath = file.pwd+file.name;
            actualFolderName = file.name;
            actualFolder = file.content;
            loop = false;
            console.log(actualFolder)
        } else if (loop && index+1 == actualFolder.length){
            $("#terminal__output").append($("<p>").text("Folder does not exist"));
        }
    });
}

function ls(folder){
    console.log(folder);
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