// Ozan Builder - Proje Yönetimi

const ProjectManager = {

  storageKey: "ozan_builder_project",

  getProject() {
    const saved = localStorage.getItem(this.storageKey);

    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("Proje verisi okunamadı:", error);
      return null;
    }
  },

  saveProject(project) {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(project)
    );

    return true;
  },

  deleteProject() {
    localStorage.removeItem(this.storageKey);
  },

  hasProject() {
    return this.getProject() !== null;
  }

};

window.ProjectManager = ProjectManager;
