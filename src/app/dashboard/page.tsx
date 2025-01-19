import RoomList from '@/components/ui/RoomList'

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-6">Get Started with a Random Room!</h1>
      <RoomList />
    </div>
  )
}

