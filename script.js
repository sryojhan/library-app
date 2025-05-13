

let allProjects = [];
let projectTable = document.querySelector('#project-table');


function Project(name, desc, technology, status){

    this.name = name;
    this.desc = desc;
    this.technology = technology;
    this.status = status;

    this.id = crypto.randomUUID();
    this.element = null;
}


function AddProjectToLibrary(name, desc, technology, status){

    const project = new Project(name, desc, technology, status);



    const tablerow = document.createElement('tr');

    const createTableData = (content, status) => {
        
        let element = document.createElement('td');

        element.innerText = content;

        if(status !== undefined)
        {
            element.classList.add('status');
            element.classList.add(status);
        }
        return element;
    };

    let statusClassName = status.toLowerCase().replace(' ', '-');

    tablerow.append(createTableData(name), createTableData(desc), createTableData(technology), createTableData(status, statusClassName));


    let actionCell = document.createElement('td');
    let actionIcon = document.createElement('div');

    actionIcon.classList.add('action-icons')

    
    function addActionButton(icon, color, action){
        
        
        let button = document.createElement('i');
        
        button.classList.add('action');
        button.classList.add(color);
        button.classList.add('fa-solid');
        button.classList.add(icon);
        
        button.addEventListener('click', ()=>{
            
            action();
        });
        actionIcon.append(button);
        
        return button;
    }
    
    
    addActionButton('fa-play', "play", () => ChangeProjectStatus(project.id, 'In Progress'));
    addActionButton('fa-pause', "pause", () => ChangeProjectStatus(project.id, 'Paused') );
    addActionButton('fa-stop', "stop", () => ChangeProjectStatus(project.id, 'Pending'));
    addActionButton('fa-circle-check', "complete", () => ChangeProjectStatus(project.id, 'Completed'));
    addActionButton('fa-trash', "delete",  ()=> deleteProject(project.id));
    
    actionCell.append(actionIcon);
    
    tablerow.append(actionCell);

    projectTable.append(tablerow);


    project.element = tablerow;
    allProjects.push(project);
}




document.querySelector('#create-project').addEventListener('submit', (event) =>{

    event.preventDefault();

    const formData = new FormData(event.target);


    const name = formData.get('name');
    const desc = formData.get('desc');
    const tech = formData.get('tech');
    const status = formData.get('status');

    AddProjectToLibrary(name, desc, tech, status);

    event.target.reset();
});

function findProject(id){

    return allProjects.find((element) => element.id === id);
}

function deleteProject(id){

    const elem = findProject(id);
    projectTable.removeChild(elem.element);
    allProjects.splice(allProjects.indexOf(elem), 1);
}

function ChangeProjectStatus(id, status){
    
    const elem = findProject(id);

    elem.status = status;

    let statusElement = elem.element.querySelector('.status');

    statusElement.classList.remove('in-progress');
    statusElement.classList.remove('paused');
    statusElement.classList.remove('completed');


    let statusClassList = status.toLowerCase().replace(' ', '-');

    statusElement.classList.add(statusClassList);

    statusElement.innerText = status;
}
