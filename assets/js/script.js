var actualFolderPath = "root";
var actualFolder = root2;
var prevFolder = actualFolder;

// Recovering commands history from localStorage, if there is no stored commands creates new variables
if (localStorage.getItem("comndHistory") != null) {
    var comndHistory = JSON.parse(localStorage.getItem("comndHistory"));
    var pastComnd = comndHistory.length;
} else {
    var comndHistory = [];
    var pastComnd = 0;
}

$("#terminal__input").keydown(userAction);

// When the user press Tab, Enter, Down Arrow or Up Arrow
function userAction() {
    // Tab key event to autocomplete the folder/archive name
    if (event.key == "Tab") {
        event.preventDefault();
        var splitComplete = $("#terminal__input").val().split(" ");
        if (splitComplete.length > 1) {
            var autoComplete = splitComplete[splitComplete.length-1];
            let file = actualFolder.content.filter(({name})=> name.includes(autoComplete));
            console.log(file);
            if (file.length == 1) {
                splitComplete[splitComplete.length-1] = file[0].name;
                splitComplete = splitComplete.join(" ");
                $("#terminal__input").val(splitComplete);
            } else if (file.length > 1) {
                $(file).each((_, e) => {
                    console.log(e);
                    $(".main__terminal__input").append(`<span>${e.name}</span>`);
            })
        }
    }
}
    // Up arrow key event to recover last commands
    if (event.key == "ArrowUp") {
        event.preventDefault();
        if (pastComnd > 0) pastComnd--;
        $("#terminal__input").val(comndHistory[pastComnd]);
    }
    // Down arrow key event to recover last commands
    if (event.key == "ArrowDown") {
        event.preventDefault();
        if (pastComnd < comndHistory.length -1) pastComnd++;
        $("#terminal__input").val(comndHistory[pastComnd]);
    }
    // Enter key event to send a command
    if (event.key == "Enter") {
        // Printing the command on the terminal
        $("#terminal__output").append($("<p>").text(actualFolderPath + " $ " + $("#terminal__input").val()));
        // Saving command on commands history (localStorage)
        comndHistory.push($("#terminal__input").val());
        localStorage.setItem("comndHistory", JSON.stringify(comndHistory));
        // Splitting the command for evaluation on Switch
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
                    echo(input[1], input[2]);
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
                // Manual command
                case "man":
                    {
                        switch (input[1])
                        {
                            case "pwd":
                                $("#terminal__output").append($("<p class='title-man'>" + "NAME" + "</p>" + "<span class='man-des'>" + "pwd - Print name of current/working directory" + "</span>"))
                                .append($("<p class='title-man'>" + "SYNOPSIS" + "</p>"+ "<span class='synopsis-t'>"+" pwd" +"</span>" + "<span class='man-des'>" + " [" + "<span class='synopsis-s'>"+"OPTION" + "</span>" + "]..." + "</span>"))
                                .append($("<p class='title-man'>" + "DESCRIPTION" + "</p>"+ "<span class='man-des'>"+"Print the full filename of the current working directory." + "</span>"))

                            break;
                            case "ls":
                                $("#terminal__output").append($("<p class='title-man'>" + "NAME" + "</p>" + "<span class='man-des'>" + "ls - List directory contents" + "</span>"))
                                .append($("<p class='title-man'>" + "SYNOPSIS" + "</p>"+ "<span class='synopsis-t'>"+" ls" +"</span>" + "<span class='man-des'>" + " [" + "<span class='synopsis-s'>"+"OPTION" + "</span>" + "]... [" + "<span class='synopsis-s'>"+"FILE"+"</span>" + "]..." + "</span>"))
                                .append($("<p class='title-man'>" + "DESCRIPTION" + "</p>"+ "<span class='man-des2'>"+"List  information  about  the FILEs (the current directory by default)."+ "</span>" +  "<span class='man-des2'>"+ "Mandatory arguments to long options are mandatory for short options too." + "</span>"))
                                .append($("<p class='title-man'>" + "OPTIONS" + "</p>"
                                + "<span class='synopsis-t'>"+" -R" +"</span>" + "<span class='man-des'>"+ "List subdirectories recursively." + "</span>" + "<br>"
                                + "<span class='synopsis-t'>"+" -S" +"</span>" + "<span class='man-des'>"+ "Sort by file size, largest first." + "</span>" + "<br>"
                                + "<span class='synopsis-t'>"+" -t" +"</span>" + "<span class='man-des'>"+ "Sort by modification time, newest first." + "</span>"))
                            break;
                            case "cd":
                                $("#terminal__output").append($("<p class='title-man'>" + "NAME" + "</p>" + "<span class='man-des'>" + "cd - Change the directory/folder of the terminal's shell." + "</span>"))
                                .append($("<p class='title-man'>" + "SYNOPSIS" + "</p>"+ "<span class='synopsis-t'>"+" pwd" +"</span>" + "<span class='man-des'>" + " [" + "<span class='synopsis-s'>"+"DIRECTORY" + "</span>" + "]..." + "</span>"))
                                .append($("<p class='title-man'>" + "DESCRIPTION" + "</p>"+ "<span class='man-des'>"+"Change the current working directory." + "</span>"))
                                .append($("<p class='title-man'>" + "OPTIONS" + "</p>"
                                + "<span class='synopsis-t'>"+" .." +"</span>" + "<span class='man-des'>"+ "Change to parent directory." + "</span>" ))
                            break;
                            case "mkdir":
                                $("#terminal__output").append($("<p class='title-man'>" + "NAME" + "</p>" + "<span class='man-des'>" + "mkdir - Make directories." + "</span>"))
                                .append($("<p class='title-man'>" + "SYNOPSIS" + "</p>"+ "<span class='synopsis-t'>"+" mkdir" +"</span>" + "<span class='man-des'>" + " [" + "<span class='synopsis-s'>"+"OPTION" + "</span>" + "]... " + "<span class='synopsis-s'>" + "DIRECTORY" + "</span>"+ "..." + "</span>"))
                                .append($("<p class='title-man'>" + "DESCRIPTION" + "</p>"+ "<span class='man-des'>"+"Print the full filename of the current working directory." + "</span>"))
                            break;
                            case "echo":
                                $("#terminal__output").append($("<p class='title-man'>" + "NAME" + "</p>" + "<span class='man-des'>" + "echo - Display a line of text." + "</span>"))
                                .append($("<p class='title-man'>" + "SYNOPSIS" + "</p>"+ "<span class='synopsis-t'>"+" echo" +"</span>" + "<span class='man-des'>" + " [" + "<span class='synopsis-s'>"+"OPTION" + "</span>" + "]... [" + "<span class='synopsis-s'>"+"STRING"+"</span>" + "]..." + "</span>"))
                                .append($("<p class='title-man'>" + "DESCRIPTION" + "</p>"+ "<span class='man-des'>"+"Echo the STRING(s) to standard output." + "</span>"))
                            break;
                            case "cat":
                                $("#terminal__output").append($("<p class='title-man'>" + "NAME" + "</p>" + "<span class='man-des'>" + "cat - Concatenate files and print on the standard output." + "</span>"))
                                .append($("<p class='title-man'>" + "SYNOPSIS" + "</p>"+ "<span class='synopsis-t'>"+" cat" +"</span>" + "<span class='man-des'>" + " [" + "<span class='synopsis-s'>"+"OPTION" + "</span>" + "]... [" + "<span class='synopsis-s'>"+"FILE"+"</span>" + "]..." + "</span>"))
                                .append($("<p class='title-man'>" + "DESCRIPTION" + "</p>"+ "<span class='man-des'>"+"Concatenate FILE(s) to standard output." + "</span>"))
                            break;
                            case "rm":
                                $("#terminal__output").append($("<p class='title-man'>" + "NAME" + "</p>" + "<span class='man-des'>" + "rm - Remove files or directories." + "</span>"))
                                .append($("<p class='title-man'>" + "SYNOPSIS" + "</p>"+ "<span class='synopsis-t'>"+" rm" +"</span>" + "<span class='man-des'>" + " [" + "<span class='synopsis-s'>"+"OPTION" + "</span>" + "]... [" + "<span class='synopsis-s'>"+"FILE"+"</span>" + "]..." + "</span>"))
                                .append($("<p class='title-man'>" + "DESCRIPTION" + "</p>"+ "<span class='man-des'>"+"Removes each specified file but does not remove directories." + "</span>"))
                            break;
                            case "mv":
                                $("#terminal__output").append($("<p class='title-man'>" + "NAME" + "</p>" + "<span class='man-des'>" + "mv - Move (rename) files." + "</span>"))
                                .append($("<p class='title-man'>" + "SYNOPSIS" + "</p>"+ "<span class='synopsis-t'>"+" mkdir" +"</span>" + "<span class='man-des'>" + " [" + "<span class='synopsis-s'>"+"OPTION" + "</span>" + "]... " + "<span class='synopsis-s'>" + "DIRECTORY" + "</span>"+ "..." + "</span>"))
                                .append($("<p class='title-man'>" + "DESCRIPTION" + "</p>"+ "<span class='man-des'>"+"Print the full filename of the current working directory." + "</span>"))
                            break;
                        }
                    }
                break;
                default:
                    $("#terminal__output").append($(`<p class="error">Wrong command, please use <b class="error">help</b> for a list of options<p>`))
        }
        $('#terminal__input').val("");
        $(".main__display__input span").text(actualFolderPath + " $ ");
        pastComnd = comndHistory.length;
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
            $("#terminal__output").append($("<p>").text("Folder does not exist").addClass("error"));
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
    }
    else if(parameter === "-R"){
        //We call the function which will be called recursively
        fileWalker(folder);
    }
    else if(parameter === "-t"){
        folder.content.sort((a,b) => {
            return a.date - b.date;
        })
        $(folder.content).each((_, e)=>{
            $("#terminal__output").append($(`<p><span>${e.name}</span> <span>${e.date}</span></p>`));
        })
    }
    else{
        $(folder.content).each((_, e)=>{
            $("#terminal__output").append($(`<p>${e.name}</p>`));
        })
    }
}

function fileWalker(folder){
    $(folder.content).each((_, e)=>{
        if(e.type === "folder"){
            //If we find a folder, then we perform a recursive call
            $("#terminal__output").append($(`<p>./${e.name}:</p>`));
            fileWalker(e);
        }
        else{
            $("#terminal__output").append($(`<span>${e.name}</span>`));
        }
    })
    // $("#terminal__output").append($("<br>"));
}

function mkdir(newFolderName){
    let newFolder = {"type":"folder","name":newFolderName,"pwd":actualFolderPath+"/","content":[]}
    actualFolder.content.push(newFolder);
}

function echo(name, fill){
    fill ? content = fill : content = "";

    let newFile = {"type":"archive","name":name,"pwd":actualFolderPath+"/","content":content}
    actualFolder.content.push(newFile);
}

function cat(fileName) {
    let file = actualFolder.content.find( ({name} ) => name === fileName);
    if (file) {
        $("#terminal__output").append($(`<p>${file.content}</p>`));
    } else {
        $("#terminal__output").append($("<p>").text(fileName+" does not exist").addClass("error"));
    }
}

function rm(file) {

    let index;
    $(actualFolder.content).each((i, element)=>{
        if (element.name == file) {
            index = i;
        }
    });

    if (index > -1) {
        actualFolder.content.splice(index, 1);
    }else{
        $("#terminal__output").append($(`<p class='error'>rm: ${file}: no such file or directory<p>`));
    };

    // localStorage.setItem("root", JSON.stringify(storage));
}

function mv(fileName, location){

    let folders = actualFolder.content.filter(e=> e.type === "folder");
    let foldersNames = folders.map(e=> e.name);
    let file = actualFolder.content.find(({name}) => name === fileName);
    let prevFolder = searchPrevFolder(actualFolder);
    let path = location.split("/");

    if(foldersNames.includes(path[0])){
        if(path.length === 1){
            $(folders).each((_, e)=>{
                if(e.name === path[0]){
                    e.content.push(file);
                    rm(file.name);
                }
            })
        } else{
            let returnFolder = actualFolder;
            $(path).each((i, e)=>{
                folders = actualFolder.content.filter(e=> e.type === "folder");
                $(folders).each((i2, folder)=>{
                    if(folder.name === e && (i+1 < path.length)){
                    // if(folder.name === e){
                        actualFolder = folder;
                    }else{
                        folder.content.push(file);
                        actualFolder = returnFolder;
                        rm(file.name);
                    }
                })
            })
        }
    }else if(path[0] === ".."){
        if(path.length === 1){
            prevFolder.content.push(file);
            rm(file.name);
        }else{
            let returnFolder = actualFolder;
            $(path).each((i, e)=>{
                if(e === ".."){
                    actualFolder = prevFolder;
                    prevFolder = searchPrevFolder(actualFolder);
                }else{
                    folders = actualFolder.content.filter(e=> e.type === "folder");
                    $(folders).each((i2, folder)=>{
                        if(folder.name === e && (i+1 < path.length)){
                            actualFolder = folder;
                        }else if(i+1 === path.length){
                            folder.content.push(file);
                            actualFolder = returnFolder;
                            console.log("before rm", i)
                            rm(file.name);
                        }
                    })
                }
            })
        }
    }

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
        for (let i = 1; i < splitPath.length-1; i++) {
            searchPrev = searchPrev.content.find( ({ name }) => name === splitPath[i]);
        }
    }
    return searchPrev;
}
