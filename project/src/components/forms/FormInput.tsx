import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const FormInput = ({ label, name, value, onChange, placeholder, className = "flex-1" }: FormInputProps) => {
  return (
    <div className="flex items-center gap-4">
      <label className="w-32 bg-pink-200 p-2 rounded-lg">{label}</label>
      <input 
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} bg-purple-100 p-2 rounded-lg placeholder:text-gray-500`}
      />
    </div>
  );
};

export default FormInput;