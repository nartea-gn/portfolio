export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string; // image path
};

export const projects: Project[] = [
  {
    id: "blender",
    slug: "blender",
    title: "Blender",
    description: "Proyectos realizados en Blender",
    cover: "blender/img/cover.png",
  },
  {
    id: "photoshop",
    slug: "photoshop",
    title: "Photoshop",
    description: "Proyectos realizados con Photoshop",
    cover: "photoshop/cover.png",
  },
  {
    id: "afterEffects",
    slug: "after-effects",
    title: "After Effects",
    description: "Proyectos realizados con After Effects",
    cover: "afterEffects/cover.png",
  },
];
