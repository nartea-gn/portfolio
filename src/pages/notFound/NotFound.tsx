import { Mail, Linkedin } from "lucide-react";
import ActionLinks, {
  type ActionLinkItem,
} from "../../components/actionLinks/ActionLinks";

const LINKS: Readonly<ActionLinkItem[]> = [
  {
    href: "mailto:nacheva.g96@gmail.com",
    label: "Contáctame",
    aria: "Go to contact section",
    icon: <Mail className="size-4" aria-hidden />,
    external: false,
    variant: "primary",
  },
  {
    href: "https://www.linkedin.com/in/tu-usuario",
    label: "LinkedIn",
    aria: "Open LinkedIn profile",
    icon: <Linkedin className="size-4" aria-hidden />,
    external: true,
    variant: "secondary",
  },
];

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#0d1117] text-[#c9d1d9] p-6 text-center">
      {/* Title */}
      <h1 className="text-4xl font-bold text-[#58a6ff] mb-4">
        404 – Page not found
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 mb-6 max-w-md">
        Sorry, the page you are looking for doesn’t exist or might be
        temporarily unavailable.
      </p>

      {/* Back to home */}
      <a
        href="/"
        className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition"
      >
        ⬅ Back to Home
      </a>

      {/* Contact section */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Need help?</h2>
        <p className="text-gray-400 mb-5">
          If this problem persists, you can contact me directly:
        </p>

        {/* ActionLinks renderiza tus botones (mail + LinkedIn) */}
        <ActionLinks links={LINKS} />
      </section>
    </div>
  );
}
