const { readAssignments, deleteAssignment, addAssignment } = require("./functions")
// const json_interaction = require("./functions")
assignments = readAssignments()
assignments_list = document.getElementById('main_assignments_content')
exams_list = document.getElementById('main_exams_content')
tba_a = ""
tba_e = ""
assignments.forEach(element=>{
    date = element['due'].split('')
    month = parseInt((date.splice(-2)).join(''), 10)
    day = parseInt([date[0], [date[1]]].join(''), 10)
    year = 2020
    date = new Date(year, month, day)
    element['due'] = day +"."+ month
    element['date'] = month+(day/100)
    element['day'] = day

});
assignments.sort((a,b) => { return a['date'] - b['date']})
current_day = new Date().getDate();
assignments.forEach(element => {
    close = 0
    if(element['day']-current_day<=2) {
        close = 1
    }
    if (element['type'] == 'assignment') {
        time_uploaded = element['time_uploaded']
        if(close == 1) {
            tba_a = tba_a + `<tr class="has-background-danger"> 
            <td>${element['subject']}</td> 
            <td>${element['description']}</td> <td>${element['due']}</td> 
            <td><button class = "button is-success" onClick = "delete_('${time_uploaded}')">completed</button></td>
            </tr>`
        } else {
            tba_a = tba_a + `<tr> 
            <td>${element['subject']}</td> 
            <td>${element['description']}</td> <td>${element['due']}</td> 
            <td><button class = "button is-success" onClick = "delete_('${time_uploaded}')">completed</button></td>
            </tr>` 
        }
    } else if (element['type'] == 'exam') {
        time_uploaded = element['time_uploaded']
        if(close == 1) {
            tba_e = tba_e + `<tr class="has-background-danger"> 
            <td>${element['subject']}</td> 
            <td>${element['description']}</td> <td>${element['due']}</td> 
            <td><button class = "button is-success" onClick = "delete_('${time_uploaded}')">completed</button></td>
            </tr>`
        } else {
            tba_e = tba_e + `<tr> 
            <td>${element['subject']}</td> 
            <td>${element['description']}</td> <td>${element['due']}</td> 
            <td><button class = "button is-success" onClick = "delete_('${time_uploaded}')">completed</button></td>
            </tr>` 
        }
    }
});
assignments_list.innerHTML = tba_a
exams_list.innerHTML = tba_e

function delete_(time) {
    yes = confirm('u sure bro')
    if (yes) {
        deleteAssignment(time)
        location.reload()
    }
}
function add_(){
    add_div = document.getElementById('main_add_form')
    due_date = (document.getElementById('due').value).split('')
    subject = document.getElementById('subject').value
    description = document.getElementById('description').value
    is_assignment = document.getElementById('assignment').checked
    is_test = document.getElementById('test').checked
    if (is_assignment) {
        type = 'assignment'
    } else if (is_test){
        type = 'exam'
    }
    day = (due_date.splice(-2)).join('')
    month = due_date.splice(-3)
    month = [month[0], month[1]]
    month = month.join('')
    due_date = day + '.' + month
    addAssignment(type, subject, description, due_date)
    location.reload()
}
// addAssignment("assignment", "math", "ch4 ex5", "5th july")