// Ozan Builder - Editör sistemi

const OzanEditor = {

  project: null,

  init() {

    if (typeof ProjectManager === "undefined") {
      console.warn("ProjectManager henüz yüklenmedi.");
      return;
    }

    this.project = ProjectManager.getProject();

    console.log("Ozan Builder editörü hazır.");

    if (this.project) {
      console.log("Açılan proje:", this.project.name);
    }

  },

  getProject() {
    return this.project;
  },

  updateProject(data) {

    if (!this.project) {
      return false;
    }

    this.project = {
      ...this.project,
      ...data
    };

    ProjectManager.saveProject(this.project);

    return true;
  }

};

window.OzanEditor = OzanEditor;
