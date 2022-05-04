import { FaGithub, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export const TOKEN = "hashed_token";
export const PROFILEKEY = "profile_info";

export const skillList = [
  { value: "python", icon: "", label: "Python" },
  { value: "node", icon: "", label: "Node" },
  { value: "react", icon: "", label: "React" },
  { value: "javascript", icon: "", label: "Javascript" },
  { value: "sql", icon: "", label: "SQL" },
  { value: "java", icon: "", label: "Java" },
  { value: "c++", icon: "", label: "C++" },
  { value: "c", icon: "", label: "C" },
  { value: "c#", icon: "", label: "C#" },
  { value: "php", icon: "", label: "PHP" },
  { value: "ml/ai", icon: "", label: "ML/AI" },
  { value: "ui/ux", icon: "", label: "UI/UX" },
  { value: "django", icon: "", label: "Django" },
  { value: "vue", icon: "", label: "Vue" },
  { value: "angular", icon: "", label: "Angular" },
  { value: "mongodb", icon: "", label: "MongoDB" },
  { value: "firebase", icon: "", label: "Firebase" },
];

export const socialList = [
  { name: "github", icon: <FaGithub size={24} /> },
  { name: "linkedin", icon: <FaLinkedin size={24} /> },
  { name: "twitter", icon: <FaTwitter size={24} /> },
  { name: "facebook", icon: <FaFacebook size={24} /> },
];
