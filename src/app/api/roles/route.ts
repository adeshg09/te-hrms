import { db } from '@/lib/db'

export async function POST (req: Request) :Promise<Response>{
  try {
    const { roleName,roleDescription } =await  req.json()

    if (!roleName || !roleDescription) {
      return new Response(
        JSON.stringify({
          error: 'roleName  and roleDescription is missing'
        }),
        {
          status: 400
        }
      )
    }

    const existingRole = await db.role.findUnique({
      where: {
        roleName: roleName
      }
    })

    if (existingRole) {
      return new Response(
        JSON.stringify({
          error: 'Role already exist'
        })
      )
    }

    const role = await db.role.create({
      data: {
        roleName: roleName,
        roleDescription: roleDescription
      }
    })

    
      return new Response(
        JSON.stringify({
          message: 'Role created successfully',
          role: role
        }),
        {
          status: 201
        }
      )
    
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'Failed to create role' }), {
      status: 500
    })
  }
}
