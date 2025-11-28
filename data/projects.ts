export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
};

export const initialProjects: Project[] = [
  {
    id: "1",
    title: "Brigade homes",
    subtitle: "Alaska, United States, 1212",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
  },
];
