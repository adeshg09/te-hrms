'use server';

import { z } from 'zod';

import { createEmployeeSchema } from '@/lib/validations';
import { hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { EmployeeFormData } from '@/types/form';

export const getEmployeeById = async (employeeId: number) => {
  return await db.employee.findUnique({
    where: { employeeId },
    include: {
      personalDetails: true,
      address: true,
      familyDetails: true,
      emergencyContacts: true,
      experienceDetail: true,
      attachments: true,
      user: {
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      },
    },
  });
};

export const createEmployee = async (data: EmployeeFormData) => {
  try {
    // Validate input data
    console.log('Received data:', data);
    const validatedData = createEmployeeSchema.parse(data);
    console.log('Validated data:', validatedData);

    // Destructure Personal Details
    const {
      firstName,
      middleName,
      lastName,
      mobileNo,
      emailId,
      password,
      profileUrl,
      roles,
      isActive,
      showActivity,
      dateOfBirth,
      age,
      birthCountry,
      birthState,
      birthLocation,
      gender,
      maritalStatus,
      dateOfMarriage,
      bloodGroup,
      panNo,
      caste,
      religion,
      domicile,
    } = validatedData.personalDetails.basicDetails;

    // Destructure other details
    const addressDetails = validatedData.personalDetails.addressDetails;
    const educationalDetails = validatedData.personalDetails.educationalDetails;
    const familyDetails = validatedData.personalDetails.familyDetails;
    const emergencyContactDetails =
      validatedData.personalDetails.emergencyContactDetails;

    // Destructure Professional Details
    const {
      designation,
      dateOfJoin,
      employmentType,
      workingType,
      signatureUrl,
    } = validatedData.professionalDetails.basicDetails;
    const experienceDetails =
      validatedData.professionalDetails.experienceDetails;

    // Destructure Attachments Details
    const documentUrls = validatedData.documentUrls;

    console.log('personal details', validatedData.personalDetails);
    console.log('professional details', validatedData.professionalDetails);
    console.log('document urls', validatedData.documentUrls);

    console.log('personal-basic', validatedData.personalDetails.basicDetails);
    console.log(
      'personal-edu',
      validatedData.personalDetails.educationalDetails,
    );
    console.log(
      'personal-familiy',
      validatedData.personalDetails.familyDetails,
    );
    console.log(
      'personal-address',
      validatedData.personalDetails.addressDetails,
    );
    console.log(
      'personal-emergency',
      validatedData.personalDetails.emergencyContactDetails,
    );

    console.log('prof-basic', validatedData.professionalDetails.basicDetails);
    console.log(
      'prof-exp',
      validatedData.professionalDetails.experienceDetails,
    );

    // Hash the password
    const hashedPassword = await hashPassword(password);
    console.log('Hashed password:', hashedPassword);

    // Create Designation if not exists
    const designationRecord = await db.designation.findUnique({
      where: {
        designationName: designation,
      },
    });

    console.log('Designation record:', designationRecord);

    if (!designationRecord) {
      throw new Error('Designation not found');
    }

    console.log('Designation ID:', designationRecord.designationId);

    const existingEmail = await db.user.findUnique({
      where: {
        emailId: emailId,
      },
    });

    if (existingEmail) {
      throw new Error('email already exists');
    }

    // Create User
    const newUser = await db.user.create({
      data: {
        firstName,
        middleName: middleName ?? '',
        lastName,
        mobileNo,
        emailId,
        password: hashedPassword,
        profileUrl,
        roles: {
          create: roles?.map((role) => ({
            roleId: role.roleId,
          })),
        },
        isActive,
        showActivity,
      },
    });
    console.log('New User:', newUser);

    // Create Employee
    const newEmployee = await db.employee.create({
      data: {
        designationId: designationRecord.designationId,
        dateOfJoin,
        employmentType,
        workingType,
        signatureUrl,
      },
    });
    console.log('New Employee:', newEmployee);

    const updatedUser = await db.user.update({
      where: { userId: newUser.userId },
      data: {
        employeeId: newEmployee.employeeId,
      },
    });

    // Create Personal Details
    await db.personalDetail.create({
      data: {
        employeeId: newEmployee.employeeId,
        dateOfBirth,
        age,
        birthCountry,
        birthState,
        birthLocation,
        gender,
        maritalStatus,
        dateOfMarriage,
        bloodGroup,
        panNo,
        caste,
        religion,
        domicile,
      },
    });
    console.log('Personal details created.');

    // Create Addresses
    await db.address.createMany({
      data: addressDetails.map((address) => ({
        employeeId: newEmployee.employeeId,
        addressType: address.addressType,
        buildingName: address.buildingName,
        flatNumber: address.flatNumber,
        streetName: address.streetName,
        landmark: address.landmark,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        telephoneNumber: address.telephoneNumber,
        mobileNumber: address.mobileNumber,
      })),
    });
    console.log('Addresses created.');

    // Create Educational Details
    await db.educationalDetail.createMany({
      data: educationalDetails.map((education) => ({
        employeeId: newEmployee.employeeId,
        course: education.course,
        degreeSpecialization: education.degreeSpecialization,
        instituteUniversityName: education.instituteUniversityName,
        fromDate: education.fromDate,
        toDate: education.toDate,
        status: education.status,
        studyMode: education.studyMode,
        percentage: education.percentage,
      })),
    });
    console.log('Educational details created.');

    // Create Family Details
    await db.familyDetail.createMany({
      data: familyDetails.map((family) => ({
        employeeId: newEmployee.employeeId,
        relationType: family.relationType,
        name: family.name,
        age: family.age,
        dateOfBirth: family.dateOfBirth,
        currentAddress: family.currentAddress,
        birthCountry: family.birthCountry,
        birthState: family.birthState,
        birthLocation: family.birthLocation,
        occupation: family.occupation,
        mobileNumber: family.mobileNo,
      })),
    });
    console.log('Family details created.');

    // Create Emergency Contact
    await db.emergencyContactDetail.create({
      data: {
        employeeId: newEmployee.employeeId,
        contactName: emergencyContactDetails.contactName,
        contactAddress: emergencyContactDetails.contactAddress,
        relationToEmployee: emergencyContactDetails.relationToEmployee,
        contactNumber: emergencyContactDetails.contactNumber,
      },
    });
    console.log('Emergency contact created.');

    // Create Professional Experience Details
    await db.professionalDetail.create({
      data: {
        employeeId: newEmployee.employeeId,
        experienceDetails: {
          create: experienceDetails.map((exp) => ({
            empName: exp.empName,
            empId: exp.empId,
            employeeId: newEmployee.employeeId,
            jobTitle: exp.jobTitle,
            startDate: exp.startDate,
            endDate: exp.endDate,
            country: exp.country,
            state: exp.state,
            city: exp.city,
            employmentType: exp.employmentType,
            supervisorName: exp.supervisorName,
            supervisorMobNo: exp.supervisorMobNo,
          })),
        },
      },
    });
    console.log('Professional experience details created.');

    // Create Document Attachments
    await db.attachment.createMany({
      data: documentUrls.map((doc) => ({
        employeeId: newEmployee.employeeId,
        documentType: doc.documentType,
        documentUrl: doc.documentUrl,
        submitted: doc.submitted,
        submissionDate: doc.submissionDate,
      })),
    });
    console.log('Document attachments created.');

    return {
      success: true,
      user: updatedUser,
      employeeId: newEmployee.employeeId,
      message: 'Employee created successfully',
    };
  } catch (error) {
    console.error('Error creating employee:', error);

    // Handle specific error types
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation Error',
        details: error.errors,
      };
    }

    return {
      success: false,
      error: 'Failed to create employee',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const deleteEmployee = async (employeeId: number) => {
  return await db.$transaction(async (tx) => {
    // Delete related records first due to foreign key constraints
    await tx.userRole.deleteMany({ where: { user: { employeeId } } });
    await tx.user.deleteMany({ where: { employeeId } });
    await tx.personalDetail.deleteMany({ where: { employeeId } });
    await tx.address.deleteMany({ where: { employeeId } });
    await tx.familyDetail.deleteMany({ where: { employeeId } });
    await tx.emergencyContactDetail.deleteMany({ where: { employeeId } });
    await tx.educationalDetail.deleteMany({ where: { employeeId } });
    await tx.experienceDetail.deleteMany({ where: { employeeId } });
    await tx.attachment.deleteMany({ where: { employeeId } });

    // Finally, delete the employee
    return await tx.employee.delete({ where: { employeeId } });
  });
};
