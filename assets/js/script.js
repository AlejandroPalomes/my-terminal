var actualFolderPath = "/";
var actualFolder = root2;
var prevFolder;
//Habria que especificar el prevFolder inicial -> lo inicializamos para que sea el actualFolder? // Sí! Creo que no hay problemas
prevFolder = actualFolder;

$("#terminal__input").keydown(userAction);

function userAction() {
    // When the user sends a command
    if (event.key == "Enter") {
        // Printing the command on the terminal
        $("#terminal__output").append($("<p>").text(actualFolderPath + " $ " + $("#terminal__input").val()));
        // Splitting the command for evaluation
        var input = $("#terminal__input").val().split(" ");

            switch (input[0]){
                case "ls":
                    ls(actualFolder);
                break
                case "cd":
                    actualFolder = cd(input[1]);
                break
                case "pwd":
                    //Print working directory
                    $("#terminal__output").append($("<p>").text(actualFolder.pwd));
                break;
                case "mkdir":
                    //Create folder
                    mkdir(input[1]);
                break;
                case "echo":
                    //Create files and with the possibility of adding text
                break;
                case "cat":
                    //Show content of a created file
                break;
                case "rm":
                    //Delete file
                break;
                case "mv":
                    //Move file or rename it
                break;
                case "clear":
                    //Clear console window
                    $("#terminal__output").empty();
                break;
                case "help":
                    //commands available
                    $("#terminal__output").append($("<p class='help-comnd'>" + "pwd" + "</p>" + "<span class='help'>" + "--Print working directory" + "</span>"))
                    .append($("<p class='help-comnd'>" + "mkdir" + "</p>" + "<span class='help'>" + "--Create new directory" + "</span>"))
                break;
        }
        $('#terminal__input').val("");
        $(".main__display__input span").text(actualFolderPath + " $ ");
    }
}

function cd(nextFolder) {
    if (nextFolder == "..") {
        actualFolder = prevFolder;
        prevFolder = searchPrevFolder(actualFolder);
    } else {
        let found = false;
        actualFolder.content.forEach((file) => {
            if (file.name == nextFolder && file.type == "folder" && !found) {
                //If the file name matches the search and it is a folder then we change directory and update current
                // actualFolder.pwd : $root/src
                // destFolder.pwd : $root/src/js
                var sub_folder;
                // do{
                //     root2.content.forEach(element => {
                //         console.log(actualFolder.pwd)
                //         // /root/src/
                //         //root2.content[1]
                //     })
                // }while(sub_folder== true)

                actualFolder = file;
                prevFolder = searchPrevFolder(file);

                found = true;
            }
        });
        if (!found) {
            $("#terminal__output").append($("<p>").text("Folder does not exist"));
        }
    }
    actualFolderPath = actualFolder.pwd+actualFolder.name;
    return actualFolder;
}

function ls(folder){
    $(folder.content).each((_, e)=>{
        $("#terminal__output").append($(`<p>${e.name}</p>`));
    })
}

function mkdir(newFolderName){
    let newFolder = {"type":"folder","name":newFolderName,"pwd":actualFolderPath+"/","content":[]}
    actualFolder.content.push(newFolder);
}

function searchPrevFolder(file){
    // Splitting the path of the actual selected folder
    var splitPath = file.pwd.split("/")
    // If the path length has 2 folders means that the previous folder is the ROOT
    if (splitPath.length <= 2) {
        searchPrev = root2;
    } else {
        searchPrev = root2;
        // Searching for the previous folder beginning by the root
        for (let i = 1; i < splitPath.length-1; i++) { //Ya funciona perfecto!! Guilherme vaya crack!
            searchPrev = searchPrev.content.find( ({ name }) => name === splitPath[i]);
        }
    }
    console.log(splitPath);
    console.log(searchPrev);
    return searchPrev;
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