// 'use client';

// import * as React from 'react';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import { documentUrlsSchema } from '@/lib/validations';
// import { DocumentUpload } from '@/types/form';
// import { Loader2 } from 'lucide-react';

// interface FileUploadProps {
//   title: string;
//   documentType: DocumentUpload['documentType'];
//   onFileSelect: (
//     file: File,
//     documentType: DocumentUpload['documentType'],
//   ) => void;
// }

// function FileUploadBox({ title, documentType, onFileSelect }: FileUploadProps) {
//   const inputRef = React.useRef<HTMLInputElement>(null);

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       onFileSelect(e.target.files[0], documentType);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <h2 className="text-sm font-medium text-gray-700">{title}</h2>
//       <Card className="border border-gray-300 bg-white p-6">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="rounded-full bg-secondary-default p-3">
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
//                 stroke="white"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M7 10L12 15L17 10"
//                 stroke="white"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M12 15V3"
//                 stroke="white"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Drag & Drop or{' '}
//               <button
//                 onClick={() => inputRef.current?.click()}
//                 className="text-secondary-default hover:underline"
//               >
//                 choose file
//               </button>{' '}
//               to upload
//             </p>
//             <p className="text-xs text-gray-400">
//               Supported formats : Jpeg, pdf
//             </p>
//           </div>
//         </div>
//         <input
//           type="file"
//           ref={inputRef}
//           onChange={handleFileSelect}
//           accept=".jpg,.jpeg,.pdf"
//           className="hidden"
//         />
//       </Card>
//     </div>
//   );
// }

// export default function DocumentUpload() {
//   const [isLoading, setIsLoading] = React.useState(false);
//   const [documents, setDocuments] = React.useState<
//     Partial<Record<DocumentUpload['documentType'], DocumentUpload>>
//   >({});

//   const handleFileSelect = async (
//     file: File,
//     documentType: DocumentUpload['documentType'],
//   ) => {
//     try {
//       // Here you would typically upload the file to your server or cloud storage
//       // and get back a URL. For this example, we'll use a placeholder URL.
//       const documentUrl = 'https://example.com/uploaded-document.pdf';

//       const newDocument: DocumentUpload = {
//         documentType,
//         documentUrl,
//         submitted: true,
//         submissionDate: new Date().toISOString(),
//       };

//       // Validate the document data
//       documentUrlsSchema.parse(newDocument);

//       // If validation passes, update the state
//       setDocuments((prev) => ({
//         ...prev,
//         [documentType]: newDocument,
//       }));

//       console.log(`Document ${documentType} uploaded successfully`);
//     } catch (error) {
//       console.error('Error uploading document:', error);
//     }
//   };

//   const documentTypes: Array<{
//     type: DocumentUpload['documentType'];
//     title: string;
//   }> = [
//     {
//       type: 'DegreeCertificatesMarksheets',
//       title: 'Degree Certificates & Marksheets',
//     },
//     { type: 'BirthProof', title: 'Birth Proof' },
//     { type: 'ExperienceCertificate', title: 'Experience Certificate' },
//     { type: 'RelievingLetter', title: 'Relieving Letter' },
//     { type: 'AadharPhotoCopy', title: 'Aadhar Photo Copy' },
//     { type: 'PanPhotoCopy', title: 'PAN Photo Copy' },
//   ];

//   return (
//     <div className="flex flex-col gap-5 w-full h-full ">
//       <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
//         {documentTypes.map(({ type, title }) => (
//           <FileUploadBox
//             key={type}
//             title={title}
//             documentType={type}
//             onFileSelect={handleFileSelect}
//           />
//         ))}
//       </div>
//       <div className="flex items-center gap-5  justify-end">
//         <Button
//           type="submit"
//           className="bg-primary-default hover:bg-primary-dark text-white rounded-lg "
//           size="lg"
//           disabled={isLoading}
//         >
//           {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Submit'}
//         </Button>
//         <Button
//           type="button"
//           className="bg-secondary-default hover:bg-secondary-dark text-white rounded-lg"
//           size="lg"
//           onClick={() => {}}
//         >
//           Back
//         </Button>
//       </div>
//     </div>
//   );
// }


'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { documentUrlsSchema } from '@/lib/validations';
import { DocumentUpload } from '@/types/form';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface DocumentUploadFormProps {
  onFileSelect?: (
    file: File,
    documentType: DocumentUpload['documentType'],
  ) => void;
}

export default function DocumentUploadForm({ onFileSelect }: DocumentUploadFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [documents, setDocuments] = React.useState<
    Partial<Record<DocumentUpload['documentType'], DocumentUpload>>
  >({});

  const documentTypes: Array<{
    type: DocumentUpload['documentType'];
    title: string;
  }> = [
    {
      type: 'DegreeCertificatesMarksheets',
      title: 'Degree Certificates & Marksheets',
    },
    { type: 'BirthProof', title: 'Birth Proof' },
    { type: 'ExperienceCertificate', title: 'Experience Certificate' },
    { type: 'RelievingLetter', title: 'Relieving Letter' },
    { type: 'AadharPhotoCopy', title: 'Aadhar Photo Copy' },
    { type: 'PanPhotoCopy', title: 'PAN Photo Copy' },
  ];

  const fileUploadSchema = z.object({
    documentType: z.enum([
      'DegreeCertificatesMarksheets',
      'BirthProof',
      'ExperienceCertificate',
      'RelievingLetter',
      'AadharPhotoCopy',
      'PanPhotoCopy'
    ]),
    file: z.instanceof(File).optional()
  });

  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      documentType: undefined,
      file: undefined
    }
  });

  const handleFileSelect = async (
    file: File,
    documentType: DocumentUpload['documentType'],
  ) => {
    try {
      // Here you would typically upload the file to your server or cloud storage
      // and get back a URL. For this example, we'll use a placeholder URL.
      const documentUrl = 'https://example.com/uploaded-document.pdf';

      const newDocument: DocumentUpload = {
        documentType,
        documentUrl,
        submitted: true,
        submissionDate: new Date().toISOString(),
      };

      // Validate the document data
      documentUrlsSchema.parse(newDocument);

      // If validation passes, update the state
      setDocuments((prev) => ({
        ...prev,
        [documentType]: newDocument,
      }));

      console.log(`Document ${documentType} uploaded successfully`);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const onSubmit = (values: z.infer<typeof fileUploadSchema>) => {
    setIsLoading(true);
    // Simulate submission
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col gap-5 w-full h-full"
      >
        <div className="flex flex-col gap-5 overflow-y-scroll md:h-[330px] sm:h-[324px] h-[344px] scrollbar-none">
          <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {documentTypes.map(({ type, title }) => (
              <div key={type} className="space-y-2">
                <h2 className="text-sm font-medium text-gray-700">{title}</h2>
                <Card className="border border-gray-300 bg-white p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="rounded-full bg-secondary-default p-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 10L12 15L17 10"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15V3"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Drag & Drop or{' '}
                        <input 
                          type="file"
                          accept=".jpg,.jpeg,.pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileSelect(file, type);
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
                      <p className="text-xs text-gray-400">
                        Supported formats : Jpeg, pdf
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 justify-end">
          <Button
            type="submit"
            className="bg-primary-default hover:bg-primary-dark text-white rounded-lg"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Submit'}
          </Button>
          <Button
            type="button"
            className="bg-secondary-default hover:bg-secondary-dark text-white rounded-lg"
            size="lg"
            onClick={() => {}}
          >
            Back
          </Button>
        </div>
      </form>
    </Form>
  );
}