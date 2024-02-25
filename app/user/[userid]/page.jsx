const Page = () => {
  const bio = "Habib Rahman is a seasoned software engineer with over 10 years of experience in the tech industry. He specializes in full-stack development, with a particular focus on React and Node.js. Habib is passionate about creating efficient, scalable, and user-friendly applications. In his free time, he enjoys hiking, reading, and exploring new technologies.";

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-500">
      <div className="mt-32 max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden m-4">
        <div className="p-6">
          <div className="text-gray-700 flex flex-col">
            <h1 className=" text-center text-4xl pb-2 border border-white border-b-black">Hi I am Habib Rahman!</h1>
            <p className="text-lg pt-2"><strong>Bio:</strong> {bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;