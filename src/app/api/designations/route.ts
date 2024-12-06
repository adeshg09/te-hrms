import { db } from '@/lib/db'

export async function POST(req: Request): Promise<Response> {
  try {
    const { designationName, designationDescription } = await req.json();

    if (!designationName || !designationDescription) {
      return new Response(
        JSON.stringify({ error: 'designationName and designationDescription are required' }),
        { status: 400 }
      );
    }

    const existingDesignation = await db.designation.findUnique({
      where: { designationName: designationName }
    });

    if (existingDesignation) {
      return new Response(
        JSON.stringify({ error: 'Designation already exists' }),
        { status: 400 }
      );
    }

    const designation = await db.designation.create({
      data: {
        designationName: designationName,
        designationDescription: designationDescription
      }
    });

    return new Response(
      JSON.stringify({
        message: 'Designation created successfully',
        designation: designation
      }),
      { status: 201 }
    );

  } catch (error:any) {
    console.error('Error creating designation:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create designation', details: error.message }),
      { status: 500 }
    );
  }
}
