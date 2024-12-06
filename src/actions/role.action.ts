"use server"

import { db } from '@/lib/db';
import {  RoleFormData } from '@/types/form';

export const createRole = async (data: RoleFormData) => {
  const { name, description } = data;

  try {
    const existingRole = await db.role.findUnique({
      where: {
        roleName: name,
      },
    });

    if (existingRole) {
      return {
        error: 'role already exists',
      };
    }

    const role = await db.role.create({
      data: {
        roleName: name,
        roleDescription: description,
      },
    });

    return {
      role,
    };
  } catch (e: any) {
    return { error: e.message };
  }
};

export const updateRole = async (
  data: RoleFormData,
  id: number,
) => {
  const { name, description } = data;

  try {
    const existingRole = await db.role.findUnique({
      where: {
        roleId: id,
      },
    });

    if (!existingRole) {
      return {
        error: 'No Such role Found',
      };
    }

    const role = await db.role.update({
      where: {
        roleId: id,
      },
      data: {
        roleName: name,
        roleDescription: description,
      },
    });
    //    revalidatePath("/company-dashboard/designations")
    //Todo--- making use of revalidate path by accepting props of path and destructering from data

    return {
      role,
    };
  } catch (e: any) {
    return { error: e.message };
  }
};

export const deleteRole = async (id: number) => {
  try {
    const existingRole = await db.role.findUnique({
      where: {
        roleId: id,
      },
    });

    if (!existingRole) {
      return {
        error: 'No Such role Found',
      };
    }

    await db.role.delete({
      where: {
        roleId: id,
      },
    });

    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
};

export const getAllRoles = async () => {
  try {
    const roles = await db.role.findMany();
    
    // Log the roles being returned
    console.log('Roles from database:', JSON.stringify(roles, null, 2));

    if (!roles || roles.length === 0) {
      return { roles: [], error: 'No roles found' };
    }
    
    return { roles };
  } catch (e: any) {
    console.error('error in getRoles:', e);
    return { error: e.message };
  }
};