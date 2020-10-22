const fs = require('fs')
const PATH_ = "E:/Coding Projects/desktopApps/electronApps/scheduleAppJs/schedule-app/src/assignments.txt"
function addAssignment(type, subject, description, due) {
    json_assignments = fs.readFileSync(PATH_);
    assignments = JSON.parse(json_assignments);
    var d = new Date();
    time_uploaded = d.getHours().toString() + " " + d.getMinutes().toString() + " " + d.getSeconds().toString()  
    assignments.push({"type": type, "subject": subject, "description": description, "due": due, "time_uploaded": time_uploaded})
    assignments = JSON.stringify(assignments)
    fs.writeFile(PATH_, assignments, function(err){});
}
// addAssignment("assignment", "math", "ch4 ex5", "5th july")
function readAssignments(){
    json_assignments = fs.readFileSync(PATH_);
    assignments = JSON.parse(json_assignments);
    return assignments
}

function deleteAssignment(time_uploaded){
    assignments = readAssignments()
    assignments.forEach((assignment, index) => {
        if (assignment['time_uploaded'] == time_uploaded) {
            assignments.splice(index, 1)
        }
    })
    assignments = JSON.stringify(assignments)
    fs.writeFile(PATH_, assignments, function(err){}); 
}

module.exports = { addAssignment, readAssignments, deleteAssignment }
