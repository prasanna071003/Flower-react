import { usePageEffects } from "../hooks/usePageEffects";
import SEO from "../components/SEO";

export default function Extra() {
  usePageEffects();

  return (
    <>
      <SEO title="Extra" noindex />
    </>
  );
}
