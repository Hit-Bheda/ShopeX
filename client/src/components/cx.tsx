type ClassValue = string | undefined | null | boolean;

const cx = (...classes: ClassValue[]): string => {
  return classes.filter(Boolean).join(" ");
};

export default cx;
