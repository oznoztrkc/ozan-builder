// Ozan Builder - Proje Yönetim Sistemi

const ProjectManager = {

  storageKey: "ozan_builder_projects",
  currentKey: "ozan_builder_current_project",

  // --------------------------------------------------
  // TÜM PROJELERİ GETİR
  // --------------------------------------------------

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


  // --------------------------------------------------
  // TÜM PROJELERİ KAYDET
  // --------------------------------------------------

  saveProjects(projects) {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(projects)
    );

  },


  // --------------------------------------------------
  // YENİ PROJE OLUŞTUR
  // --------------------------------------------------

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

    projects.push(
      newProject
    );

    this.saveProjects(
      projects
    );

    this.setCurrentProject(
      newProject.id
    );

    return newProject;

  },


  // --------------------------------------------------
  // AKTİF PROJE ID
  // --------------------------------------------------

  setCurrentProject(id) {

    localStorage.setItem(
      this.currentKey,
      String(id)
    );

  },


  // --------------------------------------------------
  // AKTİF PROJEYİ GETİR
  // --------------------------------------------------

  getCurrentProject() {

    const currentId =
      localStorage.getItem(
        this.currentKey
      );

    const projects =
      this.getProjects();

    if (currentId) {

      const project =
        projects.find(
          function(item) {

            return String(item.id) ===
              String(currentId);

          }
        );

      if (project) {

        return project;

      }

    }

    // Eski tek proje sisteminden
    // kalan veriyi de destekle

    const oldProject =
      localStorage.getItem(
        "ozan_builder_project"
      );

    if (oldProject) {

      try {

        const parsed =
          JSON.parse(oldProject);

        if (parsed) {

          return this.createProject(
            parsed
          );

        }

      } catch (error) {

        console.error(
          "Eski proje okunamadı:",
          error
        );

      }

    }

    return null;

  },


  // --------------------------------------------------
  // ESKİ SİSTEMLE UYUMLULUK
  // --------------------------------------------------

  getProject() {

    return this.getCurrentProject();

  },


  // --------------------------------------------------
  // PROJE GÜNCELLE
  // --------------------------------------------------

  updateProject(project) {

    if (!project || !project.id) {

      return false;

    }

    const projects =
      this.getProjects();

    const index =
      projects.findIndex(
        function(item) {

          return String(item.id) ===
            String(project.id);

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

    this.saveProjects(
      projects
    );

    this.setCurrentProject(
      project.id
    );

    return true;

  },


  // --------------------------------------------------
  // PROJEYİ SİL
  // --------------------------------------------------

  deleteProject(id) {

    const projects =
      this.getProjects();

    const filtered =
      projects.filter(
        function(project) {

          return String(project.id) !==
            String(id);

        }
      );

    this.saveProjects(
      filtered
    );

    const currentId =
      localStorage.getItem(
        this.currentKey
      );

    if (
      currentId &&
      String(currentId) ===
      String(id)
    ) {

      localStorage.removeItem(
        this.currentKey
      );

    }

  },


  // --------------------------------------------------
  // PROJE VAR MI?
  // --------------------------------------------------

  hasProject() {

    return this.getCurrentProject() !== null;

  }

};


// GLOBAL OLARAK ERİŞİLEBİLİR YAP

window.ProjectManager =
  ProjectManager;
