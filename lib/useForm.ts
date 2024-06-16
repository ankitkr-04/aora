// src/hooks/useForm.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export interface FormState {
  [key: string]: string;
}

interface UseFormProps<T extends FormState> {
  initialState: T;
  onSubmit: (form: T) => Promise<void>;
}

const useForm = <T extends FormState>({ initialState, onSubmit }: UseFormProps<T>) => {
  const [form, setForm] = useState<T>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof T, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSubmit = async () => {
    const isEmptyField = Object.values(form).some((value) => !value);

    if (isEmptyField) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(form);
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
