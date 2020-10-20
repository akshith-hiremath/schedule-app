const fs = require('fs')
function addAssignment(type, subject, description, due) {
    json_assignments = fs.readFileSync('E:/Coding Projects/desktopApps/electronApps/scheduleAppJs/schedule-app/src/assignments.txt');
    assignments = JSON.parse(json_assignments);
    var d = new Date();
    time_uploaded = d.getHours().toString() + " " + d.getMinutes().toString() + " " + d.getSeconds().toString()  
    assignments.push({"type": type, "subject": subject, "description": description, "due": due, "time_uploaded": time_uploaded})
    assignments = JSON.stringify(assignments)
    fs.writeFile('E:/Coding Projects/desktopApps/electronApps/scheduleAppJs/schedule-app/src/assignments.txt', assignments, function(err){});
}
// addAssignment("assignment", "math", "ch4 ex5", "5th july")
function readAssignments(){
    json_assignments = fs.readFileSync('E:/Coding Projects/desktopApps/electronApps/scheduleAppJs/schedule-app/src/assignments.txt');
    assignments = JSON.parse(json_assignments);
    return assignments
}

function deleteAssignment(time_uploaded){
    assignments = readAssignments()
    index_of_item_to_remove = 0
    is_only_one = false
    if (assignments.length == 1) {
        is_only_one = true
    }
    assignments.forEach((assignment, index) => {
        if (assignment['time_uploaded'] == time_uploaded) {
            index_of_item_to_remove = index
        }
    })
    assignments.splice(index_of_item_to_remove, 1)
    if (is_only_one){
        assignments = []
        assignments = JSON.stringify(assignments)
        fs.writeFile('E:/Coding Projects/desktopApps/electronApps/scheduleAppJs/schedule-app/src/assignments.txt', assignments, function(err){});    
    
    } else {
        assignments = JSON.stringify(assignments)
        fs.writeFile('E:/Coding Projects/desktopApps/electronApps/scheduleAppJs/schedule-app/src/assignments.txt', assignments, function(err){});    
    }
}

module.exports = { addAssignment, readAssignments, deleteAssignment }
