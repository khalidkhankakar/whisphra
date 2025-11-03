import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

async function page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="h-full w-full flex items-center justify-center">
      user chat
      {" "}
      {id}
    </div>
  );
}

export default page;
