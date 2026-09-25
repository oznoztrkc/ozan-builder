// Ozan Builder - Proje Yönetimi

const ProjectManager = {

  storageKey: "ozan_builder_projects",

  currentProjectKey: "ozan_builder_current_project",


  getProjects() {

    const saved =
      localStorage.getItem(this.storageKey);

    if (!saved) {
      return [];
    }

    try {

      const projects =
        JSON.parse(saved);

      return Array.isArray(projects)
        ? projects
        : [];

    } catch (error) {

      console.error(
        "Projeler okunamadı:",
        error
      );

      return [];

    }

  },


  saveProjects(projects) {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(projects)
    );

    return true;

  },


  createProject(project) {

    const projects =
      this.getProjects();


    const newProject = {

      id:
        project.id ||
        Date.now().toString(),

      name:
        project.name ||
        "Yeni Proje",

      description:
        project.description ||
        "",

      template:
        project.template ||
        "blank",

      elements:
        project.elements ||
        [],

      createdAt:
        project.createdAt ||
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()

    };


    projects.push(newProject);


    this.saveProjects(projects);


    return newProject;

  },


  getProject(id) {

    const projects =
      this.getProjects();


    return projects.find(
      function(project) {

        return project.id === id;

      }
    ) || null;

  },


  getCurrentProject() {

    const id =
      localStorage.getItem(
        this.currentProjectKey
      );


    if (!id) {
      return null;
    }


    return this.getProject(id);

  },


  setCurrentProject(id) {

    localStorage.setItem(
      this.currentProjectKey,
      id
    );

  },


  updateProject(project) {

    if (!project || !project.id) {
      return false;
    }


    const projects =
      this.getProjects();


    const index =
      projects.findIndex(
        function(item) {

          return item.id === project.id;

        }
      );


    if (index === -1) {

      return false;

    }


    projects[index] = {

      ...projects[index],

      ...project,

      updatedAt:
        new Date().toISOString()

    };


    this.saveProjects(projects);


    return true;

  },


  deleteProject(id) {

    const projects =
      this.getProjects();


    const filtered =
      projects.filter(
        function(project) {

          return project.id !== id;

        }
      );


    this.saveProjects(filtered);


    const current =
      localStorage.getItem(
        this.currentProjectKey
      );


    if (current === id) {

      localStorage.removeItem(
        this.currentProjectKey
      );

    }

  },


  hasProjects() {

    return this.getProjects().length > 0;

  }

};


window.ProjectManager =
  ProjectManager;
