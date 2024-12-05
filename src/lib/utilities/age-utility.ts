/**
 * Calculate age based on date of birth
 * @param dateOfBirth - Date of birth
 * @returns calculated age as a number
 */
export function calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // Check if birthday hasn't occurred this year
    if (
      monthDifference < 0 || 
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    
    return age;
  }
  
  /**
   * Validate if a person is at least a minimum age
   * @param dateOfBirth - Date of birth
   * @param minAge - Minimum required age (default 18)
   * @returns boolean indicating if person meets minimum age requirement
   */
  export function isValidAge(dateOfBirth: Date, minAge: number = 18): boolean {
    return calculateAge(dateOfBirth) >= minAge;
  }