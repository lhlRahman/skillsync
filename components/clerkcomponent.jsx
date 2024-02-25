import { auth } from '@clerk/nextjs';
import { useData } from '@/context/DataContext';
const Clerkcomponent = () => {
    const {data, setData } = useData();
  return (
    <div>
    </div>
  )
}

export default Clerkcomponent
