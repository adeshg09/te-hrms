import { createEmployee } from '@/actions/employee.action';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON request body
    const requestData = await request.json();

    // Log the incoming request data
    console.log("Request data:", requestData);

    // Attempt to create the employee
    const result = await createEmployee(requestData);

    // Log the result of employee creation
    console.log("Employee creation result:", result);

    // Handle the result and return appropriate response
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        employeeId: result.employeeId,
      }, { status: 201 });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
        details: result.details,
      }, { status: 400 });
    }
  } catch (error) {
    // Log any unexpected errors
    console.error("Unexpected error in POST /employee:", error);

    // Return a generic error response
    return NextResponse.json({
      success: false,
      error: "Failed to process request",
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
