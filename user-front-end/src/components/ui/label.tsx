const Label = ({ children }) => {
  return (
    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </span>
  );
};

export default Label;
