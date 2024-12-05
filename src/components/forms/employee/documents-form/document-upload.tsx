'use client';

import React, {  useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUp, Loader2 } from 'lucide-react';

import { DocumentUpload, EmployeeFormData } from '@/types/form';
import toast from 'react-hot-toast';
import { useMultiStepForm } from '@/hooks/use-multistep-form';
import { documentUrlsSchema } from '@/lib/validations';
import { createEmployee } from '@/actions/employee.action';
import { useRouter } from 'next/navigation';

// Document types configuration
const documentTypeConfigs = [
  {
    type: 'DegreeCertificatesMarksheets',
    title: 'Degree Certificates & Marksheets',
    accept: '.pdf,.jpg,.jpeg',
    required: true
  },
  {
    type: 'BirthProof', 
    title: 'Birth Proof',
    accept: '.pdf,.jpg,.jpeg',
    required: true
  },
  {
    type: 'ExperienceCertificate',
    title: 'Experience Certificate',
    accept: '.pdf,.jpg,.jpeg',
    required: true
  },
  {
    type: 'RelievingLetter',
    title: 'Relieving Letter',
    accept: '.pdf,.jpg,.jpeg',
    required: true
  },
  {
    type: 'AadharPhotoCopy',
    title: 'Aadhar Photo Copy',
    accept: '.pdf,.jpg,.jpeg',
    required: true
  },
  {
    type: 'PanPhotoCopy',
    title: 'PAN Photo Copy',
    accept: '.pdf,.jpg,.jpeg',
    required: true
  },
];

export default function DocumentUploadForm() {
  const {
    activeStep,
    setActiveStep,
    currentSubStep,
    setCurrentSubStep,
    updateFormData,
    formData,
  } = useMultiStepForm();

  // State for tracking uploads
  const [uploadedDocuments, setUploadedDocuments] = useState<DocumentUpload[]>(
    formData.documentUpload || [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // File upload handler
  const handleFileUpload = async (
    file: File,
    documentType: DocumentUpload['documentType'],
  ) => {
    setIsLoading(true);
    try {
      // Validate file type and size
      if (!['application/pdf', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        throw new Error('Invalid file type. Only PDF and JPEG are allowed.');
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        throw new Error('File size should not exceed 5MB');
      }

      // Simulate file upload (replace with actual upload logic)
      const documentUrl = await uploadToCloudStorage(file);

      // Create document upload object
      const newDocument: DocumentUpload = {
        documentType,
        documentUrl,
        submitted: true,
        submissionDate: new Date(),
      };

      // Validate against schema
      documentUrlsSchema.parse(newDocument);

      // Update local state
      const updatedDocuments = [
        ...uploadedDocuments.filter((doc) => doc.documentType !== documentType),
        newDocument,
      ];

      setUploadedDocuments(updatedDocuments);

      // Update context
      updateFormData({
        documentUpload: updatedDocuments,
      });

      toast.success(`${documentType} uploaded successfully`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload failed');
      console.error('Document upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Proceed to next step
  const handleProceed = async () => {
    // Validate all required documents are uploaded
    const requiredDocumentTypes = documentTypeConfigs
      .filter(doc => doc.required)
      .map((doc) => doc.type);
    
    const uploadedTypes = uploadedDocuments.map((doc) => doc.documentType);

    const missingDocuments = requiredDocumentTypes.filter(
      (type) => !uploadedTypes.includes(type),
    );

    // If there are missing documents, show toast with specific details
    if (missingDocuments.length > 0) {
      const missingDocumentTitles = missingDocuments.map(
        type => documentTypeConfigs.find(doc => doc.type === type)?.title || type
      );
      
      toast.error(
        `Please upload the following required documents: \n${missingDocumentTitles.join(', ')}`,
        { duration: 4000 }
      );
      return;
    }

    // Proceed with employee creation if all documents are uploaded
    const employeeFinalData: EmployeeFormData = {
      personalDetails: {
        basicDetails: formData.basicDetails,
        addressDetails: formData.addressDetails,
        educationalDetails: formData.educationalDetails,
        familyDetails: formData.familyDetails,
        emergencyContactDetails: formData.emergencyContactDetails,
      },
      professionalDetails: {
        basicDetails: formData.profBasicDetails,
        experienceDetails: formData.experienceDetails,
      },
      documentUrls: formData.documentUpload,
    };

    const {success, message, error} = await createEmployee(employeeFinalData);
    if(success && message){
      toast.success(message);
      router.push('/dashboard/employees');
    } else {
      error && toast.error(error);
    }
  };

  const onBack = () => {
    setActiveStep('Professional Details');
    setCurrentSubStep(1);
  };

  return (
    <div className="space-y-6 ">
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 h-[500px] sm:h-fit scrollbar-none overflow-x-auto">
        {documentTypeConfigs.map(({ type, title, accept, required }) => (
          <div key={type} className="space-y-2">
            <h2 className="text-sm font-medium text-gray-700">
              {title} {required && <span className="text-red-500">*</span>}
            </h2>
            <Card
              className={`border ${
                uploadedDocuments.some((doc) => doc.documentType === type)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-white'
              } p-6`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-secondary-default p-3">
                  <FileUp className="text-white" />
                </div>
                <div className="text-center">
                  {uploadedDocuments.some(
                    (doc) => doc.documentType === type,
                  ) ? (
                    <p className="text-sm text-green-600">
                      Document Uploaded ✓
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Drag & Drop or{' '}
                      <input
                        type="file"
                        accept={accept}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, type);
                          }
                        }}
                        className="hidden"
                        id={`file-${type}`}
                      />
                      <label
                        htmlFor={`file-${type}`}
                        className="text-secondary-default hover:underline cursor-pointer"
                      >
                        choose file
                      </label>{' '}
                      to upload
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    Supported formats: PDF, JPEG
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <Button
          type="submit"
          className="bg-primary-default hover:bg-primary-dark text-white rounded-lg"
          size="lg"
          onClick={handleProceed}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Proceed to Create Employee'
          )}
        </Button>
        <Button
          variant="outline"
          onClick={onBack}
          className="bg-secondary-default hover:bg-secondary-dark text-white rounded-lg"
          size="lg"
        >
          Back to Professional Details
        </Button>
      </div>
    </div>
  );
}

// Placeholder for cloud storage upload
async function uploadToCloudStorage(file: File): Promise<string> {
  // Implement actual cloud storage upload
  // This is a mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://example.com/uploads/${file.name}`);
    }, 1000);
  });
}