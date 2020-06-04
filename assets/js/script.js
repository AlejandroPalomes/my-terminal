var actualFolderPath = "root";
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
                    ls(actualFolder, input[1]);
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
                    cat(input[1]);
                break;
                case "rm":
                    //Delete file
                    rm(input[1]);
                break;
                case "mv":
                    //Move file or rename it
                    mv(input[1],input[2]);
                break;
                case "clear":
                    //Clear console window
                    $("#terminal__output").empty();
                break;
                case "help":
                    //commands available
                    $("#terminal__output").append($("<p class='help-comnd'>" + "pwd" + "</p>" + "<span class='help'>" + "--Print working directory" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "ls" + "</p>" + "<span class='help'>" + "--Lists contents of files and directories" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "ls -R" + "</p>" + "<span class='help'>" + "--List recursively directory tree" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "ls -S" + "</p>" + "<span class='help'>" + "--Sort by file size" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "ls -t" + "</p>" + "<span class='help'>" + "--Sort by time & date" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "cd" + "</p>" + "<span class='help'>" + "--Change directory or folder" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "cd .." + "</p>" + "<span class='help'>" + "--Change to parent directory" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "mkdir" + "</p>" + "<span class='help'>" + "--Create new directory" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "echo" + "</p>" + "<span class='help'>" + "--Create new file" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "cat" + "</p>" + "<span class='help'>" + "--Display the content of text files" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "rm" + "</p>" + "<span class='help'>" + "--Remove a file" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "mv" + "</p>" + "<span class='help'>" + "--Move files and directories" + "</span>"))
                    .append($("<br>"+"<p class='help-comnd'>" + "clear" + "</p>" + "<span class='help'>" + "--Clear console window" + "</span>"))
                break;
                default:
                    $("#terminal__output").append($(`<p class="error">Wrong command, please use <b class="error">help</b> for a list of options<p>`))
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

function ls(folder, parameter){
    if(parameter === "-S"){
        folder.content.sort((a, b)=>{
            return a.size - b.size;
        });
        $(folder.content).each((_, e)=>{
            $("#terminal__output").append($(`<p><span>${e.name}</span> <span>${e.size}kb</span></p>`));
        })
    }else{
        $(folder.content).each((_, e)=>{
            $("#terminal__output").append($(`<p>${e.name}</p>`));
        })
    }
}

function mkdir(newFolderName){
    let newFolder = {"type":"folder","name":newFolderName,"pwd":actualFolderPath+"/","content":[]}
    actualFolder.content.push(newFolder);
}

function cat(fileName) {
    let file;
    $("#terminal__output").append($(`<p>${file.content}</p>`));
}

function rm(file) {

}

function mv(moveFile,destinationFile) {

}

function searchPrevFolder(file){
    // Splitting the path of the actual selected folder
    var splitPath = file.pwd.split("/")
    // If the path length has 2 folders means that the previous folder is the ROOT. E.g root/src will give us a size 2 array ;)
    if (splitPath.length <= 2) {
        searchPrev = root2;
    } else {
        searchPrev = root2;
        // Searching for the previous folder beginning by the root
        for (let i = 1; i < splitPath.length-1; i++) { //Ya funciona perfecto!! Guilherme vaya crack! // We did It :D
            searchPrev = searchPrev.content.find( ({ name }) => name === splitPath[i]);
        }
    }
    // console.log(splitPath);
    // console.log(searchPrev);
    return searchPrev;
}