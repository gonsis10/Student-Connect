import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Dummy data for rooms
const rooms = [
  { id: 1, name: "Team Meeting", joinCode: "ABC123", occupancy: 0 },
]

export default function RoomList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* {rooms.map((room) => (
        <Card key={room.id}>
          <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>Join Code: {room.joinCode}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={room.occupancy > 0 ? "default" : "secondary"}>
              {room.occupancy} {room.occupancy === 1 ? "person" : "people"} in room
            </Badge>
          </CardContent>
          <CardFooter>
            <Button>Join Room</Button>
          </CardFooter>
        </Card>
      ))} */}
      {/* TODO-> Link button with joining a room */}
      <Link href="/video">
        <Button>Join a Random Room </Button>
      </Link>
    </div>
  )
}

