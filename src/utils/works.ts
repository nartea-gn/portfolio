// Minimal models and registry for works
export type MediaKind = "image" | "video";

export type MediaItem = {
  id: string;
  type: MediaKind;
  src: string; // Image or video URL/path
  alt?: string; // For images (required ideally)
  caption?: string;
  width?: number;
  height?: number;
  poster?: string; // For videos
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
};

export type Work = {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  items: MediaItem[];
};

// Example data. Add/modify freely.
export const worksRegistry: Record<string, Work> = {
  blender: {
    slug: "blender",
    title: "Blender",
    description: "Modelado, Texturizado y Renders",
    items: [
      {
        id: "B_0002",
        type: "image",
        src: "blender/img/B_0002.png",
        width: 1920,
        height: 1080,
      },
      {
        id: "B_0003",
        type: "image",
        src: "blender/img/B_0003.png",
        width: 1920,
        height: 1080,
      },
      {
        id: "B_0004",
        type: "image",
        src: "blender/img/B_0004.png",
        width: 1920,
        height: 1080,
      },
      {
        id: "B_0005",
        type: "image",
        src: "blender/img/B_0005.png",
        width: 1920,
        height: 1080,
      },
      {
        id: "B_0006",
        type: "image",
        src: "blender/img/B_0006.png",
        width: 1920,
        height: 1080,
      },
      {
        id: "B_0007",
        type: "image",
        src: "blender/img/B_0007.jpg",
        width: 1920,
        height: 1080,
      },
      {
        id: "B_0008",
        type: "image",
        src: "blender/img/B_0008.png",
        width: 1920,
        height: 1080,
      },
      {
        id: "B_0009",
        type: "image",
        src: "blender/img/B_0009.jpg",
        width: 1920,
        height: 1080,
      },
      {
        id: "B_0010",
        type: "image",
        src: "blender/img/B_0010.jpg",
        width: 1920,
        height: 1080,
      },
      {
        id: "B_0001",
        type: "video",
        src: "blender/video/B_0001.mp4",
        controls: true,
        muted: true,
        loop: false,
        preload: "metadata",
      },
      {
        id: "B_0011",
        type: "video",
        src: "blender/video/B_0011.mp4",
        controls: true,
        muted: true,
        loop: false,
        preload: "metadata",
      },
      {
        id: "B_0012",
        type: "video",
        src: "blender/video/B_0012.mp4",
        controls: true,
        muted: true,
        loop: false,
        preload: "metadata",
      },
      {
        id: "B_0013",
        type: "video",
        src: "blender/video/B_0013.mp4",
        controls: true,
        muted: true,
        loop: false,
        preload: "metadata",
      },
      {
        id: "B_0014",
        type: "video",
        src: "blender/video/B_0014.mp4",
        controls: true,
        muted: true,
        loop: false,
        preload: "metadata",
      },
    ],
  },

  photoshop: {
    slug: "photoshop",
    title: "Photoshop",
    items: [
      {
        id: "P_0001",
        type: "image",
        src: "photoshop/P_0001.png",
        width: 1920,
        height: 1080,
      },
      {
        id: "P_0002",
        type: "image",
        src: "photoshop/P_0002.png",
        width: 1920,
        height: 1080,
      },
      {
        id: "P_0003",
        type: "image",
        src: "photoshop/P_0003.png",
        width: 1920,
        height: 1080,
      },
      {
        id: "P_0004",
        type: "image",
        src: "photoshop/P_0004.png",
        width: 1920,
        height: 1080,
      },
    ],
  },

  "after-effects": {
    slug: "after-effects",
    title: "After Effects",
    items: [
      {
        id: "AF_0001",
        type: "video",
        src: "afterEffects/AF_0001.mp4",
        controls: true,
        muted: true,
        loop: false,
        preload: "metadata",
      },
      {
        id: "AF_0002",
        type: "video",
        src: "afterEffects/AF_0002.mp4",
        controls: true,
        muted: true,
        loop: false,
        preload: "metadata",
      },
    ],
  },
};
