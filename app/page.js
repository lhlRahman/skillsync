import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { auth } from "@clerk/nextjs";
export default function Home() {
  const user = auth();
  console.log(user.userId);



  return (
    <>
    <MacbookScroll src="https://vastphotos.com/files/uploads/social/good-morning-new-york.jpg"/>
    </>
  );
}
