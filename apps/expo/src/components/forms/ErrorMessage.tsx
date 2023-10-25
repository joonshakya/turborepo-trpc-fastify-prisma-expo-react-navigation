import AppText from "../AppText";

interface ErrorMessageProps {
  error: string | undefined;
  visible: boolean | undefined;
}

export default function ErrorMessage({ error, visible }: ErrorMessageProps) {
  if (!visible || !error) return null;

  return <AppText className="mb-1 px-3 text-red">{error}</AppText>;
}
