// Ozan Builder - Sağlam Proje Yönetim Sistemi

const ProjectManager = {

  storageKey: "ozan_builder_projects",

  currentProjectKey: "ozan_builder_current_project",

  legacyKey: "ozan_builder_project",


  // --------------------------------------------------
  // TÜM PROJELERİ GETİR
  // --------------------------------------------------

  getProjects() {

    let saved =
      localStorage.getItem(this.storageKey);

    let projects = [];

    if (saved) {

      try {

        projects = JSON.parse(saved);

        if (!Array.isArray(projects)) {
          projects = [];
        }

      } catch (error) {

        console.error(
          "Projeler okunamadı:",
          error
        );

        projects = [];

      }

    }


    // Eski tek proje sistemini kontrol et
    const oldProject =
      localStorage.getItem(this.legacyKey);


    if (oldProject) {

      try {

        const old =
          JSON.parse(oldProject);


        if (old && old.name) {

          const alreadyExists =
            projects.some(
              function(project) {

                return (
                  project.name === old.name
                );

              }
            );


          if (!alreadyExists) {

            const migrated = {

              id:
                old.id ||
                Date.now().toString(),

              name:
                old.name,

              description:
                old.description || "",

              template:
                old.template || "blank",

              elements:
                old.elements || [],

              createdAt:
                old.createdAt ||
                new Date().toISOString(),

              updatedAt:
                new Date().toISOString()

            };


            projects.push(migrated);


            this.saveProjects(projects);

          }

        }

      } catch (error) {

        console.error(
          "Eski proje taşınamadı:",
          error
        );

      }

    }


    return projects;

  },


  // --------------------------------------------------
  // PROJELERİ KAYDET
  // --------------------------------------------------

  saveProjects(projects) {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(projects)
    );

    return true;

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


    projects.push(newProject);

    this.saveProjects(projects);


    return newProject;

  },


  // --------------------------------------------------
  // ID İLE PROJE GETİR
  // --------------------------------------------------

  getProject(id) {

    const projects =
      this.getProjects();


    return projects.find(
      function(project) {

        return String(project.id) === String(id);

      }
    ) || null;

  },


  // --------------------------------------------------
  // AKTİF PROJEYİ GETİR
  // --------------------------------------------------

  getCurrentProject() {

    const id =
      localStorage.getItem(
        this.currentProjectKey
      );


    if (id) {

      const project =
        this.getProject(id);


      if (project) {
        return project;
      }

    }


    // Eğer aktif proje bulunamazsa
    // ilk mevcut projeyi kullan

    const projects =
      this.getProjects();


    if (projects.length > 0) {

      const first =
        projects[0];


      this.setCurrentProject(
        first.id
      );


      return first;

    }


    return null;

  },


  // --------------------------------------------------
  // AKTİF PROJEYİ AYARLA
  // --------------------------------------------------

  setCurrentProject(id) {

    localStorage.setItem(
      this.currentProjectKey,
      String(id)
    );

  },


  // --------------------------------------------------
  // PROJE GÜNCELLE
  // --------------------------------------------------

  updateProject(project) {

    if (!project) {
      return false;
    }


    // ID yoksa oluştur
    if (!project.id) {

      project.id =
        Date.now().toString();

    }


    const projects =
      this.getProjects();


    const index =
      projects.findIndex(
        function(item) {

          return (
            String(item.id) ===
            String(project.id)
          );

        }
      );


    if (index === -1) {

      projects.push({

        ...project,

        updatedAt:
          new Date().toISOString()

      });

    } else {

      projects[index] = {

        ...projects[index],

        ...project,

        updatedAt:
          new Date().toISOString()

      };

    }


    this.saveProjects(projects);


    this.setCurrentProject(
      project.id
    );


    return true;

  },


  // --------------------------------------------------
  // PROJE SİL
  // --------------------------------------------------

  deleteProject(id) {

    const projects =
      this.getProjects();


    const filtered =
      projects.filter(
        function(project) {

          return (
            String(project.id) !==
            String(id)
          );

        }
      );


    this.saveProjects(filtered);


    const current =
      localStorage.getItem(
        this.currentProjectKey
      );


    if (
      current &&
      String(current) === String(id)
    ) {

      localStorage.removeItem(
        this.currentProjectKey
      );

    }

  },


  // --------------------------------------------------
  // PROJE VAR MI?
  // --------------------------------------------------

  hasProjects() {

    return (
      this.getProjects().length > 0
    );

  }

};


window.ProjectManager =
  ProjectManager;
