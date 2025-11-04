import Image from "next/image";

function page() {
  return (
    <div className="h-full w-full hidden md:flex items-center justify-center">
      <Image src="/assets/text-logo.svg" alt="Whispra Logo" width={400} height={400} />
    </div>
  );
}

export default page;
