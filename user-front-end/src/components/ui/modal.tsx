type Props = {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, title, children }: Props) => {
  if (isOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-transparent">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    );
  }
};
