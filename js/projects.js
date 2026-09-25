// Ozan Builder - Proje Yönetimi

const ProjectManager = {

  storageKey: "ozan_builder_projects",

  getProjects() {

    const saved =
      localStorage.getItem(this.storageKey);

    if (!saved) {

      // Eski sistemde kayıtlı tek proje varsa
      // yeni sisteme taşı
      const oldProject =
        localStorage.getItem("ozan_builder_project");

      if (oldProject) {

        try {

          const project =
            JSON.parse(oldProject);

          const projects = [project];

          localStorage.setItem(
            this.storageKey,
            JSON.stringify(projects)
          );

          return projects;

        } catch (error) {

          console.error(
            "Eski proje taşınamadı:",
            error
          );

        }

      }

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


  getProject(id) {

    const projects =
      this.getProjects();

    if (!id) {

      return projects.length
        ? projects[projects.length - 1]
        : null;

    }

    return projects.find(
      project => project.id === id
    ) || null;

  },


  saveProject(project) {

    const projects =
      this.getProjects();

    const index =
      projects.findIndex(
        item => item.id === project.id
      );

    if (index >= 0) {

      projects[index] = {
        ...projects[index],
        ...project,
        updatedAt:
          new Date().toISOString()
      };

    } else {

      projects.push({
        ...project,
        id:
          project.id ||
          Date.now().toString(),
        createdAt:
          project.createdAt ||
          new Date().toISOString(),
        updatedAt:
          new Date().toISOString()
      });

    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(projects)
    );

    return true;

  },


  deleteProject(id) {

    const projects =
      this.getProjects();

    const filtered =
      projects.filter(
        project => project.id !== id
      );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(filtered)
    );

  },


  hasProjects() {

    return this.getProjects().length > 0;

  }

};

window.ProjectManager =
  ProjectManager;
