export const categories = [
  {
    name: "design-art",
    description:
      "Art commissions, company logos, website wireframes and much more!",
  },
  {
    name: "sales-marketing",
    description:
      "All of your 'smarketing' needs from advertisements to branding!",
  },
  {
    name: "business-finance",
    description:
      "Your business is your passion. Outsource smaller tasks so you can focus on growth!",
  },
  {
    name: "writing-translation",
    description:
      "Have your way with words. Get copy, translation & editorial work from freelancers!",
  },
  {
    name: "video-animation",
    description:
      "Tell your story however you like with custom video & animation services!",
  },
  {
    name: "audio-music",
    description:
      "Let the world hear your message through music, audio & voice services!",
  },
  {
    name: "programming-tech",
    description:
      "Get all of your techical needs from website and app development to automation!",
  },
  {
    name: "engineering-architecture",
    description:
      "Drafting, 3D models, floorplans, interior design, and much more!",
  },
  {
    name: "education-training",
    description:
      "Want some help learning? Get training videos and one-on-one help for whatever you need!",
  },
];

const getCategoriesKeyValue = () => {
    let categoriesObject = {};
    categories.forEach((category) => {
        categoriesObject[category.name] = category.description;
    });
    return categoriesObject;
}

export const categoriesKeyValue = getCategoriesKeyValue();