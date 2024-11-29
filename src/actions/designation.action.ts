"use server"

import { db } from '@/lib/db';
import { DesignationFormData } from '@/types/form';

export const createDesignation = async (data: DesignationFormData) => {
  const { name, description } = data;

  try {
    const existingDesignation = await db.designation.findUnique({
      where: {
        designationName: name,
      },
    });

    if (existingDesignation) {
      return {
        error: 'Designation already exists',
      };
    }

    const designation = await db.designation.create({
      data: {
        designationName: name,
        designationDescription: description,
      },
    });

    return {
      designation,
    };
  } catch (e: any) {
    return { error: e.message };
  }
};

export const updateDesignation = async (
  data: DesignationFormData,
  id: number,
) => {
  const { name, description } = data;

  try {
    const existingDesignation = await db.designation.findUnique({
      where: {
        designationId: id,
      },
    });

    if (!existingDesignation) {
      return {
        error: 'No Such Designation Found',
      };
    }

    const designation = await db.designation.update({
      where: {
        designationId: id,
      },
      data: {
        designationName: name,
        designationDescription: description,
      },
    });
    //    revalidatePath("/company-dashboard/designations")
    //Todo--- making use of revalidate path by accepting props of path and destructering from data

    return {
      designation,
    };
  } catch (e: any) {
    return { error: e.message };
  }
};

export const deleteDesignation = async (id: number) => {
  try {
    const existingDesignation = await db.designation.findUnique({
      where: {
        designationId: id,
      },
    });

    if (!existingDesignation) {
      return {
        error: 'No Such Designation Found',
      };
    }

    await db.designation.delete({
      where: {
        designationId: id,
      },
    });

    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
};



export const getAllDesignations = async () => {
  try {
    const designations = await db.designation.findMany();
    
    if (!designations || designations.length === 0) {
      return { 
        designations: [], 
        error: 'No designations found' 
      };
    }
    
    const designationNames = designations.map(designation => designation.designationName);
    
    return { 
      designations, 
    };
  } catch (e: any) {
    console.error('error in getDesignations:', e);
    return { 
      designations: [], 
      error: e.message 
    };
  }
};
