// useForm.ts
import { useState } from "react";

export const useForm = <T>(initialValues: T) => {
    const [formValues, setFormValues] = useState<T>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = (newValues: T) => {
        setFormValues(newValues);
    };

    return { formValues, handleChange, resetForm };
};
