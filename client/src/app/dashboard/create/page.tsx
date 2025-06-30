import React from 'react';
import Header from '@/components/Header';
import FormSettings from '@/components/FormSettings';
import FormFields from '@/components/FormFields';
import SubmitButton from '@/components/SubmitButton';

const CreatePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-6">
      <Header />
      <FormSettings />
      <FormFields />
      <SubmitButton />
    </div>
  );
};

export default CreatePage;