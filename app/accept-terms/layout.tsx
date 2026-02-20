import { ForceLightTheme } from '@/components/force-light-theme';

export default function AcceptTermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ForceLightTheme />
      {children}
    </>
  );
}
