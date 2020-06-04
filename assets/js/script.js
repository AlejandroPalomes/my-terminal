var root = [{
        "type": "archive",
        "name": "readme.txt",
        "pwd": "root/"
    },
    {
        "type": "folder",
        "name": "src",
        "pwd": "root/",
        "content": [{
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

$("#terminal__input").keydown(userAction);

function userAction() {
    // When the user sends a command
    if (event.key == "Enter") {
        // Printing the command on the terminal
        $("#terminal__output").append($("<p>").text(actualFolderName + " $ " + $("#terminal__input").val()));
        // Splitting the command for evaluation
        var input = $("#terminal__input").val().split(" ");
        console.log(input);

        $(input).each((_,e)=>{
            switch (e){
                case "ls":
                    //ls();
                    console.log("ls chosen")
                break
                case "cd":
                    cd(actualFolder, input[1]);
                    console.log("cd chosen")
                break
        }
        });
        $('#terminal__input').val("");
    }
}

function cd (actualFolder, nextFolder) {
    actualFolder.forEach((file, index) => {
        if (file.name == nextFolder && file.type == "folder") {
            actualFolder = actualFolder[index];
        } else {
            $("#terminal__output").append($("<p>")).text("Folder does not exist");
        }
    });
}

function ls(){
    console.log("I'm in function ls")
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