// import { ChevronRight } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { User } from '@prisma/client'



// interface DesignationCardProps {
//   designation: string
//   memberCount: number
//   members: User[]
//   onMemberClick?: (memberId: string) => void
//   onViewAllClick?: () => void
// }

// export const DesignationCard=({
//   designation,
//   memberCount,
//   members,
//   onMemberClick,
//   onViewAllClick,
// }: DesignationCardProps)=> {
//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <div className="space-y-1">
//           <CardTitle className="text-2xl font-bold">{designation}</CardTitle>
//           <p className="text-sm text-muted-foreground">{memberCount} Members</p>
//         </div>
//         <button
//           onClick={onViewAllClick}
//           className="text-sm font-medium text-primary hover:underline"
//         >
//           View All
//         </button>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         {members.map((member) => (
//           <button
//             key={member.userId}
//             // onClick={() => onMemberClick?.(member?.userId)}
//             className="flex items-center justify-between w-full group hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors p-2"
//           >
//             <div className="flex items-center gap-3">
//               <Avatar>
//                 <AvatarImage src={member.profileUrl} alt={member.firstName} />
//                 <AvatarFallback>{member.firstName[0]}</AvatarFallback>
//               </Avatar>
//               <div className="text-left">
//                 <p className="font-medium">{member.firstName}</p>
//                 <p className="text-sm text-muted-foreground">{member.userId}</p>
//               </div>
//             </div>
//             <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground" />
//           </button>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }

