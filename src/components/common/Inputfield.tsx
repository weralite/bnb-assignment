
import React, { ChangeEvent } from "react";

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    type: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, type, onChange }) => (
    <div className="flex flex-col border-b">
        <label htmlFor={name} className="text-gray-500">
            {label}:
        </label>
        <input
            id={name}
            className="focus:outline-none"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

export default InputField;
