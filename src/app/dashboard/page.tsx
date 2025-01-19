import { Button } from '@/components/ui/button'
import Navbar from '@/components/ui/Navbar'
import Link from 'next/link'

export default function Dashboard() {
  return (
	<div>
		<Navbar />
		<div className="container mx-auto px-4 py-8 pt-20">
			<h1 className="text-3xl font-bold mb-6">Get Started with a Random Room!</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Link href="/video">
					<Button>Join a Random Room </Button>
				</Link>
			</div>
		</div>
	</div>
  )
}

