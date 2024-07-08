import Link from 'next/link';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string; // добавить возможность передачи дополнительных классов
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, children, className }) => (
  <Link href={href} passHref>
    <p className={`inline-block px-6 py-2 text-white rounded-lg hover:opacity-90 ${className}`}>
      {children}
    </p>
  </Link>
);

export default LinkButton;
